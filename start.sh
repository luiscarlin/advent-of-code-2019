#!/usr/bin/env bash

num=${1}
dirname="day-${num}"

echo "starting day ${num}"

cp -r day-n ${dirname}
mv "${dirname}/day-n.test.js" "${dirname}/${dirname}.test.js"

echo 'created'
ls -l ${dirname}

echo 'commit'
git add ${dirname}
git commit -m "auto start day ${num}"

echo 'done!'