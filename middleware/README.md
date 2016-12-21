# ${PROJECT} Middleware

OCC Middleware is a process runner, allowing to create, configure and 
run process of many types (manual, scheduled, webhook listener, and 
function webhooks). Also it is capable to provide REST apis to be 
consumed by other clients or even Oracle Commerce Cloud frontend.

## Technologies:
* Java 1.8;
* Dropwizard 1.0.0;
* Quartz;
* Maven 3;
* Mysql;
* Front-end:
    *  RequireJs;
    *  Knockout;
    *  Bootstrap.

## Local configurations
To your machine recognize our maven dependencies, run the following 
commands, replacing ARTIFACTORY_USER and ARTIFACTORY_PASS with your 
artifactory credentials:
```bash
touch ~/.m2/settings.xml
echo "
<settings>
  <servers>
    <server>
      <id>internal</id>
      <username>ARTIFACTORY_USER</username>
      <password>ARTIFACTORY_PASS</password>
    </server>
    <server>
      <id>snapshot</id>
      <username>ARTIFACTORY_USER</username>
      <password>ARTIFACTORY_PASS</password>
    </server>
  </servers>
</settings>
" >> ~/.m2/settings.xml

# Virtual Machine (VM)
1. Download and install vagrant (DO NOT USE APT-GET VERSION):

   http://www.vagrantup.com/downloads.html

2. Install virtualbox:
```bash
sudo apt-get install virtualbox
```

3. Install nfs:
```bash
sudo apt-get install nfs-common nfs-kernel-server
```

4. Install vagrant plugin for guest additions:
```bash
vagrant plugin install vagrant-vbguest
```

5. Copy `config/config_sample.yml` to `config/config.yml` and configure 
occ and orderBroker session.

6. Copy `scripts/provision.sample.cfg` to `scripts/provision.cfg`.

7. Replace the values of `ARTIFACTORY_USER` and `ARTIFACTORY_PASS ` 
in `scripts/provision.cfg`.

8. Start vagrant (be sure to run step 5, 6, and 7 before to create the 
virtual machine):
```bash
vagrant up
```

## Commands available in Virtual Machine
* `build`: Executes a `maven clean package` which will build the 
project;
* `deploy`: Executes a `maven deploy` which will build the project and 
after that it will upload the generated jar to Artifactory server;
* `run`: Runs middleware server;
* `migrate`:  Applies changes on database schema.

## Run occ-middleware Application
* `vagrant ssh`: Logs you in virtual machine and give you access to 
its shell;
* `build`: Builds maven project;
* `migrate`:  Applies changes on database schema.
* `run`: Runs middleware server;