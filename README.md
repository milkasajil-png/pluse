# Pulse — Campus Event Ticketing Platform

A static event management and ticketing website built for the IMT 405 Web Application Development capstone project (Option A: HTML, CSS, and JavaScript only — no frameworks).

## Description

Pulse lets students browse upcoming campus events (concerts, sports fixtures, talks, community events), search and filter by category, and "book" tickets through an interactive checkout that confirms a booking reference — all without a backend, using vanilla JavaScript.

## Pages

- **Home (`index.html`)** — landing page, hero, featured events, how-it-works steps, FAQ accordion.
- **Events (`events.html`)** — event listing, search and filters, ticket booking, and event management controls.
- **Meet the Team (`team.html`)** — group member profiles (name, ID number, level, programme, photo, role, bio).
- **Contact (`contact.html`)** — contact form with client-side validation and contact details.

## Team / Roles

| Name | Role |
|---|---|
| Jane Doe | Project Lead & Frontend Developer |
| Tunde Bakare | UI Designer |
| Amaka Eze | Frontend Developer |
| Chidi Okafor | Content Lead |
| Fatima Yusuf | QA & Documentation |

> Replace the names, IDs, programmes, bios, and photo placeholders in `team.html` with your actual group members before submission. Each photo placeholder has a comment showing how to swap in `images/yourphoto.jpg`.

## Technologies Used

- HTML5 (semantic markup)
- CSS3 (custom properties / design tokens, Flexbox, Grid, responsive media queries)
- Vanilla JavaScript (DOM manipulation, form validation, search/filter, modal dialogs, accordion)
- Google Fonts (Oswald, Inter, Roboto Mono)

## Interactive Features

1. **Live search + category filters** on the Events page.
2. **Ticket booking modal** with quantity selector, live total, validation, and a generated booking reference.
3. **FAQ accordion** on the homepage.
4. **Responsive navigation** with mobile menu toggle.
5. **Contact form** with inline validation messages.
6. **Event CRUD** to add, edit, activate/deactivate, and delete events with browser storage.

## Setup / Installation

No build step required.

1. Download or clone this repository.
2. Open `index.html` in any modern browser, **or**
3. Serve locally for the best experience:
   ```bash
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`.

## Deployment

This project is a static site and can be deployed for free on GitHub Pages, Netlify, or Vercel:

- **GitHub Pages**: push to a repo, enable Pages in repo settings (Settings → Pages → Deploy from branch → `main` → `/root`).
- **Netlify**: drag-and-drop the project folder into Netlify's deploy interface, or connect the GitHub repo.

## Folder Structure

```
ticketing/
├── index.html
├── events.html
├── team.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/        (add team photos here)
└── README.md
```

## Notes

- Default event data lives in `js/main.js`; changes made through the Events page are saved in `localStorage`.
- Ticket "purchases" are simulated client-side (no payment processing); a booking reference is generated for demonstration purposes.
- Replace placeholder team photos with real photographs of group members before submission, per project requirements.
