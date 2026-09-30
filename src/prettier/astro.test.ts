import { expect, test } from 'bun:test'
import { format } from 'prettier'
import baseConfig from './.prettierrc.json'
import astroConfig from './astro.js'

const source = `---
import Layout from "../layouts/Layout.astro";
const   { title = "hi" } = Astro.props;
---

<Layout   title={title}>
    <h1 class="a"    >{ title }</h1>
</Layout>
`

test('astro config inherits every option from the base config', () => {
  const { $schema, ...base } = baseConfig
  for (const [key, value] of Object.entries(base)) {
    expect(astroConfig[key as keyof typeof astroConfig]).toEqual(value)
  }
})

test('astro config does not leak $schema as a Prettier option', () => {
  expect(astroConfig).not.toHaveProperty('$schema')
})

test('astro config registers the astro plugin and parser override', () => {
  expect(astroConfig.plugins).toEqual(['prettier-plugin-astro'])
  expect(astroConfig.overrides).toEqual([{ files: '*.astro', options: { parser: 'astro' } }])
})

test('formats an .astro file using the base style rules', async () => {
  const output = await format(source, {
    ...astroConfig,
    filepath: 'Demo.astro',
    parser: 'astro',
  })

  expect(output).toBe(`---
import Layout from '../layouts/Layout.astro'
const { title = 'hi' } = Astro.props
---

<Layout title={title}>
  <h1 class="a">{title}</h1>
</Layout>
`)
})
