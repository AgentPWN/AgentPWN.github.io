# Rupak Banerjee · Portfolio

A fast, dependency-free portfolio site. Plain HTML/CSS/JS, no build step, no framework. Hosts on GitHub Pages as-is.

## Structure

```
.
├── index.html          # Main page (hero, about, projects, experience, skills, blog, contact)
├── styles.css          # All site styles
├── script.js           # Nav, scroll reveal, count-up, card glow
├── blog/
│   ├── example-post.html   # Blog post template; copy this for new posts
│   └── post.css            # Blog reading styles
├── .nojekyll           # Tells GitHub Pages to serve files as-is
└── README.md
```

## Customize

Everything is plain text. Open the files and edit:

- **Name / tagline / bio** → `index.html` (hero and About sections)
- **Projects** → the `.card` blocks in the `#projects` section
- **Experience** → the `.timeline__item` blocks in `#experience`
- **Skills** → the `.skills__group` lists
- **Blog posts** → copy `blog/example-post.html` to a new file (e.g. `blog/my-post.html`), edit it, then add a matching `<a class="post">` card in the `#blog` section of `index.html`
- **Colors** → the `:root` variables at the top of `styles.css` (`--accent`, `--bg`, etc.)
- **Links** → email/GitHub/LinkedIn in the `#contact` section

## Preview locally

Just open `index.html` in a browser. Or serve it:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## Deploy to GitHub Pages

1. Create a repo on GitHub. To use the free `username.github.io` URL, name the repo **`username.github.io`** (replace with your GitHub username). Any other name works too; it'll live at `username.github.io/repo-name/`.

2. Push these files to the repo:

   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment**. Set **Source** to *Deploy from a branch*, pick branch **`main`** and folder **`/ (root)`**, then **Save**.

4. Wait ~1 minute. Your site will be live at `https://USERNAME.github.io/` (or `.../REPO/`).

No build tools required. GitHub Pages serves the static files directly.
