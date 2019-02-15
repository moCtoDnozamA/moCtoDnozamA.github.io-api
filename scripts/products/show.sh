# @Author: xiaojiezhang
# @Date:   2019-02-15T13:02:11-05:00
# @Last modified by:   xiaojiezhang
# @Last modified time: 2019-02-15T13:11:18-05:00



#!/bin/sh

API="http://localhost:4741"
URL_PATH="/products"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \

echo
