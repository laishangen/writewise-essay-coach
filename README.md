# WriteWise Essay Coach

WriteWise is a responsive English-writing practice site with a reusable Codex Skill. The site is a static HTML/CSS/JavaScript application and can be published directly with GitHub Pages.

## Repository layout

```text
writewise-essay-coach/
├─ docs/                         # GitHub Pages site
│  ├─ index.html
│  ├─ styles.css
│  ├─ app.js
│  └─ .nojekyll
├─ .agents/skills/
│  └─ writewise-essay-coach/     # Shared Codex Skill
│     ├─ SKILL.md
│     ├─ agents/openai.yaml
│     ├─ references/
│     └─ assets/frontend-template/
└─ README.md
```

One repository is enough. The website and its Skill change together, so keeping them in one repository avoids synchronization problems.

## Run locally

From this directory:

```powershell
python -m http.server 4173 --directory docs
```

Open `http://127.0.0.1:4173/`.

## Publish with GitHub Pages

### 1. Create the repository

Create an **empty public repository** under your own GitHub account or organization. Do not ask the agent to create a separate GitHub identity. A Codex agent can commit and push to the repository only when local Git credentials or a GitHub CLI login are available.

Recommended repository name:

```text
writewise-essay-coach
```

### 2. Push this folder

From this directory, run:

```powershell
git init -b main
git add .
git commit -m "Publish WriteWise website and Skill"
git remote add origin https://github.com/YOUR_USERNAME/writewise-essay-coach.git
git push -u origin main
```

Replace `YOUR_USERNAME` with the account that owns the repository.

If you use GitHub CLI, first run `gh auth login`, then the same commands work.

### 3. Enable GitHub Pages

In the GitHub repository:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/docs`.
4. Save.

The published URL will normally be:

```text
https://YOUR_USERNAME.github.io/writewise-essay-coach/
```

Deployment can take a few minutes. Every push to `main` updates the public site automatically.

## Use the Skill

If this repository is opened as a Codex project, the shared Skill is available at:

```text
.agents/skills/writewise-essay-coach
```

To use it as a personal Skill on Windows, copy the folder into:

```text
%USERPROFILE%\.agents\skills\
```

Invoke it with:

```text
$writewise-essay-coach
```

## Important limitations

- This release is a static site and uses the browser's local rule-based initial screening.
- It does not publish an AI model or a server-side API.
- Scores are practice estimates, not official exam results.
- Never commit API keys. If a model backend is added later, keep it in a separate serverless or backend deployment and provide the key through server-side environment variables.
- The default local mode stores drafts in the browser. If an external AI endpoint is connected, users must be told that essay text is sent to that service.

## Updating the site

Edit files in `docs/`, then run:

```powershell
git add docs
git commit -m "Update website"
git push
```

If the Skill changes as well:

```powershell
git add docs .agents/skills/writewise-essay-coach
git commit -m "Update website and essay-coach Skill"
git push
```
