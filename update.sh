#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 如果是发布到自定义域名
#echo 'https://github.com/pixelsssss/bsp-sdk-site.git' > CNAME

git init
git branch -M main
git add -A
git commit -m 'update'

git push -f https://github.com/pixelsssss/bsp-sdk-site.git main # 推送到github
#git push -f http://10.7.100.21:8000/qinfei/bsp-sdk-site.git main

# 安装 vuepress
#pnpm install vuepress

pnpm docs:deploy