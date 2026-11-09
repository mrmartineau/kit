# AGENTS.md

## Coding standards

Follow the `coding-standards` skill (`~/code/mrmartineau/agent-skills/skills/coding-standards/`). Where this file and the skill disagree, this file wins: it describes how this repo already works. Do not rename existing files or classes to match the skill unless asked.

Known differences from the skill: file names match the exported function in camelCase (`formatList.ts`, `formatList.test.ts`), and tests run with `bun test`, not Vitest.
