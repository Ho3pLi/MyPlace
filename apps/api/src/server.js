import cors from "cors";
import express from "express";
import adminPostsRouter from "./routes/adminPosts.js";
import config from "./config.js";
import db from "./db.js";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/admin/posts", adminPostsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  if (err?.name === "ZodError") {
    const firstIssue = err.issues?.[0]?.message || "Invalid request";
    res.status(400).json({ error: firstIssue });
    return;
  }

  const status = err?.status || 500;
  const message = err?.status ? err.message : "Internal Server Error";
  res.status(status).json({ error: message });
});

const server = app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});

function shutdown(signal) {
  console.log(`${signal} received, shutting down`);
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
