'use strict'
const fs = require('fs-extra');
const generators = require('yeoman-generator');

module.exports = generators.Base.extend({

	initializing() {
		if(!this._currentDirectoryHasRNApp())
			this.env.error('You need to "react-native init YOUR_PROJECT && cd YOUR_PROJECT first"');
		if(this._currentDirectoryHasScaffolded())
			this.env.error('You already have a scaffolded app in this directory');
		this.config.save();
	},

	writing() {
		try {
			['components/_defaultComponents', 'assets/images', 'services'].forEach(d => fs.ensureDirSync(this.destinationPath(d)));
			['components/_components.js'].forEach(f => fs.ensureFileSync(this.destinationPath(f)));
			['services/services.js'].forEach(f => fs.ensureFileSync(this.destinationPath(f)));
		} catch(e) {
			this.env.error('Something went wrong while creating the files');
		}
	},

	end() {
		this.log('Scaffolded the app successfully');
	},

	_currentDirectoryHasRNApp() {
		try {
			//['android', 'ios', 'index.ios.js', 'index.android.js'].forEach(f => fs.statSync(this.destinationPath(f)));
			return true;
		} catch (e) {
			return false;
		}
	},

	_currentDirectoryHasScaffolded() {
		try {
			['components', 'service', 'assets', 'yo-rc.json'].forEach(f => fs.statSync(this.destinationPath(f)));
			return true;
		} catch (e) {
			return false;
		}
	}

});
