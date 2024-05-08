# cocos creator 用户手册构建系统的重构

## 旧文档的构建系统存在的问题 

### 文档框架已经处于废弃状态

用户手册这个项目大约创建于 2017 年左右，当时选用的是 [gitbook](https://www.npmjs.com/package/gitbook-cli) ，目前该项目已经处于冻结状态，最后一次版本更新已经是 7 年前了(当前时间 2024.05.06)。官方已经将 [GITBOOK](https://www.gitbook.com/) 商业化，变成一个提供在线文档的服务平台。

从 [npm](https://www.npmjs.com/package/gitbook-cli)  的下载量可以看出已经没什么项目在使用了。

当然，项目冻结不维护不是什么大问题（如果它依然稳定运行的话）哪怕我们为了它锁定 node 版本，甚至定制一个开发机器专门运行它也没关系，但是最近文档维护人员说项目启动不了。**(说明它不稳定，是个定时炸弹)**。

<img width="1133" alt="image" src="https://github.com/cocos/3d-tasks/assets/35713518/6c5e57fa-4dad-40e8-89ea-c02f8ef199d9">

错误栈显示是 Gitbook 的依赖的 `npm` 包报错了。

book.json 的配置如下：

```json
{
    "title": "Cocos Creator",
    "plugins": [
        "-lunr",
        "-search",
        "search-title",
        "anchorjs",
        "sharing",
        "splitter",
        "theme-default-customize@git+https://github.com/cocos-creator/gitbook-theme-default.git",
        "github-issue-feedback-language-custom@git+https://github.com/cocos-creator/cocos-gitbook-plugin-github-issue-feedback.git",
        "expandable-chapters-small@git+https://github.com/cocos-creator/cocos-gitbook-plugin-expandable-chapters-small.git"
    ]
}
```

可以看出我们声明了几个官方插件且定制了几个第三方插件，而且定制的几个插件并不是以 npm 包的形式提供，是直接指向了从 github 仓库下载，历史原因大概是当时需要对这几个插件进行定制，但是并没有以 PR 的形式对原来的包进行功能扩充（这可能涉及效率问题，或者功能普适性的问题，不做深究）

导致的结果就是我们无法再使用官方的 npm 包（因为我尝试将 github-issue-feedback-language-custom 这个报错的插件直接指向 官方的[github-issue-feedback](https://www.npmjs.com/package/gitbook-plugin-github-issue-feedback) 能够顺利安装)  

此时局面就很尴尬了，报错是大概率的，我本地只有成功过一次，但是之前文档维护人员已经成功构建过多次了，因为每次更新文档都需要走一遍 gitbook install 的流程。所以情况是：
- [cocos-gitbook-plugin-github-issue-feedback ](https://github.com/cocos-creator/cocos-gitbook-plugin-github-issue-feedback)  代码没有更新过
- 在这次反馈安装报错之前一直都是正常下载安装的，在插件代码没有更新的情况下突然报错
- 我将插件手动下载到 node_modules ，跳过 gitbook install 是可以正常构建的，说明插件的代码逻辑是没问题的

如果将问题归结成网络不稳定，但是无法解释为什么每次都是在 `github-issue-feedback-language-custom` 的下载环节报错，因为同样以 github 仓库地址提供的插件有

- theme-default-customize
- github-issue-feedback-language-custom
- expandable-chapters-small

抱着试一试的心态，我重新 fork 一份 github-issue-feedback-language-custom 将其发布到 [npm](https://www.npmjs.com/package/gitbook-plugin-github-issue-feedback-for-cocos)  测试是否通过 npm 的渠道就可以下载成功，但是报错依旧。

很抓狂，所以解决方案只能是将插件本地化，但是 gitbook 并没有插件本地化的机制，只搜索到一个测试本地插件的[文档](https://tinydew4.gitbooks.io/gitbook/content/docs/plugins/testing.html) ，原理就是将本地插件 link 到 node_module ，然后在 book.json 到 plugins 中列举它。这样就可以在 gitbook build 的时候用到。

所以要以`插件本地化`的方式解决这个问题步骤如下：
- 将 github-issue-feedback-language-custom 这个几个插件从 book.json 移除
- 执行 gitbook install （它依然可以顺利下载官方插件）
- 将 github-issue-feedback-language-custom 通过其他方式插件下载到 node_modules  并命名为 gitbook-plugin-github-issue-feedback-language-custom (加个约定的 gitbook-plugin 前缀)
- 将 github-issue-feedback-language-custom 这个几个插件添加到 book.json
- 执行 gitbook build

方案不够优雅，所以如果不是非要用 gitbook 这套构建方案，还是考虑弃坑吧。

### 多版本管理繁琐

目前文档的多版本是通过 Git 的分支管理的
<img width="929" alt="image" src="https://github.com/cocos/3d-tasks/assets/35713518/9f126563-9367-4a41-b1a6-8a39d0114934">

这就意味着如果我们修复以上的插件安装报错的问题，需要切到这 10 多个分支去依次提交同样的 PR，有点崩溃，而且这种崩溃在每次发布新版本的时候，都要经历一次，因为我们的文档中有个`版本列表`，它列举了所有已经发布的文档版本。具体配置在 en/book.json 和 zh/book.json 中:
```json
{
    "structure": {
        "summary": "SUMMARY.md",
        "readme": "index.md"
    },
    "variables": {
        "docType": "Manual",
        "version": [
            {
                "name": "3.7",
                "links": [
                    {
                        "name": "3.8",
                        "link": "https://docs.cocos.com/creator/3.8/manual/en"
                    },
                    {
                        "name": "3.7",
                        "link": "https://docs.cocos.com/creator/3.7/manual/en"
                    },
                    {
                        "name": "3.6",
                        "link": "https://docs.cocos.com/creator/3.6/manual/en"
                    },
                    {
                        "name": "3.5",
                        "link": "https://docs.cocos.com/creator/3.5/manual/en"
                    },
                    {
                        "name": "3.4",
                        "link": "https://docs.cocos.com/creator/3.4/manual/en"
                    },
                    {
                        "name": "3.3",
                        "link": "https://docs.cocos.com/creator/3.3/manual/en"
                    },
                    {
                        "name": "3.2",
                        "link": "https://docs.cocos.com/creator/3.2/manual/en"
                    },
                    {
                        "name": "3.1",
                        "link": "https://docs.cocos.com/creator/3.1/manual/en"
                    },
                    {
                        "name": "3.0",
                        "link": "https://docs.cocos.com/creator/3.0/manual/en"
                    },
                    {
                        "name": "2.4",
                        "link": "https://docs.cocos.com/creator/2.4/manual/en"
                    },
                    {
                        "name": "2.3",
                        "link": "https://docs.cocos.com/creator/2.3/manual/en"
                    },
                    {
                        "name": "2.2",
                        "link": "https://docs.cocos.com/creator/2.2/manual/en"
                    },
                    {
                        "name": "2.1",
                        "link": "https://docs.cocos.com/creator/2.1/manual/en"
                    },
                    {
                        "name": "2.0",
                        "link": "https://docs.cocos.com/creator/2.0/manual/en"
                    },
                    {
                        "name": "1.10",
                        "link": "https://docs.cocos.com/creator/1.10/manual/en"
                    },
                    {
                        "name": "1.9",
                        "link": "https://docs.cocos.com/creator/1.9/manual/en"
                    }
                ]
            }
        ]
    }
}

```
查看截图右上角的版本下拉列表：
<img width="1436" alt="截屏2024-05-06 16 52 34" src="https://github.com/cocos/3d-tasks/assets/35713518/e6b34870-0f26-48ed-bb02-4be5a24d0ca1">
为了方便用户在阅读文档的时候切换不同的版本。

**假设我们要发布一个新版本 `3.9`  那么就需要切到 3.8 之前的所有分支，依次添加 3.9 的数据，重新构建文档进行发布。这是一件非常费时且无意义的工作。**

### 问题总结

- 文档依赖的 gitbook 已经是一个七年前就废弃的项目，且事实证明它不稳定，是个雷点
- 由于 gitbook 的技术老旧，每次构建起码要 25 分钟左右
- 目前多版本管理的方式是以 git 的分支形式，不利于代码复用，新版本发布繁琐

## 重构方案

打算用 [vitepress](https://vitepress.dev/) 替代 Gitbook，它是一个极简且现代的文档构建框架，同样具备完善的插件体系，而且开箱即用的功能已经可以覆盖我们先有需求。

我们来剖析一下现有的文档具备的功能模块：

<img width="1510" alt="image" src="https://github.com/cocos/3d-tasks/assets/35713518/1d232c3a-97f9-419b-9e86-512966b19aad">

除了 `版本列表`  和 `问题反馈` 不是开箱支持，其他都是 viteprss 默认就提供的，而  `版本列表`  和 `问题反馈`  可以轻松的通过拓展默认主题来实现。
### 自定义主题

```ts

import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import versionList from './versions-list.vue'
import feedback from './feedback.vue'
import { github } from '../config'

export default function(version: string) {
  return {
    extends: DefaultTheme,
    Layout() {
      return h(DefaultTheme.Layout, null, {
        'nav-bar-content-after': () => h(versionList, {
          currentVersion: version
        }),
        'aside-ads-after': () => h(feedback, {
          repo: github
        })
      })
    }
  }
}
```

### 多版本管理

我们直接废弃之前的 git 分支管理多版本，而采用文件夹的方式来隔离多版本。

新的项目结构如下：
<img width="326" alt="image" src="https://github.com/cocos/3d-tasks/assets/35713518/55e9a2c4-7623-4f2a-bd92-3a306e0a35ac">

- versions 文件夹下面管理了所有版本，每个版本对应一个文件夹。
- @config 文件夹维护了 vitepress 的公共配置，比如主题的定制等代码都在这边维护
- ~public 是站点的公共数据，将它提出来不是必须的，但是提出之后，每个版本都用软连接访问它，可以极大的减少项目的体积。比如一张图片 1m，我们有文档发布了 20 个版本，那么它就有 20m，所以我这边将 public 挪到外面当作公共文件夹~

> 最终放弃通过软连接共享 public 的策略，因为在配置 .gitignore 的时候无法把这个软连接忽略，需要在工作流上做一些定制处理，为了项目的稳定性，不增加多余的噪音，还是直接每个版本文件夹里携带一份 public 文件夹吧。否则需要在 postinstall 的钩子生成软连接，然后在 commit 的钩子删除软连接，增加了理解和维护的成本。

每个文件夹代表一个版本，除了文档内容，里面只有一个 config/version.ts 是每个版本自定义的，用于标注版本信息，其他配置都是通过引用外面的 @config 的公共配置。
<img width="649" alt="image" src="https://github.com/cocos/3d-tasks/assets/35713518/610ad7d1-9a25-4732-b513-3769e4d59982">

### 侧边栏导航的数据迁移
重构遇到最大的问题是之前 gitbook 的导航数据是配置在 `SUMMARY.md` 里，格式如下：
```md
# Summary

[Cocos Creator User Manual 3.8](index.md)

## Introduction

- [About Cocos Creator](getting-started/introduction/index.md)
- [Support](getting-started/support.md)

## Understanding the Basics

- [Getting Started](getting-started/index.md)

    - [Install and Launch](getting-started/install/index.md)
    - [Dashboard](getting-started/dashboard/index.md)
    - [Hello World!](getting-started/helloworld/index.md)
    - [Project Structure](getting-started/project-structure/index.md)
- [Editor Interfaces](editor/index.md)
    - [Scene](editor/scene/index.md)
    - [Hierarchy](editor/hierarchy/index.md)
    - [Assets](editor/assets/index.md)
    - [Inspector](editor/inspector/index.md)
    - [Console](editor/console/index.md)
    - [Preferences](editor/preferences/index.md)
    - [Project Settings](editor/project/index.md)
    - [Main Menu](editor/mainMenu/index.md)
    - [Tool Bar](editor/toolbar/index.md)
    - [Editor Layout](editor/editor-layout/index.md)
    - [Preview & Debugging](editor/preview/index.md)
- [Glossary](glossary/index.md)
- [Cocos Creator Quick Guide for Unity Developers](./guide/unity/index.md)
```

但是 vitepress 的导航数据格式是一个 js 数组，格式如下：
```json
[
    {
        "text": "Introduction",
        "collapsed": false,
        "items": [
            {
                "text": "About Cocos Creator",
                "link": "getting-started/introduction/index.md"
            },
            {
                "text": "Support",
                "link": "getting-started/support.md"
            }
        ]
    }
]
```
由于每个版本的菜单配置有 500多行数据，而且我们需要迁移将近 20 多个版本，所以人工手动迁移数据是不现实的，所以需要写个 node 脚本来转换菜单数据。

脚本我已经写好，在迁移的时候只需要执行：
```bash
node ./scripts/create-sidebar.js versions/3.7/en/SUMMARY.md
```
它将会在同级目录生成一个 `summary.json` 的文件，里面是符合 vitepress 的导航数据格式。

### 多版本列表

原来的多版本列表是在构建文档的时候使用静态数据的，导致每次发布新版本，都需要去重新构建，所以这块数据最好是使用动态拉取的，比如我们定一个接口，或者在 oss 维护一份 versions.json  数据，在访问文档的时候动态拉取，这样后期增加新版本就可以及时更新且不用重新构建之前的版本。

## 迁移遇到的问题
迁移中技术实现没有遇到问题，反而是因为之前文档的数据 格式不够规范遇到了一些小问题:


### 1、图片地址不规范，导致 vitepress 解析不到图片数据。

<img width="966" alt="image" src="https://github.com/cocos/3d-tasks/assets/35713518/868fa3a0-d8a9-482e-868b-09ef87be6bbb">

只需要将图片路径修改正确即可：
```html
<a href="./jsb/jsb_process.jpg"><img src="./jsb/jsb_process.jpg" alt=" "></a>
```

`jsb/jsb_process.jpg` 改成 `./jsb/jsb_process.jpg`

这个量非常大，但是好处是控制台会显示具体哪个文件的哪个图片引用地址出错，跟着控制台修改即可。

### 2、标签格式不对导致 构建出错

en/animation/edit-animation-clip.md 
<img width="806" alt="image" src="https://github.com/cocos/3d-tasks/assets/35713518/09755b0a-327a-44ba-9493-f35d68b6783b">

这个问题控制台只会报 tag 错误，不会显示具体的文件，所以需要进入 debug 模式，才能知道报错在哪个文件，然后排查该文件的标签是否都是规范的格式。

### 3、地址格式不对导致 encodeURIComponent 错误

<img width="1495" alt="image" src="https://github.com/cocos/3d-tasks/assets/35713518/97f7f079-a1f8-42e1-94fa-34e8d637fd2a">

`E5%88%87%E6%8D%A2-hdrldr-%E6%A8%A1%E5%BC%8F` 无法被正确 `encodeURIComponent` 直接修改成

```md
若要启用场景 HDR 可以参考：[切换 HDR/LDR 模式](../../concepts/scene/skybox.md#切换 HDR/LDR 模式)。
```

目前只发现 zh/editor/components/camera-component.md 最后一行，所以改问题修复也是比较快速的，在每次迁移某个版本的时候，定位到这个文件，将最后一行修正即可。

### 4、开启本地搜索遇到的问题
<img width="566" alt="image" src="https://github.com/cocos/3d-tasks/assets/35713518/251b0223-7514-4bb6-a731-663b03ed9d2e">

目前只发现 zh/editor/l10n/localization-editor-api.md 的一个标题会导致这个问题
```md
### 导入 [`l10n`](#l10n) 模块
```
改成
```md
### 导入 `l10n` 模块
```
*因为 L10n 的功能是 3.7 引入，所以只有 3.7 和 3.8 的版本会遇到这个问题，简单处理一下即可。*

## 成果

下图是通过 vitepress 重构过的文档系统：
<img width="1520" alt="截屏2024-05-06 17 15 13" src="https://github.com/cocos/3d-tasks/assets/35713518/573e3651-45dc-42a7-af7a-cdf356e7ea15">

我们完整的实现了现有的所有功能，是的，那个 `社交分享` 被我忽略了，因为我觉得这是一个一厢情愿的功能，几乎不会有人会将文档地址分享到自己的社交账号去的，没必要在这边多一个摆设，文档系统就应该是页面简洁且聚焦。（当然，如果领导要求它保留，通样可以通过自定义主题的方式实现）

- [体验仓库](https://github.com/dogodo-cc/cocos-creator-docs)
- [体验地址](https://dogodo-cc.github.io/cocos-creator-docs/zh/)

而且带来的如下优势：

**省略了 gitbook install 的缓慢环节**
**启动速度从之前的 20多分钟，直接提到了 5秒左右**
**多版本在同一个分支维护，可以共用基础代码**
**版本列表以动态数据呈现，发布新版本不用重新构建旧版本**
**美观度也提升不少**

## 旧数据迁移

前面已经介绍完 vitepress 的构建方案以及迁移遇到的问题和解决方案，后续的版本迁移工作将交由文档维护者进行，我重新梳理一下迁移步骤：

**假设迁移2.4版本文档**

1、 在 versions 文件下面新建 2.4 文件夹

2、在旧仓库切到 2.4 分支，将 en 和 zh 文件夹复制到 2.4 文件夹

3、转化导航栏数据
```bash
node ./scripts/create-sidebar.js versions/2.4/en/SUMMARY.md
node ./scripts/create-sidebar.js versions/2.4/zh/SUMMARY.md
```

4、复制一份 .vitepress 文件夹到 2.4，并修改 config/version.ts 里面的代码为 

```ts
export const version = '2.4';
```

5、复制一份 public 到 versions/2.4 文件夹
~5、 执行 `node ./scripts/create-public-link.js` 让 2.4 文件夹下面生成一个 public 的软连接~

*原则上如果数据没有错误，此时已经迁移完成，可以 `npx vitepress dev versions/2.4`  成功运行起来了*

*但是可能都存在图片地址不正确和链接地址格式不对的问题（前面有具体截图和解决方式）*

6、执行 npx vitepress dev versions/2.4 根据控制台提示进行问题修复，原则上你先修复好上面提到的 第 3、4 个问题，在 dev 命令下是可以顺利启动了。

7、执行 npx vitepress build versions/2.4 根据控制台提示修改`图片地址`格式错误和标签等错误，标签错误需要进入 debug 模式，才能快速定位报错的文件。

8、完成迁移之后可以删除一下没用的数据了。（可选）
- en/_layouts (原来gitbook的布局代码)
- en/styles 原来的样式代码
- en/ book.json 
- zh/同上


