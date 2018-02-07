#!/bin/bash

DEFAULT_FILE="./swagger.json"
SWAGGER_FILE=$DEFAULT_FILE
GENERATE_CMD="swagger-codegen generate -i ${SWAGGER_FILE} -l html2"

if [[ ! -z $1 ]]; then
    SWAGGER_FILE=$1
fi

if [ -f ${SWAGGER_FILE} ]; then
    ($GENERATE_CMD)
    if [ $? -ne 0 ]; then
        echo "To genereate API documentation, install 'swagger-codegen' on Homebrew or follow documentation @ https://swagger.io/docs/swagger-tools/." 
    else
        open index.html
    fi   
else
    echo "File ${SWAGGER_FILE} not found."
fi

