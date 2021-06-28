console.log("babel")
const presets = [
  "@babel/preset-env",
  "@babel/preset-react"
]

const plugins = [
  ["babel-plugin-transform-class-properties"]
]

module.exports={presets,plugins}