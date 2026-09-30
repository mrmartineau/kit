import type { Linter } from 'eslint'

/**
 * Base rules, layered on top of a recommended set rather than replacing it.
 * This config intentionally has no runtime dependencies, so bring your own
 * base — see the README:
 *
 * ```ts
 * import js from '@eslint/js'
 * import kit from '@mrmartineau/kit/eslint'
 *
 * export default defineConfig([js.configs.recommended, ...kit])
 * ```
 *
 * Deliberately excludes formatting rules — use Prettier, Biome or oxfmt for
 * those. `curly` is the one exception: it guards against the class of bug where
 * a statement is accidentally added outside an unbraced block, which no
 * formatter will catch for you.
 */
export const base: Linter.Config[] = [
  {
    name: '@mrmartineau/kit/base',
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'multi-line'],
    },
  },
]

/**
 * Opt-in: ban `../` imports in favour of path aliases.
 *
 * Not part of the base config because it only makes sense once a project has
 * aliases configured, and it can't be satisfied at all by colocated tests or
 * sibling-directory imports in a library layout.
 *
 * ```ts
 * import kit, { noRelativeParentImports } from '@mrmartineau/kit/eslint'
 *
 * export default defineConfig([...kit, noRelativeParentImports])
 * ```
 */
export const noRelativeParentImports: Linter.Config = {
  name: '@mrmartineau/kit/no-relative-parent-imports',
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*'],
            message: 'Prefer absolute imports over relative parent imports.',
          },
        ],
      },
    ],
  },
}

export default base
