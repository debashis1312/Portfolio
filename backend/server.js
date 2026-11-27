import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import QRCode from "qrcode";
import fs from "node:fs";

const app = express();
const PORT = process.env.PORT || 4000;
const origins = (process.env.CORS_ORIGIN || "http://localhost:3000").split(",").map((s) => s.trim());

app.set("trust proxy", 1);
app.use(cors({ origin: origins }));
app.use(express.json({ limit: "10kb" }));

const mailer = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

app.get("/api/health", (_req, res) => res.json({ ok: true, uptime: process.uptime() }));

// Contact form: validates, rate-limits, logs to a file and (optionally) emails you.
const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, message: { error: "Too many messages, try later." } });
app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message, website } = req.body || {};
  if (website) return res.json({ ok: true }); // honeypot: silently drop bots
  if (![name, email, message].every((v) => typeof v === "string" && v.trim()))
    return res.status(400).json({ error: "All fields are required." });
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: "Invalid email." });

  const entry = { at: new Date().toISOString(), name: name.slice(0, 80), email: email.slice(0, 120), message: message.slice(0, 2000) };
  try {
    fs.appendFileSync("messages.jsonl", JSON.stringify(entry) + "\n");
    if (mailer)
      await mailer.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.MAIL_TO,
        replyTo: entry.email,
        subject: `Portfolio message from ${entry.name}`,
        text: entry.message,
      });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error." });
  }
});

// Printable QR code PNG for any http(s) URL: /api/qr?url=https://your-site.vercel.app
app.get("/api/qr", async (req, res) => {
  const url = String(req.query.url || "");
  if (!/^https?:\/\//.test(url) || url.length > 300) return res.status(400).json({ error: "Provide a valid http(s) url." });
  res.type("png").send(await QRCode.toBuffer(url, { width: 600, margin: 2 }));
});

app.listen(PORT, () => console.log(`API listening on :${PORT}`));
