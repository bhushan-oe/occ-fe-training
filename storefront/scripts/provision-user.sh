#!/usr/bin/env bash

# =============================== #
# Storefront provisioner script   #
# =============================== #

check_requirements () {
  echo "============================== CHECK_REQUIREMENTS =============================="
  # Check if script configuration is available
  if [ ! -f /vagrant/scripts/provision.cfg ]; then
    echo "ERROR: custom configuration not defined!" 1>&2
    exit 1
  else
    # Enable custom configuration
    source /vagrant/scripts/provision.cfg
  fi

  # Check if occ-tools is available in project
  if [ ! -f /vagrant/occ-tools/occ-tools.js ]; then
    echo "ERROR: occ-tools is not available in project!" 1>&2
    exit 1
  fi

  # Check if environment config is available
  if [ ! -f /vagrant/scripts/env.cfg ]; then
    echo "ERROR: environment config not defined!" 1>&2
    exit 1
  fi

  echo "All requirements OK."
}

install_nodejs () {
  echo "============================== INSTALL_NODEJS =============================="

  wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh

  NVM_STARTUP="$HOME/.nvm/nvm.sh"

  if  ! grep -qe "^source $NVM_STARTUP" "$HOME/.bashrc"; then
    sed -e '/\\nexport/ s/^#*/#/' -i .bashrc # fix bug in nvm usage of printf command
    echo -e "\nsource $NVM_STARTUP" >> $HOME/.bashrc
  fi

  source $NVM_STARTUP

  nvm install $NODE_VERSION
  nvm alias default $NODE_VERSION
}

add_environment_variables () {
  echo "============================== ADD_ENVIRONMENT_VARIABLES =============================="

  # Using en_US.UTF-8 as default locale
  if  ! grep -qe "^source /vagrant/scripts/env.cfg" "$HOME/.bashrc"; then
    echo "Importing environment configuration file..."
    echo -e "\nsource /vagrant/scripts/env.cfg" >> $HOME/.bashrc
    echo "Environment configuration file succesfully imported."
  else
    echo "Environment configuration file already imported."
  fi

  # Flush changes in file
  source $HOME/.bashrc
}

build_project () {
  echo "============================== BUILD_PROJECT =============================="

  if [ ! -d "/vagrant/occ-tools/node_modules" ]; then
    echo "Installing occ-tools dependencies..."
    cd /vagrant/occ-tools
    rm -rf /vagrant/occ-tools/node_modules
    npm install
    echo "occ-tools dependencies installed."
  else
    echo "occ-tools dependencies already set."
  fi
}

# Run all processes
build () {
  check_requirements
  install_nodejs
  add_environment_variables
  build_project

  echo ">>>>>>>>>> ALL DONE! <<<<<<<<<<"
}

# Run provisioner
build
