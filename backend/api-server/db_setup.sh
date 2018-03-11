#!/bin/bash -x

cd migrations
diesel setup --database-url $(sed -n 's/DATABASE_URL=//p' ../.env)
