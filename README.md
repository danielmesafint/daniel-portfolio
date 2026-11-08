# Dr. Daniel Mesafint - Portfolio

Personal academic portfolio of Dr. Daniel Mesafint Belete, built with React and Vite and deployed on Vercel.

## Editing content

All text, publications, projects, courses and links live in `src/data/profile.js`.
Images are in `public/images/`, and the CV is `public/Dr_Daniel_Mesafint_CV.pdf`.

## AI assistant

`api/chat.js` is a Vercel function that answers visitor questions with Claude, using the facts in `api/_knowledge.js`.
Set `ANTHROPIC_API_KEY` in the Vercel project's environment variables to switch it on (optional `CHAT_MODEL`, default `claude-haiku-5-5`).
Without a key the site uses a simple built-in assistant.

## Commands

```bash
npm install
npm run dev      # local development
npm run build    # production build into dist/
```
