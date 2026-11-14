# Ocean Systems Lab website

A static, multi-page site for GitHub Pages. No build step, no Jekyll, no Ruby.

## Publish

1. In the `oceansystemslab.github.io` repository, delete the old Jekyll files
   (everything except `.git`), including the `.github/workflows` folder, which
   would otherwise keep trying to build the old theme.
2. Copy the contents of this folder into the repository root (keep the hidden
   `.nojekyll` file) and commit to `master`.
3. In the repository settings, under Pages, set the source to
   "Deploy from a branch", branch `master`, folder `/ (root)`.

The old addresses (`/people/`, `/publications/`, `/facilities/`, `/news/`)
redirect to the new pages, so existing links keep working.

## Edit content

- `data.js`: people, news and publications. This is the file you will edit most.
- `index.html`: introductory text and home-page pictures.
- `research.html`: research areas, representative papers and the video.
- `facilities.html`: tanks, robots and simulators.
- `contact.html`: contact details and openings.
- `style.css`: colours (top of the file) and layout.
- `images/`: all pictures. Portraits go in `images/people/`.

To add a person, copy one of the lines in `data.js` and change the details.
To add a paper, add a line to `papers` with a `doi` or `arxiv` number so the
title becomes a link.

## Preview locally

Run `python3 -m http.server 8000` in this folder and open http://localhost:8000/
