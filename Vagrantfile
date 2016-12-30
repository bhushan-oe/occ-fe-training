# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.require_version ">= 1.8.5"
VAGRANTFILE_API_VERSION = "2"

CUSTOMER = "trainning"
MIDDLEWARE_IP = "192.168.33.11"
STOREFRONT_IP = "192.168.33.12"

if ENV['OCC_TOOLS_HOME'].nil?
  OCC_TOOLS_HOME = "../occ-tools"
else
  OCC_TOOLS_HOME = ENV['OCC_TOOLS_HOME']
end

MIDDLEWARE_MEMORY = "512"
STOREFRONT_MEMORY = "1024"

ENV['LC_ALL'] = "en_US.UTF-8" # Overrides default locale

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # vm for middleware development
  config.vm.define :middleware do |middlewareConfig|
    middlewareConfig.vm.box = "ubuntu/trusty64"
    middlewareConfig.vm.network "private_network", ip: MIDDLEWARE_IP
    middlewareConfig.vm.hostname = "#{CUSTOMER}-middleware"
    middlewareConfig.ssh.forward_agent = true
    middlewareConfig.vm.synced_folder "./middleware", "/vagrant", type: "nfs"
    middlewareConfig.vm.provider "virtualbox" do |vb|
      vb.name = "#{CUSTOMER}-middleware"
      vb.customize ["modifyvm", :id, "--memory", MIDDLEWARE_MEMORY]
      vb.linked_clone = true
    end

    # provisioner
    config.vm.provision "shell" do |s|
      s.path = "middleware/scripts/provision.sh"
    end
  end

  # vm for storefront development
  config.vm.define :storefront do |storefrontConfig|
    storefrontConfig.vm.box = "ubuntu/trusty64"
    storefrontConfig.vm.network "private_network", ip: STOREFRONT_IP
    storefrontConfig.vm.hostname = "#{CUSTOMER}-storefront"
    storefrontConfig.ssh.forward_agent = true
    storefrontConfig.vm.synced_folder "./storefront", "/vagrant", type: "nfs"
    storefrontConfig.vm.synced_folder OCC_TOOLS_HOME, "/vagrant/occ-tools", type: "nfs"
    storefrontConfig.vm.provider "virtualbox" do |vb|
      vb.name = "#{CUSTOMER}-storefront"
      vb.customize ["modifyvm", :id, "--memory", STOREFRONT_MEMORY]
      vb.linked_clone = true
      # Allows creation of symlinks (to nvm work)
      vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant","1"]
    end
    # provisioners
    storefrontConfig.vm.provision "shell" do |s|
      s.path = "./storefront/scripts/provision-root.sh"
      s.env = {
        "CUSTOMER" => "#{CUSTOMER}"
      }
    end
    storefrontConfig.vm.provision "shell" do |s|
      s.path = "./storefront/scripts/provision-user.sh"
      s.privileged = false
    end
  end

end
