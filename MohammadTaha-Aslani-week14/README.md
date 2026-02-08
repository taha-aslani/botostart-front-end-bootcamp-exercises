# مخاطبین — Contact Manager

A dark-mode, RTL Persian (Farsi) contact management web app built with React only (no UI/state/form libraries). Data is persisted in `localStorage`.

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Features

- Add contacts (name required, email and phone optional)
- Real-time search by name, email, or phone
- Single and multi-select with "Select All"
- Delete with confirmation modal and Undo (5 seconds)
- Persian UI, RTL layout, Persian numerals where appropriate
- Inline validation (email and Iranian mobile regex)
- Fully responsive, CSS-only hover effects

## Tech

- React 18, JSX, CSS
- `useState`, `useEffect`
- `localStorage` for persistence
- Vite for dev/build
