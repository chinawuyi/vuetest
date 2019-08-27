

# vue

> vue+webpack+mintui 多页项目

[![node version](https://img.shields.io/badge/node.js-%3E=_6.00-green.svg?style=flat-square)](http://nodejs.org/download/)
# 安装启动

#### 安装Node
推荐安装最新的 `LTS` 版本Node，如果本地没有安装Node或安装了低版本的Node，可以按下面的指引安装最新版的Node：

1. **Windows系统**，访问[https://nodejs.org/](https://nodejs.org/)，下载最新的 `LTS` 版本Node，点击默认安装即可。
2. **Mac系统**安装方式跟Windows一样。
3. **Linux系统**，推荐使用源码安装方式，这样无需自己配置 `path`，如果无法用源码安装，也可以直接二进制版本的Node，解压后把里面的bin目录路径加到系统的 `PATH` 即可：
	- **源码安装**：从[Node官网](https://nodejs.org/en/download/)下载最新版的**Source Code**(或者用`wget`命令下载)，解压文件(`tar -xzvf node-xxx.tar.gz`)，进入解压后的根目录(`node-xxx`)，依次执行`./configure`、`./make`和`./make install`。
	- **直接用二进制版本**：从[Node官网](https://nodejs.org/en/download/)下载最新版的**Linux Binaries**(或者用`wget`命令下载)，解压文件(`tar -xzvf node-xxx.tar.gz`)，解压后将Node二进制文件的bin目录完整路径加到系统的 `PATH`。

Node安装完成后，在命令行执行 `node -v` 查看下对应的Node版本是否安装成功：

	$ node -v
	v8.9.4
我们可以使用淘宝镜像：

	npm install cnpm -g --registry=https://registry.npm.taobao.org

## Build Setup

``` bash
# install dependencies
npm install 
or
cnpm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```


## Root Folder Structure
[http://localhost:8080/admin.html](http://localhost:8080/admin.html)

[http://localhost:8080/user.html](http://localhost:8080/user.html)

## Build

``` bash
# build for production with minification
npm run build
npm run build:sit

```
	说明：
     命令可以增加环境配置，比如 增加 pre环境 则 
     "build:pre": "cross-env NODE_ENV=pre node build/build.js",

     注意 
       需要在 build ---index 中配置 pre环境的静态资源路径
       需要在 src--common-api 中配置 pre环境的接口访问路径


Then visit the pages
[http://localhost:2333/user/login.html](http://localhost:2333/user/login.html)

## Root Folder Structure

```bash
├── src  # main folder
│   ├── common  # common assets folder
│   │   ├── 插件
│   │   ├── 公用JS
│   │   └── 公用CSS
│   ├── components # common components folder
│   │   └── a.vue
│   └── pages  # pages
│       ├── user  # user part (folder name can be customized)
│               ├── user.html
│               ├── user.js
│               └── app.vue
│               └── page
│               └── components
│               └── router

│       └── admin # admin part (folder name can 
│               ├── admin.html
│               ├── admin.js
│               └── app.vue
│               └── page
│               └── components
│               └── router
├── LICENSE
├── .babelrc          # babel config (es2015 default)
├── .eslintrc.js      # eslint config (eslint-config-vue default)
├── package.json
├── postcss.config.js # postcss (autoprefixer default)
├── webpack.config.js
└── README.md
```

## Dist Folder Structure

```bash
├── static
│   ├── css
│   ├── fonts
│   ├── js
├── user.html
├── admin.html
```

 ## 配置接口代理
``` bash
 静态资源文件夹
    assetsSubDirectory: 'static',
 发布路径
    assetsPublicPath: '/',

 代理配置表，在这里可以配置特定的请求代理到对应的API接口
 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
 代理可以配置多个 如下例子
    proxyTable: {
      '/api': {
          target: 'www.example.com/', -------------------> 接口的域名
          secure: false,   ------------------------------>如果是https接口，需要配置这个参数
          changeOrigin: true, ---------------------------> 如果接口跨域，需要进行这个参数配置
          pathRewrite: {
            '^/api': ''
          }
      },
      '/api1': {
          target: 'www.example1.com/', -------------------> 接口的域名
          secure: false,  --------------------------------> 如果是https接口，需要配置这个参数
          changeOrigin: true,  ---------------------------> 如果接口跨域，需要进行这个参数配置
          pathRewrite: {
            '^/api1': ''
          }
      }
    },
    
```

```
  // 需要代理访问的域名
  let baseUrl = {                      
      serverB: 'http://baidu.com',
      serverA: 'http://gateway.fangkuaiyi.com',
  }
  // 配置请求接口和代理域名
  export const getInfo = async (param = {}, config = {}) => 
        await ajax.get(`${baseUrl.serverB}/mobile/home/getHeadData`,param, config);
        
``` 
## 原理
 每一个 模块其实是一个单页 模块和模块之间是多页结构
 
## 总结 
  1. 首先安装NODE 版本号不低于8.0

  2. 建立项目文件夹 test(移动单页为例)

  3. cd test

  4. git clone https://lixiaolong@dev-cv.saicmotor.com/gitlab/newDmsUtils/xyx-mobile-multi-web-template.git

  5. npm install

  6. npm run dev 
  7. 打包运行  npm run build
 
## 使用注意事项

   1. 如何增加环境

    打开 package.json 在script 中增加 
     "build:pre": "cross-env NODE_ENV=pre node build/build.js",

    打开src - common - api.js中增加 pre环境接口访问的地址
    打开config ---index.js 增加pre环境的静态资源地址

    运行命令 npm run build:pre 
 

    如果是开发阶段 设置环境 举例sit环境来说
    开发环境下 sit的静态资源指向了sit的服务器
    但是接口始终是要经过代理才可以访问的 所以开发环境配置大家可以根据自己的需要灵活修改代理文件


## 问题处理
        启动提示某些包找不到
        删除本地node_modules 重新安装
        如果还是没有解决 单独安装该模块

        打包文件过大，可以参照webpack优化
        https://segmentfault.com/a/1190000011138081

        接口访问跨域，由于本地调试是本机IP，如果跨域参照跨域配置。

## npm 使用帮助
```
npm init 在此目录生成package.json文件，可以添加-y | --yes 参数则默认所有配置为默认yes

npm install <package> -g 全局安装

npm install --production 安装dependencies，不包含devDependencies

npm install <package> 默认使用–save 参数，如果不想保存到package.json中，可以添加--no-save参数；还可以指定–save-dev 或 -g参数

npm uninstall <package> 卸载依赖包， 默认使用–save参数，即从package.json中移除

npm ls [-g] [--depth=0] 查看当前目录或全局的依赖包，可指定层级为0

npm outdated 查看当前过期依赖，其中current显示当前安装版本，latest显示依赖包的最新版本，wanted显示我们可以升级到可以不破坏当前代码的版本

npm root -g 查看全局安装地址

npm update <package> 升级依赖包版本

npm ll[la] [--depth=0] 查看依赖包信息

npm list <package>查看依赖的当前版本

npm search <string> 查找包含该字符串的依赖包

npm view <package> [field] [--json]列出依赖信息，包括历史版本，可以指定field来查看某个具体信息，比如（versions) 可以添加–json参数输出全部结果

npm home <package> 在浏览器端查看项目（项目主页）

npm repo <package> 浏览器端打开项目地址（GitHub）

npm docs <packge> 查看项目文档

npm bugs <packge> 查看项目bug

npm prune 移除当前不在package.json中但是存在node_modules中的依赖
```
   


