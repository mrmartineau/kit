# @mrmartineau/kit

A personal collection of sounds, utilities, components, and hooks for use across projects.

## Installation

```bash
bun add @mrmartineau/kit
```

This package provides **configuration files and static assets only**, with no runtime dependencies — it does not install the underlying tools. Install whichever tools you actually need in your project:

```bash
# Biome (linter + formatter)
bun add -d @biomejs/biome

# oxc (linter + formatter)
bun add -d oxlint oxfmt

# ESLint + Prettier
bun add -d eslint @eslint/js prettier

# Prettier with .astro support
bun add -d prettier prettier-plugin-astro
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
  "$schema": "https://biomejs.dev/schemas/2.5.7/schema.json",
  "extends": ["./node_modules/@mrmartineau/kit/src/biome/biome.json"]
}
```

**Included settings:** space indentation (2), single quotes, no semicolons, trailing commas, 100 line width, import sorting, recommended lint rules, React domain rules.

The config is marked `"root": false` so Biome doesn't mistake it for a second root
configuration when it sits inside a project. `root` is not inherited through
`extends`, so your own `biome.json` stays the root.

> Object-key sorting (`assist.actions.source.useSortedKeys`) is deliberately
> **not** enabled — it rewrites object literals in your source on save, which is
> surprising and occasionally meaningful. Turn it on per-project if you want it.

### oxlint

