import kit from './src/oxfmt/.oxfmtrc.json' with { type: 'json' }

export default { ...kit, ignorePatterns: ['CHANGELOG.md', 'bun.lock'] }
