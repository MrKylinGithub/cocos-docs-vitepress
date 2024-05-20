
##
[站点预览](https://dogodo-cc.github.io/cocos-creator-docs/zh/)

## 生成侧边栏数据
node ./scripts/create-sidebar.js versions/3.7/en/SUMMARY.md

## 本地启动具体版本
npx vitepress dev versions/3.8

## 本地构建具体版本
npx vitepress build versions/3.8

## 本地预览具体版本
npx vitepress preview versions/3.8

## 发布版本
### 发布单个
node ./scripts/publish.js versions/3.8
### 发布全部
node ./scripts/publish.js versions/all
