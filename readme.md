
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

## 发布
feat(docs:3.8): xxxxx 会将 3.8 的版本更新到测试环境
feat(publish:docs:3.8): xxxxx 会将 3.8 的版本更新到正式环境

提交信息中带有 docs: 会触发 CI 任务， ci 会提取需要发布的版本信息，如果提取不到，则退出任务。

通过判断是否有 publish:docs: 来决定是将 dist 文件夹推到 测试环境还是正式环境