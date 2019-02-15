# @Author: xiaojiezhang
# @Date:   2019-02-15T10:59:52-05:00
# @Last modified by:   xiaojiezhang
# @Last modified time: 2019-02-15T13:02:11-05:00



#!/bin/sh

API="http://localhost:4741"
URL_PATH="/examples"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
