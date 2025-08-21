# Interactive Atomic Structure – Educational Module

**Live App:** https://interactive-atomic-s-ffle.bolt.host/

An interactive Class 10 level learning module covering **Atomic Structure** with simulations, animations, and quizzes. 
The UI follows a **bluish, physics-themed** style for better visual context and engagement.

---

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (and components generated via Bolt AI)
- **Build/Scaffold:** Bolt AI (initial structure & components)
- **Hosting/Deploy:** Bolt Host (public URL above)

> If you migrated the code to a different framework (React/Next/Flask, etc.), update this section accordingly.

---

## Features
- **Interactive simulations** for sub-atomic particles and shell models  
- **Animations** to visualize electron arrangement, Bohr model, and isotopes  
- **Quizzes / MCQs** for quick checks (if enabled)  
- **Bluish physics-themed UI** for consistency with the subject matter  

---

## Project Structure (typical)
```
/public
/src
  /assets
  /components
  /styles
index.html
README.md
```
*(This may vary depending on the export from Bolt AI. Update after pushing the repo.)*

---

## Approach
- Used **Bolt AI** to bootstrap UI and components quickly.
- Focused on **concept-first visuals**: shells, electrons, protons, neutrons.
- Emphasized **interactivity** (click/drag/hover) to reinforce learning outcomes.
- Choose a **bluish palette** to align with physics/space context and keep contrast readable.

---

## Key Design Decisions
- **Simplicity over complexity:** Clear labels, tooltips, minimal text per screen.
- **Accessibility:** Sufficient contrast, readable font sizes, keyboard-friendly interactions where possible.
- **Performance:** Lightweight assets; animations optimized to avoid jank on low-end devices.
- **Scalability:** Components are modular, so future topics (Waves/Optics) can be added.

---

## How to Run Locally
```bash
# 1) Clone the repo
git clone <YOUR_REPO_URL>
cd <YOUR_REPO_DIR>

# 2) If it's a simple static project:
# Just open index.html in a browser
# OR use a local server (recommended):
python -m http.server 5173

# 3) Visit http://localhost:5173

# If it's a React/Next project, use:
npm install
npm run dev   # or npm run build && npm run preview
```
> Replace with your actual commands if the stack differs.

---

## Deployment
- Currently deployed on **Bolt Host**: https://interactive-atomic-s-ffle.bolt.host/
- Alternative quick hosts: **Netlify**, **Vercel** (recommended to connect GitHub repo for CI/CD).

---

## Links
- **Live App:** https://interactive-atomic-s-ffle.bolt.host/
- **Source Code (GitHub):** https://github.com/Shu2003bh/Interactive-atomic-structure/tree/main

---

## Credits
- Built with help from **Bolt AI** for initial scaffolding.
- Icons/illustrations (if any) credited accordingly in `/assets`.
