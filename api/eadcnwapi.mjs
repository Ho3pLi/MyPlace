import crypto from "node:crypto"

function getEnv(name) {
  return process.env[name] || ""
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" })
    }

    const challengeCode = req.query.challenge_code

    if (!challengeCode || Array.isArray(challengeCode)) {
      return res.status(400).json({ message: "Missing challenge_code" })
    }

    const verificationCode = getEnv("verificationCode")
    const endpoint = getEnv("endpoint")

    if (!verificationCode || !endpoint) {
      return res.status(500).json({ message: "Challenge verification is not configured" })
    }

    const responseHash = crypto
      .createHash("sha256")
      .update(challengeCode)
      .update(verificationCode)
      .update(endpoint)
      .digest("hex")

    return res.status(200).json({ challengeResponse: responseHash.replace(/^\uFEFF/, "") })
  } catch (error) {
    console.error("Challenge verification failed", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
