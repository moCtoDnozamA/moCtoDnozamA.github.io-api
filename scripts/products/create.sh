#!/bin/bash

API="http://localhost:4741"
URL_PATH="/products"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "product": {
      "imagePath": "'"${IMG}"'",
      "title": "'"${TITLE}"'",
      "description": "'"${DESC}"'",
      "price": "'"${PRICE}"'"
    }
  }'

echo
