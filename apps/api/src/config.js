const env = process.env;

const parsedPort = Number.parseInt(env.PORT ?? "", 10);

function parseOrigins(value) {
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const config = {
  port: Number.isFinite(parsedPort) ? parsedPort : 4000,
  corsOrigins: parseOrigins(env.CORS_ORIGIN || "http://localhost:5173"),
};

export default config;
