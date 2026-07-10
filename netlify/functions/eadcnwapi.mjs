import crypto from "node:crypto"

function getEnv(name) {
  return process.env[name] || globalThis.Netlify?.env?.get(name) || ""
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export default async (req) => {
  try {
    if (req.method !== "GET") {
      return json({ message: "Method not allowed" }, 405)
    }

    const url = new URL(req.url)
    const challengeCode = url.searchParams.get("challenge_code")

    if (!challengeCode) {
      return json({ message: "Missing challenge_code" }, 400)
    }

    const verificationCode = getEnv("verificationCode")
    const endpoint = getEnv("endpoint")

    if (!verificationCode || !endpoint) {
      return json({ message: "Challenge verification is not configured" }, 500)
    }

    const responseHash = crypto
      .createHash("sha256")
      .update(challengeCode)
      .update(verificationCode)
      .update(endpoint)
      .digest("hex")

    return json({ challengeResponse: responseHash.replace(/^\uFEFF/, "") })
  } catch (error) {
    console.error("Challenge verification failed", error)
    return json({ message: "Internal server error" }, 500)
  }
}
