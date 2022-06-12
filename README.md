# mp-env-cli
命令行修改小程序环境插件

# install
`
npm install mp-env-cli
`
# step1
create mp-env.json in the root path  
path should be a relative path  
`
{
  "path": "./config/env.cofig.js"
}
`
# step2
mp-env -e [your env name]  
`
mp-env -e prod
`
