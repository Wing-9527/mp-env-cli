const path = require("path")
const fs = require("fs/promises")
require("colors")

/** @func 获取环境配置选项 */
function getEnvOptions(envStr) {
  let regex = /const\s(?<env>\w+)/g
  let matchList = envStr.matchAll(regex)
  let envOptions = []
  for (let { groups } of matchList) {
    let { env } = groups
    envOptions.push(env)
  }
  return envOptions
}

async function setEnv(env) {
  try {
    // 读取mp-env配置文件
    let targetConfigPath = path.resolve("mp-env.json")
    let targetConfig = require(targetConfigPath)
    // 修改环境配置文件
    let envConfigPath = path.resolve(targetConfig.path)
    let envConfig = (await fs.readFile(envConfigPath)).toString()
    // 获取所有环境配置选项
    let envOptions = getEnvOptions(envConfig)
    // 获取配置文件现在的环境配置
    let regex = /export\sdefault\s(?<env>\w+)/
    let { groups: { env: nowEnv } } = envConfig.match(regex)
    // 如果目前环境配置等于传入环境配置，终止修改
    if (env === nowEnv) {
      throw `当前环境已是${env}`
    } else {
      let nowEnvConfig = envConfig.replace(regex, `export default ${env}`)
      await fs.writeFile(envConfigPath, nowEnvConfig)
      console.log(
        "success".bgGreen,
        `${env} environment`.inverse
      );
    }
  } catch(e) {
    console.log(
      "error".bgBrightRed,
      e
    )
  }
}

module.exports = setEnv
