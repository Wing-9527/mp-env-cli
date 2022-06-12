const program = require("commander")

module.exports = () => {
  program.requiredOption("-e, --env <name>", "set environment")
}
