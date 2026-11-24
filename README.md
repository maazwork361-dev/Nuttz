# Nuttz

## Add papers
Drop PDFs into these folders (create a new subject folder any time):

    papers/pyq/<Subject>/<file>.pdf     e.g. papers/pyq/Commerce/2025.pdf
    papers/mock/<Subject>/<file>.pdf    e.g. papers/mock/Accounts/Mock Test 1.pdf

- The subject name is the folder name. A new folder = a new subject in the app.
- The year is read from the file name (first 4-digit year, e.g. "2024 Dec.pdf").
- Files placed directly in papers/pyq or papers/mock go under "General".

## Deploy on Cloudflare Pages
Build command: `node build.js`   Build output directory: `dist`
Push to GitHub; every push rebuilds the list automatically.

## Test locally
    node build.js && npx serve dist
