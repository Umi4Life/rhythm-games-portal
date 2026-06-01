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

## Game Directory Data

Games are managed in `src/lib/data/sites.json`. The file contains a top-level `groups` array; each group represents an arcade publisher, network, or other logical collection shown in the portal.

### Group Structure

Each group must include:

```json
{
  "groupName": "SEGA",
  "games": []
}
```

**Fields Reference:**
- `groupName`: The display name for the group heading, such as `"SEGA"`, `"BEMANI"`, or `"NAMCO"`.
- `games`: An array of game entries that belong under this group.

When adding a new group, keep the `groupName` short and recognizable. Prefer publisher or service-family names over overly specific labels so related games stay grouped together.

### Adding New Games

To add a new game:

1. Open `src/lib/data/sites.json`.
2. Locate the appropriate group in the `groups` array.
3. If no suitable group exists, add a new group object with a `groupName` and empty `games` array.
4. Add a new object to the group's `games` array with the following structure:

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
- `id`: A unique, stable string identifier. It is used for favorites, so do not rename it after release unless you intentionally want to reset saved favorites for that game.
- `title`: The display name of the game card.
- `region`: Optional region marker such as `"jp"` or `"intl"` when separate regional portals exist.
- `tags`: Search keywords and aliases. Include the game title, common abbreviations, publisher/group name, and region when useful.
- `logo`: URL to the game's official logo image.
- `url`: The destination link when a user clicks the card.

### Data Guidelines

- Keep `sites.json` valid JSON: no comments, trailing commas, or duplicate keys.
- Use lowercase kebab-case IDs, such as `maimai-dx-jp` or `sdvx-7`.
- Add regional variants as separate game entries when they use different URLs.
- Include enough tags for search to work with common player shorthand and romanized names.
- Prefer official portal and logo URLs when available.