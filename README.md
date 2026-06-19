# Memory-Mate
# Memory Mate

A simple flashcard app that helps you learn through **active recall** instead of passive re-reading. Write a question on one side of a card, the answer on the other, flip to test yourself, and track what you actually know.

## The problem

Most students re-read notes until they feel familiar — but recognition isn't recall. Memory Mate forces you to retrieve the answer from scratch before checking it, which is the part that actually strengthens memory.

## Features

- **Create flashcards** — question on the front, answer on the back
- **Flip to test yourself** — click any card to reveal the answer
- **Mark known / needs review** — track your own confidence per card
- **Filter by status** — focus only on the cards you're still struggling with
- **Persistent storage** — cards are saved in `localStorage`, so your deck is still there next time you open the app
- **Keyboard friendly** — press Enter to move between fields and add a card
- **Accessible** — visible focus states, reduced-motion support, ARIA labels on icon buttons

## Tech stack

Plain HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies.

## Project structure

```
memory-mate/
├── index.html      # page structure
├── style.css        # ink-on-paper flashcard theme
├── script.js         # app logic (CRUD, filtering, storage)
└── README.md
```

## Getting started

No installation needed.

1. Download/clone the three files into the same folder.
2. Open `index.html` in any browser.

That's it — no server, no npm install.

## How it works

1. Type a question and answer, click **Add Card** (or press Enter).
2. Click a card to flip it and reveal the answer.
3. Mark it **Know it** or **Review again** based on how you did.
4. Use the **All / Known / Review** filters to focus your study session.
5. Close the tab whenever — your deck reloads automatically next visit.

## Data storage

All cards are stored locally in the browser via `localStorage` under the key `memorymate-cards`. Nothing is sent to a server, so your deck is private to that browser. Clearing browser storage will erase your cards.

## Possible future additions

- Spaced repetition scheduling (e.g. show "review" cards more often)
- Edit existing cards instead of delete-and-recreate
- Import/export deck as JSON
- Dark mode
- Card categories/tags

## License

Free to use and modify for personal or academic projects.
