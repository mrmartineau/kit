import baseWithSchema from './.prettierrc.json' with { type: 'json' }

// `$schema` is meaningful in the JSON file but Prettier warns about it as an
// unknown option when a config is loaded as a JS module.
const { $schema, ...base } = baseWithSchema

/**
 * Base Prettier config plus `.astro` support.
 *
 * Kept separate from `@mrmartineau/kit/prettier` because Prettier hard-errors
 * when a plugin listed in `plugins` can't be resolved — putting the Astro
 * plugin in the base config would break every non-Astro consumer.
 *
 * Requires `prettier-plugin-astro` to be installed in the consuming project.
 *
 * @type {import('prettier').Config}
 */
const config = {
  ...base,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}

export default config
