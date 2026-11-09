# AxiorAI website

Static Next.js site, ready for **GitHub Pages**.

## Local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes static files to out/
npm start        # preview the static build
```

## Deploy to GitHub Pages

1. Create a new GitHub repo and push **this folder** as the repo root (not the parent `AxiorAI website` folder).

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

3. Push to `main` (or run the **Deploy to GitHub Pages** workflow). The site will be at:

- Project repo: `https://<you>.github.io/<repo>/`
- User site (`<you>.github.io`): `https://<you>.github.io/`

`basePath` is set automatically from the repo name. Override with `BASE_PATH` in the workflow if needed (use `BASE_PATH: ""` for a custom domain at the site root).
