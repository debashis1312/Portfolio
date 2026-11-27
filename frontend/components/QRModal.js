"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

// Generates a QR code for the live site URL in the browser (works even if the API is down).
export default function QRModal({ onClose }) {
  const [src, setSrc] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const u = window.location.origin;
    setUrl(u);
    QRCode.toDataURL(u, { width: 512, margin: 2, color: { dark: "#0b0b14", light: "#ffffff" } }).then(setSrc);
  }, []);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Scan to open this portfolio</h3>
        {src && <img src={src} alt="QR code" width={240} height={240} />}
        <p className="mut">{url}</p>
        <div className="row">
          <button className="btn" onClick={copy}>{copied ? "Copied ✓" : "Copy link"}</button>
          <a className="btn ghost" href={src} download="portfolio-qr.png">Download QR</a>
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
