#!/usr/bin/env bash

cd $PROJECT_HOME
MW_BUILD_EXP="target/middleware-*.jar"

echo "Checking if the project was built..."

if ! ls ${MW_BUILD_EXP}; then
  echo "Please, compile the project with \"build\" command first."
else
  MW_BUILD_FILE=`ls ${MW_BUILD_EXP}`
  echo "Found file \"${MW_BUILD_FILE}\"! Proceeding with run command..."


  CYBERSOUCE_CONFIG="-Daxis.ClientConfigFile=/vagrant/scripts/resources/cybersource.wsdd"
  DEBUG_CONFIG="-Xdebug -agentlib:jdwp=transport=dt_socket,address=9999,server=y,suspend=n"
  java ${CYBERSOUCE_CONFIG} ${DEBUG_CONFIG} -jar ${MW_BUILD_FILE} server config/config.yml
fi