# Debashis Paul — Portfolio

Next.js 14 + three.js frontend · Node.js/Express backend (contact form, QR API).

## Run locally
```bash
npm run install-all
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
npm run dev        # web :3000, api :4000
```

## Deploy (free, ~5 min)
1. Push this folder to a GitHub repo.
2. **Backend → Render**: New → Blueprint → pick the repo (uses `render.yaml`).
   Set `CORS_ORIGIN` to your frontend URL (add after step 3). Copy the API URL.
3. **Frontend → Vercel**: Import repo, set **Root Directory = `frontend`**,
   add env `NEXT_PUBLIC_API_URL` = your Render URL. Deploy.
4. Back on Render, set `CORS_ORIGIN` to the Vercel URL and redeploy.

## Link & QR
Your Vercel URL is the shareable link. On the live site, click **Share · QR** to
show/download a QR code of the current URL (generated in the browser).
Printable PNG from the API: `https://<api>/api/qr?url=https://<your-site>`

Edit all content in `frontend/lib/data.js`.
