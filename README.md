# Dev Guide

## Project Setup

This project uses [pnpm](https://pnpm.io/) as the package manager.

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start dev server**
   ```bash
   pnpm dev
   ```

## Running Tests

The project uses [Vitest](https://vitest.dev/) for unit testing.

To run all tests once:
```bash
pnpm test
```

## Adding New Games

Games are managed via a JSON configuration file. To add a new game, follow these steps:

1. Open `src/lib/data/sites.json`.
2. Locate the appropriate group in the `groups` array (e.g., "SEGA", "BEMANI").
3. Add a new object to the `games` array with the following structure:

```json
{
  "id": "unique-game-id",
  "title": "Game Title",
  "region": "jp", 
  "tags": ["tag1", "tag2"],
  "logo": "https://link-to-logo.png",
  "url": "https://game-official-url.com"
}
```

**Fields Reference:**
- `id`: A unique string identifier (used for favorites).
- `title`: The display name of the game.
- `region`: (Optional) Use `"jp"`, `"intl"`, etc., to categorize by region.
- `tags`: An array of strings used for searching and filtering.
- `logo`: URL to the game's official logo image.
- `url`: The destination link when a user clicks the card.