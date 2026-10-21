# Chin Zhen Ho · Portfolio

Personal portfolio site: https://chinzhenho.github.io

Plain HTML, CSS and JavaScript. No framework and no build step, hosted on GitHub Pages.

## Files

| File | What it does |
| --- | --- |
| `projects.js` | **All the content**: profile, education, experience and projects. This is normally the only file to edit. |
| `index.html` | Page structure and security settings |
| `style.css` | Design. Colours and sizes are variables at the top. |
| `script.js` | Builds the page from `projects.js` |
| `images/` | Project cover images (1600 × 1000 recommended) |

## Updating content

1. Edit `projects.js`. To add a project, copy one `{ ... }` block in `projects` and change it.
2. Preview locally:
   ```bash
   python -m http.server 5500
   ```
   Then open http://localhost:5500. Press **F12 → Console** to see warnings about mistakes in the data.
3. Commit and push. GitHub Pages updates the site within a minute.

## Security

- All text from `projects.js` is HTML-escaped before it is shown, so content can never inject code.
- Links are only allowed as `https://`, `mailto:` or `tel:`. Anything else is hidden automatically.
- A Content Security Policy in `index.html` only allows scripts from this site.
- External links open with `rel="noopener noreferrer"`.
