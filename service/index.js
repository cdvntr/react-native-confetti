'use strict'

const fs = require('fs-extra');
const path = require('path');
const changeCase = require('change-case');
const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    prompting() {
        return this.prompt({
            type: 'input',
            name: 'name',
            message: 'What will be the name of your service?',
            validate: this._validateComponentName,
            filter: (name) => changeCase.pascalCase(name)
        }).then(answer => {
            let dirPath = './services';
            fs.ensureDirSync(dirPath);
            let filePath = path.format({dir: dirPath, base: changeCase.camelCase(answer.name) + '.js'});
            this.fs.copyTpl(this.templatePath('service.ejs'), filePath, {
              serviceName: answer.name,
              methodName: changeCase.camelCase(answer.name) + 'Method'
            });
    		});
    },

    _validateComponentName(name) {
  		return name.trim() !== '';
  	}
});
