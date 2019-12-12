#!/usr/bin/env bash

dirname="day-${1}"

echo "starting ${dirname}"

cp -r day-n ${dirname}
mv "${dirname}/day-n.test.js" "${dirname}/${dirname}.test.js"

ls -l ${dirname}

echo 'done!'