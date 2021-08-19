#!/bin/bash

# DESCRIPTION: This script will download and install the mock
# environment for AWS CloudSearch.

echo 'This script will spin up the AWS CloudSearch simulation at:'
echo 'http://localhost:15808/'
echo

sleep 2


(test -d devassets || mkdir devassets) && \
  cd devassets && \
  (test -d nozama-cloudsearch || git clone git@github.com:oisinmulvihill/nozama-cloudsearch.git) && \
  cd nozama-cloudsearch && \
  curl -O https://raw.githubusercontent.com/oisinmulvihill/nozama-cloudsearch/master/nozama-cloudsearch.yaml && \
  docker-compose -f nozama-cloudsearch.yaml up && \
  cd ../..

