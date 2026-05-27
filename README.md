# @mrmartineau/kit

A personal collection of sounds, utilities, components, and hooks for use across projects.

## Installation

```bash
bun add @mrmartineau/kit
```

This package provides **configuration files and static assets only** — it does not install the underlying tools. Install whichever tools you actually need in your project:

```bash
# Biome (linter + formatter)
bun add -d @biomejs/biome

# oxc (linter + formatter)
bun add -d oxlint oxfmt

# ESLint + Prettier
bun add -d eslint prettier
```

You don't need all of them — just pick the tools you want to use and reference the matching config from this package.

## Project structure

```
src/
├── biome/        # Shared Biome config
├── eslint/       # Shared ESLint flat config
├── oxfmt/        # Shared oxfmt config
├── oxlint/       # Shared oxlint config
├── prettier/     # Shared Prettier config
├── sounds/       # Static audio assets (.mp3) — not bundled
├── utils/        # Utility functions
├── components/   # Reusable components
├── hooks/        # Reusable hooks
└── scripts/      # Standalone scripts
```

## Usage

### Sounds

Sound files are exposed as raw `.mp3` files via subpath exports — they are **not** bundled or transformed. Your bundler or runtime resolves them as static assets.

**Import a sound file directly:**

```ts
// Resolves to the raw .mp3 file in node_modules
import clickSound from '@mrmartineau/kit/sounds/click_001.mp3'

// Use with Audio API
const audio = new Audio(clickSound)
audio.play()
```

**Use the metadata module for programmatic access:**

```ts
import {
  sounds,
  soundCategories,
  getSoundsByCategory,
  getSoundPath,
} from '@mrmartineau/kit/sounds'

// List all sound names
console.log(sounds)

// Get all sounds in a category
const clickSounds = getSoundsByCategory('click')
// => ["click_001", "click_002", "click_003", "click_004", "click_005"]
```

**Available sound categories:** back, bite, bong, boop, buy, click, close, confirmation, disable, drop, enable, error, glass, glitch, maximize, menu, minimize, open, pluck, plunger, pop, question, rising, scratch, scroll, select, switch, tick, toggle

### Biome

