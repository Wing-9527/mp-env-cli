#! /usr/bin/env node

const program = require("commander")
const { version } = require("../package")
require("./options")() // options
const setEnv = require("./setEnv")

program.version(version)
program.parse(process.argv)

let { env } = program.opts()
setEnv(env)
