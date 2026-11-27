"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { profile as p } from "../lib/data";
import QRModal from "../components/QRModal";

const Scene = dynamic(() => import("../components/Scene"), { ssr: false });
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Home() {
  const [qr, setQr] = useState(false);
  const [status, setStatus] = useState("");

  async function send(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("Sending…");
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus("Thanks! I’ll get back to you soon.");
      form.reset();
    } catch (err) {
      setStatus(`Couldn’t send: ${err.message}. You can email me directly instead.`);
    }
  }

  return (
    <>
      <Scene />
      <nav className="nav">
        <b>DP</b>
        <div>
          {["about", "skills", "experience", "projects", "contact"].map((s) => (
            <a key={s} href={`#${s}`}>{s}</a>
          ))}
          <button className="btn small" onClick={() => setQr(true)}>Share · QR</button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <p className="mut">Hi, I’m</p>
          <h1>{p.name}</h1>
          <h2 className="grad">{p.role}</h2>
          <p className="lead">{p.summary}</p>
          <div className="row">
            <a className="btn" href="#projects">View projects</a>
            <a className="btn ghost" href={p.links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn ghost" href={p.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </section>

        <section id="about">
          <h3>About</h3>
          <div className="card">
            <p>{p.summary}</p>
            <p className="mut">{p.education}</p>
            <ul>{p.achievements.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
        </section>

        <section id="skills">
          <h3>Skills</h3>
          <div className="grid">
            {Object.entries(p.skills).map(([k, v]) => (
              <div className="card" key={k}>
                <h4>{k}</h4>
                <div className="chips">{v.map((s) => <span key={s}>{s}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience">
          <h3>Experience</h3>
          {p.experience.map((x) => (
            <div className="card" key={x.org}>
              <h4>{x.title} — {x.org}</h4>
              <p className="mut">{x.when} · {x.stack}</p>
              <ul>{x.points.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </section>

        <section id="projects">
          <h3>Projects</h3>
          <div className="grid">
            {p.projects.map((x) => (
              <div className="card" key={x.name}>
                <span className="badge">{x.badge}</span>
                <h4>{x.name} <small>{x.tag}</small></h4>
                <p>{x.text}</p>
                <p className="mut">{x.stack}</p>
                <div className="row">
                  {x.links.map(([l, h]) => <a key={l} className="link" href={h} target="_blank" rel="noreferrer">{l} ↗</a>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact">
          <h3>Contact</h3>
          <form className="card form" onSubmit={send}>
            <input name="name" placeholder="Your name" required maxLength={80} />
            <input name="email" type="email" placeholder="Your email" required maxLength={120} />
            <textarea name="message" placeholder="Message" rows={5} required maxLength={2000} />
            <input name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button className="btn" type="submit">Send message</button>
            {status && <p className="mut">{status}</p>}
            <p className="mut">Or email <a href={`mailto:${p.links.email}`}>{p.links.email}</a></p>
          </form>
        </section>
      </main>

      <footer>© {new Date().getFullYear()} {p.name} · {p.location}</footer>
      {qr && <QRModal onClose={() => setQr(false)} />}
    </>
  );
}