Shared [Biome](https://biomejs.dev) config for linting and formatting. Biome natively supports extending from packages via its `extends` field.

In your project's `biome.json`:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.1.3/schema.json",
  "extends": ["./node_modules/@mrmartineau/kit/src/biome/biome.json"]
}
```

**Included settings:** space indentation, single quotes, no semicolons, import sorting, sorted keys, recommended lint rules, React domain rules.

### oxlint

Shared [oxlint](https://oxc.rs/docs/guide/usage/linter/config) config. Reference it via `extends` in your `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["./node_modules/@mrmartineau/kit/src/oxlint/.oxlintrc.json"]
}
```

**Included settings:** correctness (error), suspicious + perf (warn), typescript/unicorn/import/react/jsx-a11y plugins, no-console warn, no-debugger error.

### oxfmt

Shared [oxfmt](https://oxc.rs/docs/guide/usage/formatter) config. Reference it when running oxfmt:

```sh
oxfmt -c ./node_modules/@mrmartineau/kit/src/oxfmt/.oxfmtrc.json
```

Or copy the settings into your own `.oxfmtrc.json`. The settings are kept consistent with the Biome config: single quotes, no semicolons, 2-space indentation, 100 print width.

### ESLint

Shared [ESLint](https://eslint.org) flat config with sensible base rules (no formatting rules — use Prettier/Biome/oxfmt for that).

In your project's `eslint.config.ts` (or `.js`):

```ts
import packConfig from '@mrmartineau/kit/eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [packConfig],
  },
])
```

**Included rules:** prefer-const, no-var, no-console (warn), no-debugger (error), eqeqeq, object-shorthand, prefer-template, prefer-arrow-callback, curly (multi-line). Add your own TypeScript/React plugins on top.

### Prettier

Shared [Prettier](https://prettier.io) config. Reference it in your `package.json`:

```json
{
  "prettier": "@mrmartineau/kit/prettier"
}
```

Or create a `.prettierrc.json`:

```json
"@mrmartineau/kit/prettier"
```

**Included settings:** single quotes, no semicolons, 2-space indentation, trailing commas, 100 print width.

### Utils, Components, Hooks

```ts
import { ... } from "@mrmartineau/kit/utils";
import { ... } from "@mrmartineau/kit/components";
import { ... } from "@mrmartineau/kit/hooks";
```

#### Formatters

A collection of number and string formatters. All number formatters wrap
`Intl.NumberFormat` and default to the `en-GB` locale.

```ts
import {
  formatNumberAccounting,
  formatNumberBase,
  formatNumberBytes,
  formatNumberCompact,
  formatNumberCurrency,
  formatNumberDecimal,
  formatNumberDecimalForceDecimalPlaces,
  formatNumberOrdinal,
  formatNumberPercent,
  formatNumberRange,
  formatNumberSignDisplay,
  formatInitials,
  formatList,
  maskString,
  normalizeWhitespace,
  pluralize,
  slugify,
  stripDiacritics,
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  toStartCase,
  truncate,
} from '@mrmartineau/kit/utils'
```

##### Number formatters

| Function                                | Signature                                                                                          | Example                                                  |
| --------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `formatNumberBase`                      | `(value, options?)`                                                                                | `formatNumberBase(1234)` → `"1,234"`                     |
| `formatNumberDecimal`                   | `(value, decimalCount = 2, options?)`                                                              | `formatNumberDecimal(1234.567, 2)` → `"1,234.57"`        |
| `formatNumberDecimalForceDecimalPlaces` | `(value, decimalCount = 2, options?)`                                                              | `formatNumberDecimalForceDecimalPlaces(10, 2)` → `"10.00"` |
| `formatNumberCurrency`                  | `(value, currency, decimalCount = 2, options?)`                                                    | `formatNumberCurrency(1234, "GBP")` → `"£1,234"`         |
| `formatNumberAccounting`                | `(value, currency, decimalCount = 2, options?)` — negatives wrapped in parens                      | `formatNumberAccounting(-100, "USD")` → `"($100.00)"`    |
| `formatNumberPercent`                   | `(value, decimalCount = 2, options?)` — value already in decimal form (`0.42` → `42%`)             | `formatNumberPercent(0.421)` → `"42.1%"`                 |
| `formatNumberCompact`                   | `(value, display = "short", options?)`                                                             | `formatNumberCompact(1200)` → `"1.2K"`                   |
| `formatNumberOrdinal`                   | `(value, locale = "en-GB")`                                                                        | `formatNumberOrdinal(3)` → `"3rd"`                       |
| `formatNumberBytes`                     | `(bytes, binary = false, decimalCount = 2)`                                                        | `formatNumberBytes(1536, true)` → `"1.5 KiB"`            |
| `formatNumberRange`                     | `(min, max, options?, locale = "en-GB")`                                                           | `formatNumberRange(1, 5)` → `"1–5"`                      |
| `formatNumberSignDisplay`               | `(value, decimalCount = 2, signDisplay = "exceptZero", options?)`                                  | `formatNumberSignDisplay(5)` → `"+5"`                    |

##### String formatters

| Function              | Signature                                                                       | Example                                                |
| --------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `formatList`          | `(array, options?)` — wraps `Intl.ListFormat`                                   | `formatList(["a","b","c"])` → `"a, b, and c"`          |
| `toStartCase`         | `(str)`                                                                         | `toStartCase("hello_world")` → `"Hello World"`         |
| `toCamelCase`         | `(str)`                                                                         | `toCamelCase("hello_world")` → `"helloWorld"`          |
| `toPascalCase`        | `(str)`                                                                         | `toPascalCase("hello_world")` → `"HelloWorld"`         |
| `toKebabCase`         | `(str)`                                                                         | `toKebabCase("helloWorld")` → `"hello-world"`          |
| `toSnakeCase`         | `(str)`                                                                         | `toSnakeCase("helloWorld")` → `"hello_world"`          |
| `truncate`            | `(str, maxLength, { ellipsis = "…", wordBoundary = false }?)`                   | `truncate("Hello world", 8)` → `"Hello w…"`            |
| `slugify`             | `(str)`                                                                         | `slugify("Hello, World!")` → `"hello-world"`           |
| `pluralize`           | `(count, singular, plural?)`                                                    | `pluralize(2, "child", "children")` → `"children"`     |
| `stripDiacritics`     | `(str)`                                                                         | `stripDiacritics("café")` → `"cafe"`                   |
| `normalizeWhitespace` | `(str)`                                                                         | `normalizeWhitespace("  a\n\tb  ")` → `"a b"`          |
| `maskString`          | `(str, { visibleStart = 0, visibleEnd = 4, maskChar = "•" }?)`                  | `maskString("4242424242424242")` → `"••••••••••••4242"` |
| `formatInitials`      | `(name, maxLength = 2)`                                                         | `formatInitials("John Smith")` → `"JS"`                |

## Exports map

| Specifier                       | Resolves to                      |
| ------------------------------- | -------------------------------- |
| `@mrmartineau/kit`              | `src/index.ts`                   |
| `@mrmartineau/kit/biome`        | `src/biome/biome.json`           |
| `@mrmartineau/kit/eslint`       | `src/eslint/index.ts`            |
| `@mrmartineau/kit/oxlint`       | `src/oxlint/.oxlintrc.json`      |
| `@mrmartineau/kit/oxfmt`        | `src/oxfmt/.oxfmtrc.json`        |
| `@mrmartineau/kit/prettier`     | `src/prettier/.prettierrc.json`  |
| `@mrmartineau/kit/sounds`       | `src/sounds/index.ts` (metadata) |
| `@mrmartineau/kit/sounds/*.mp3` | `src/sounds/*.mp3` (raw files)   |
| `@mrmartineau/kit/utils`        | `src/utils/index.ts`             |
| `@mrmartineau/kit/components`   | `src/components/index.ts`        |
| `@mrmartineau/kit/hooks`        | `src/hooks/index.ts`             |

## Attribution

### Sounds

Sounds by [Kenney](https://www.kenney.nl), licensed under [CC0 1.0](http://creativecommons.org/publicdomain/zero/1.0/) and some from [use-sound](https://github.com/joshwcomeau/use-sound) by [Josh Comeau](https://www.joshwcomeau.com/)
