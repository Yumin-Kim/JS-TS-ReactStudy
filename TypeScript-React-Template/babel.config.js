console.log("babel")
const presets = [
  "@babel/preset-env",
  "@babel/preset-react",
  "@babel/preset-typescript"
]

const plugins = [
  ["babel-plugin-transform-class-properties"]
]

module.exports={presets,plugins}