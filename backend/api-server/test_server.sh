#!/bin/bash

./wait-for-it.sh db:5432
diesel setup
cargo test
