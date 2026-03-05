import type { Linter } from 'eslint'

const config: Linter.Config[] = [
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
      eqeqeq: ['error', 'always'],
      curly: ['error', 'multi-line'],
    },
  },
]

export default config
