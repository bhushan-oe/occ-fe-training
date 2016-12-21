#!/usr/bin/env bash

cd $PROJECT_HOME
MW_BUILD_EXP="target/middleware-*.jar"

echo "Checking if the project was built..."

if ! ls ${MW_BUILD_EXP}; then
  echo "Please, compile the project with \"build\" command first."
else
  MW_BUILD_FILE=`ls ${MW_BUILD_EXP}`
  echo "Found file \"${MW_BUILD_FILE}\"! Proceeding with migrate command..."

  java -jar ${MW_BUILD_FILE} db migrate config/config.yml
fi