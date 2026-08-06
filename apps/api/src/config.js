const env = process.env;

const parsedPort = Number.parseInt(env.PORT ?? "", 10);
const isProduction = env.NODE_ENV === "production";

function parseOrigins(value) {
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const config = {
  port: Number.isFinite(parsedPort) ? parsedPort : 4000,
  databasePath: env.DATABASE_PATH || "./data/myplace.sqlite",
  adminUser: env.ADMIN_USER || "admin",
  adminTotpSecret: env.ADMIN_TOTP_SECRET?.trim() || "",
  adminSessionSecret: env.ADMIN_SESSION_SECRET?.trim() || "",
  corsOrigins: parseOrigins(env.CORS_ORIGIN || "http://localhost:5173"),
  isProduction,
  tokenTtlMs: 2 * 60 * 60 * 1000, // 2 hours
};

if (isProduction && (!config.adminTotpSecret || !config.adminSessionSecret)) {
  throw new Error("ADMIN_TOTP_SECRET and ADMIN_SESSION_SECRET are required in production");
}

export default config;
