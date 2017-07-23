#!/usr/bin/env bash
#
# Generates production code and pushes it up to the site
#

rm -rf ./dist && \
npm run build && \
git checkout gh-pages && \
git pull origin gh-pages && \
cp -r ./dist/ ./ && \
rm -rf ./dist && \
git add . && \
git commit -am "chore(publish): production code generated automatically" && \
git push origin gh-pages