Shared [oxlint](https://oxc.rs/docs/guide/usage/linter/config) config. Reference it via `extends` in your `.oxlintrc.json`:

```json
{
  "$schema": "https://raw.githubusercontent.com/oxc-project/oxc/main/npm/oxlint/configuration_schema.json",
  "extends": ["./node_modules/@mrmartineau/kit/src/oxlint/.oxlintrc.json"]
}
```

**Included settings:** correctness (error), suspicious + perf (warn), browser + node + es2024 envs, typescript/unicorn/import/react/jsx-a11y plugins, no-console warn, no-debugger error, `typescript/consistent-type-imports` error.

`consistent-type-imports` pairs with the `verbatimModuleSyntax` TypeScript
setting this kit also uses: without it, a type-only import that's missing the
`type` keyword survives into the emitted JavaScript as a real runtime import.

### oxfmt

Shared [oxfmt](https://oxc.rs/docs/guide/usage/formatter) config. Reference it when running oxfmt:

```sh
oxfmt -c ./node_modules/@mrmartineau/kit/src/oxfmt/.oxfmtrc.json
```

Or copy the settings into your own `.oxfmtrc.json`. The settings are kept consistent with the Biome config: single quotes, no semicolons, 2-space indentation, 100 print width.

### ESLint

Shared [ESLint](https://eslint.org) flat config with a small set of base rules.
It carries no formatting rules — use Prettier, Biome or oxfmt for that.

This config **layers on top of a recommended base rather than replacing it**, so
that this package stays dependency-free. Compose it with `@eslint/js` yourself —
on its own it will not give you `no-unused-vars`, `no-undef` and friends:

```ts
import js from '@eslint/js'
import kit from '@mrmartineau/kit/eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [...kit],
  },
])
```

**Included rules:** prefer-const, no-var, no-console (warn), no-debugger
(error), no-alert (warn), eqeqeq, object-shorthand, prefer-template,
prefer-arrow-callback and curly (multi-line). Add your own TypeScript/React
plugins on top.

`curly` is the one stylistic-looking rule here, and it's deliberate: it guards
against a statement being accidentally added outside an unbraced block, which no
formatter will catch for you.

#### Opt-in: ban `../` imports

`no-restricted-imports` is exported separately rather than being on by default —
it only makes sense once a project has path aliases configured, and colocated
tests or sibling-directory imports in a library layout can't satisfy it at all.

```ts
import kit, { noRelativeParentImports } from '@mrmartineau/kit/eslint'

export default defineConfig([...kit, noRelativeParentImports])
```

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

#### Astro

Prettier can't parse `.astro` files on its own, so there's a separate config that
layers [`prettier-plugin-astro`](https://github.com/withastro/prettier-plugin-astro)
on top of the base one. It's kept separate because Prettier hard-errors when a
plugin listed in `plugins` can't be resolved — putting the plugin in the base
config would break every non-Astro consumer.

```bash
bun add -d prettier prettier-plugin-astro
```

In your `package.json`:

```json
{
  "prettier": "@mrmartineau/kit/prettier/astro"
}
```

Or in a `prettier.config.mjs`:

```js
export { default } from '@mrmartineau/kit/prettier/astro'
```

Everything from the base config still applies — the `.astro` frontmatter and
expressions are formatted with the same single quotes, no semicolons, 2-space
indentation and 100 print width.

If you also use `prettier-plugin-tailwindcss`, it must come **last** in
`plugins`, so extend the config rather than referencing it directly:

```js
import astro from '@mrmartineau/kit/prettier/astro'

export default {
  ...astro,
  plugins: [...astro.plugins, 'prettier-plugin-tailwindcss'],
}
```

> Biome and oxfmt do not format `.astro` files — Prettier is the only option in
> this kit for an Astro project's templates.

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
| `formatNumberCurrency`                  | `(value, currency, decimalCount = 2, options?)`                                                    | `formatNumberCurrency(1234, "GBP")` → `"£1,234.00"`      |
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

#### Type checks

Runtime "is this a…?" checks. Each one is a TypeScript type guard, so the
value's type narrows after the check. Use them on data you don't control:
API responses, `JSON.parse`, `localStorage`, `catch` errors.

```ts
import { isDefined, isPlainObject, isString } from '@mrmartineau/kit/utils'

const ids = [1, null, 2].filter(isDefined) // number[]
```

| Function          | `true` for                                                             |
| ----------------- | ---------------------------------------------------------------------- |
| `isString`        | strings                                                                |
| `isBoolean`       | booleans                                                               |
| `isBigInt`        | bigints                                                                |
| `isSymbol`        | symbols                                                                |
| `isFunction`      | functions, including classes                                           |
| `isPrimitive`     | anything that isn't an object or function, including `null`            |
| `isNumber`        | any number, including `NaN` and `Infinity`                             |
| `isFiniteNumber`  | numbers that aren't `NaN` or `Infinity`                                |
| `isInteger`       | whole numbers                                                          |
| `isNumericString` | strings that hold a finite number: `'42'` yes, `''` and `'12px'` no    |
| `isNull`          | `null`                                                                 |
| `isUndefined`     | `undefined`                                                            |
| `isNil`           | `null` or `undefined`                                                  |
| `isDefined`       | anything but `null` or `undefined`; works as a `filter` callback       |
| `isObjectLike`    | any non-null object, arrays included                                   |
| `isObject`        | non-null objects that aren't arrays                                    |
| `isPlainObject`   | `{}` literals and `Object.create(null)` only                           |
| `hasKey`          | objects with that key as their own property: `hasKey(data, 'id')`     |
| `isArray`         | arrays                                                                 |
| `isArrayOf`       | arrays where every item passes a check: `isArrayOf(value, isString)`   |
| `isValidDate`     | `Date`s that hold a real date, not `new Date('nonsense')`              |
| `isRegExp`        | regular expressions                                                    |
| `isMap`           | `Map`s                                                                 |
| `isSet`           | `Set`s                                                                 |
| `isError`         | `Error`s and subclasses                                                |
| `isPromiseLike`   | promises and anything else with a `.then` method                       |
| `isIterable`      | anything `for...of` can loop over, strings included                    |
| `isEmpty`         | `null`, `undefined`, `''`, `[]`, `{}` and empty `Map`s and `Set`s      |

More detail and the reasoning behind each one: [Type check helpers](https://zander.wtf/notes/type-check-helpers/).

## Exports map

| Specifier                       | Resolves to                      |
| ------------------------------- | -------------------------------- |
| `@mrmartineau/kit`              | `src/index.ts`                   |
| `@mrmartineau/kit/biome`        | `src/biome/biome.json`           |
| `@mrmartineau/kit/eslint`       | `src/eslint/index.ts`            |
| `@mrmartineau/kit/oxlint`       | `src/oxlint/.oxlintrc.json`      |
| `@mrmartineau/kit/oxfmt`        | `src/oxfmt/.oxfmtrc.json`        |
| `@mrmartineau/kit/prettier`     | `src/prettier/.prettierrc.json`  |
| `@mrmartineau/kit/prettier/astro` | `src/prettier/astro.js`        |
| `@mrmartineau/kit/sounds`       | `src/sounds/index.ts` (metadata) |
| `@mrmartineau/kit/sounds/*.mp3` | `src/sounds/*.mp3` (raw files)   |
| `@mrmartineau/kit/utils`        | `src/utils/index.ts`             |
| `@mrmartineau/kit/components`   | `src/components/index.ts`        |
| `@mrmartineau/kit/hooks`        | `src/hooks/index.ts`             |

## Development

This repo dogfoods its own Biome config — the root `biome.json` extends
`src/biome/biome.json`, so a change to the shared config shows up here first.

```bash
bun run lint       # check
bun run lint:fix   # check and apply fixes
bun run format     # format only
bun test
bun run typecheck
```

CI runs `biome ci .` alongside typecheck and tests on every pull request.

## Attribution

### Sounds

Sounds by [Kenney](https://www.kenney.nl), licensed under [CC0 1.0](http://creativecommons.org/publicdomain/zero/1.0/) and some from [use-sound](https://github.com/joshwcomeau/use-sound) by [Josh Comeau](https://www.joshwcomeau.com/)
