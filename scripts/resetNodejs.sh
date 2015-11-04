#!/bin/bash

if [ "$(whoami)" == "root" ]; then
	echo "Do not run this as root (try again without 'sudo')"
	exit 1
fi

# run from ems root dir   NOT as sudo
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules

# remove our local cache   - gets recreated on `npm install` below
sudo rm -Rf node_modules

# remove all global npm installed packages
sudo npm -g ls | grep -v '^\s' | grep -v 'npm@' | awk '/@/ {print $2}' | awk -F@ '{print $1}' | egrep '\s*[a-zA-Z\-\_]+\s*' | xargs sudo npm -g rm
sudo npm cache clean -f

# this npm package called 'n' let's you easily install and change versions of node.js
sudo npm install -g n

sudo n 4.2.2

# our little friend
sudo npm install -g coffee-script@1.8.0
sudo ln -sf /opt/nodejs/current/lib/node_modules/coffee-script/bin/coffee /usr/bin
sudo ln -sf /opt/nodejs/current/lib/node_modules/coffee-script/bin/cake /usr/bin

# the grunt command line interface
sudo npm install -g grunt-cli@0.1.13
sudo ln -sf /opt/nodejs/current/lib/node_modules/grunt-cli/bin/grunt /usr/bin

# otherwise the dependencies intalled above with sudo will be inaccessible
sudo chown -R $USER $HOME/.npm/*
sudo chown -R $USER $HOME/tmp

# NOT as sudo.  installs modules from ./package.json to local node_modules directory under htdocs_ems.
# The only thing really needed globally is coffeescript and grunt so you can get to coffee
# and cake commands and build distribution files from the console
npm install
