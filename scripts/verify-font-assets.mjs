import { existsSync } from 'node:fs'

const required = [
  'public/assets/fonts/fa-brands-400.woff2',
  'public/assets/fonts/fa-brands-400.ttf',
  'public/assets/fonts/fa-light-300.woff2',
  'public/assets/fonts/fa-light-300.ttf',
  'public/assets/fonts/fa-regular-400.woff2',
  'public/assets/fonts/fa-regular-400.ttf',
  'public/assets/fonts/fa-solid-900.woff2',
  'public/assets/fonts/fa-solid-900.ttf'
]

const missing = required.filter((path) => !existsSync(path))

if (missing.length > 0) {
  console.error('Missing required Font Awesome font assets:')
  for (const path of missing) console.error(`- ${path}`)
  console.error('\nRestore the licensed font files from the original project before deploying.')
  process.exit(1)
}

console.log('Required Font Awesome font assets are present.')
