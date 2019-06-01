const fs = require('fs')
const { resolve } = require('path')
const stripJsonComments = require('strip-json-comments')

function ResolveTSPathsToAlias(options) {

  const context = options.context
  const json = fs.readFileSync(options.tsconfig, 'utf8')
  const tsconfig = stripJsonComments(json)
  const { paths } = JSON.parse(tsconfig).compilerOptions

  const aliases = {}

  Object.keys(paths).forEach((item) => {
    const key = item.replace('/*', '')
    const value = resolve(context, paths[item][0].replace('/*', '').replace('*', ''))

    aliases[key] = value
  })

  return aliases

}

module.exports = ResolveTSPathsToAlias
