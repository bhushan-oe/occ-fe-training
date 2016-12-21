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

network_fix () {
  echo "============================== NETWORK_FIX =============================="
  if  ! grep -qe "^127.0.0.1 $CUSTOMER-storefront" "/etc/hosts"; then
    echo "Fixing hostname in /etc/hosts..."
    sed -i "s/127.0.0.1 localhost/127.0.0.1 \$CUSTOMER-storefront/" /etc/hosts
    echo "Hostname set to '$CUSTOMER-storefront' in /etc/hosts."
  else
    echo "Hostname already set in /etc/hosts."
  fi
}

# Add custom repositories here
add_dependencies () {
  echo "============================== ADD_DEPENDENCIES =============================="
  # ADD YOUR REPOSITORIES, KEYS AND PPAs BELOW

  ###### Dependency: GraphicsMagick ######
  apt-add-repository ppa:dhor/myway -y

  # Update repo catalog and remove unused libs
  apt-get update
  apt-get -y autoremove
}

# Will install basic tools
install_tools () {
  echo "============================== INSTALL_TOOLS =============================="
  apt-get -y install vim curl unzip zlib1g-dev g++ build-essential python-software-properties software-properties-common
}

install_ruby () {
  echo "============================== INSTALL_RUBY =============================="
  apt-get -y install ruby-full
}

install_hologram () {
  echo "============================== INSTALL_HOLOGRAM =============================="
  apt-get -y install apache2 # will run into apache
  rm -rf /var/www/html
  ln -s /vagrant/hologram/docs /var/www/html
  gem install hologram
}

install_fontcustom () {
  echo "============================== INSTALL_FONTCUSTOM =============================="
  apt-get -y install fontforge
  wget http://people.mozilla.com/~jkew/woff/woff-code-latest.zip
  unzip woff-code-latest.zip -d sfnt2woff && cd sfnt2woff && make && mv sfnt2woff /usr/local/bin/
  gem install fontcustom
  rm /home/ubuntu/woff-code-latest.zip
  rm -rf /home/ubuntu/sfnt2woff
}

install_graphicsmagick () {
  echo "============================== INSTALL_GRAPHICSMAGICK =============================="
  # Dependency for sprite generation (occ-tools)
  apt-get -y install graphicsmagick
}

# Run all processes
build () {
  check_requirements
  network_fix
  add_dependencies
  install_tools
  install_ruby
  install_hologram
  install_fontcustom
  install_graphicsmagick
}

# Run provisioner
build
