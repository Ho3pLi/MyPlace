import { Router } from "express";
import crypto from "node:crypto";
import config from "../config.js";

const authRouter = Router();
const TOTP_WINDOW = 1;

function base64UrlEncode(value) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlJson(value) {
  return base64UrlEncode(JSON.stringify(value));
}

function timingSafeEqualString(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function decodeTotpSecret(secret) {
  const normalized = secret.replace(/\s+/g, "").replace(/=+$/g, "").toUpperCase();
  if (!/^[A-Z2-7]+$/.test(normalized)) {
    return Buffer.from(secret, "utf8");
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";

  for (const char of normalized) {
    const value = alphabet.indexOf(char);
    if (value === -1) {
      return Buffer.from(secret, "utf8");
    }
    bits += value.toString(2).padStart(5, "0");
  }

  const bytes = [];
  for (let index = 0; index + 8 <= bits.length; index += 8) {
    bytes.push(Number.parseInt(bits.slice(index, index + 8), 2));
  }

  return Buffer.from(bytes);
}

function generateTotp(secret, step) {
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(step));

  const digest = crypto
    .createHmac("sha1", decodeTotpSecret(secret))
    .update(counter)
    .digest();

  const offset = digest[digest.length - 1] & 0x0f;
  const code = (
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff)
  ) % 1000000;

  return code.toString().padStart(6, "0");
}

function verifyTotp(code) {
  if (!config.adminTotpSecret) {
    return false;
  }

  const normalizedCode = `${code || ""}`.trim();
  if (!/^\d{6}$/.test(normalizedCode)) {
    return false;
  }

  const currentStep = Math.floor(Date.now() / 30000);
  for (let offset = -TOTP_WINDOW; offset <= TOTP_WINDOW; offset += 1) {
    const expected = generateTotp(config.adminTotpSecret, currentStep + offset);
    if (timingSafeEqualString(normalizedCode, expected)) {
      return true;
    }
  }

  return false;
}

function getSessionSecret() {
  return config.adminSessionSecret || config.adminTotpSecret;
}

function signToken(payload) {
  const body = base64UrlJson(payload);
  const signature = crypto
    .createHmac("sha256", getSessionSecret())
    .update(body)
    .digest("base64url");

  return `${body}.${signature}`;
}

function verifyToken(token) {
  const [body, signature] = `${token || ""}`.split(".");
  if (!body || !signature || !getSessionSecret()) {
    return null;
  }

  const expectedSignature = crypto
    .createHmac("sha256", getSessionSecret())
    .update(body)
    .digest("base64url");

  if (!timingSafeEqualString(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload.exp || Date.now() >= payload.exp) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
}

export function requireAuth(req, res, next) {
  const authorization = req.headers.authorization || "";
  const bearerToken = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";

  const payload = verifyToken(bearerToken);
  if (!payload || payload.sub !== config.adminUser) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  req.user = { sub: payload.sub };
  next();
}

authRouter.post("/login", (req, res) => {
  const username = `${req.body?.username || ""}`.trim();
  const code = `${req.body?.code || ""}`.trim();

  if (!timingSafeEqualString(username, config.adminUser) || !verifyTotp(code)) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const expiresAt = Date.now() + config.tokenTtlMs;
  const token = signToken({
    sub: config.adminUser,
    exp: expiresAt,
  });

  res.json({
    token,
    expiresIn: Math.floor(config.tokenTtlMs / 1000),
    expiresAt,
    user: config.adminUser,
  });
});

export default authRouter;
