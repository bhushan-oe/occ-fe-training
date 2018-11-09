# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.require_version ">= 1.8.5"
VAGRANTFILE_API_VERSION = "2"

CUSTOMER = "OETraining"
MIDDLEWARE_IP = "192.168.33.10"

MIDDLEWARE_MEMORY = "512"

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

end
