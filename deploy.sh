#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm docs:build

# 进入生成的文件夹
cd src/.vuepress/dist

# 如果是发布到自定义域名
#echo 'https://github.com/pixelsssss/pixelsssss.github.io.git' > CNAME

git init
git branch -M main
git add -A
git commit -m 'deploy'

git push -f https://github.com/pixelsssss/pixelsssss.github.io.git main # 推送到github

cd -
rm -rf src/.vuepress/dist