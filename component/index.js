'use strict'

const fs = require('fs-extra');
const path = require('path');
const changeCase = require('change-case');
const generators = require('yeoman-generator');

module.exports = generators.Base.extend({

	initializing() {

	},

	prompting() {
		return this.prompt([{
			type: 'list',
			name: 'type',
			message: 'What kind of component do you want?',
			choices: ['Component', 'Shared Component']
		},
		{
			type: 'list',
			name: 'isMain',
			message: 'Will it be a main component or subcomponent?',
			choices: ['Main Component', 'Subcomponent'],
			default: 1
		},
		{
			type: 'list',
			name: 'path',
			message: 'Where do you want it?',
			choices: (answers) => {
				let destination = this.destinationPath(answers.type === 'Component' ? './components' : './components/_defaultComponents');
				let choices = this._walkSync(destination, ['_defaultComponents']);
				if (answers.isMain !== "Subcomponent" || answers.type !== "Component")
					choices.unshift({name: 'Root', value: destination, short: "Root"});
				return choices;
			}
		},
		{
			type: 'input',
			name: 'name',
			message: 'What will be the name of your component?',
			validate: this._validateComponentName,
			filter: (name) => changeCase.pascalCase(name)
		}
		]).then(answers => {
			let dirPath;
			if (answers.isMain == 'Main Component') {
				dirPath = path.join(answers.path, answers.name); 
			} else {
				dirPath = answers.path;
			}
			fs.ensureDirSync(dirPath);
			let filePath = path.format({ dir: dirPath, base: answers.name + '.js'});
			this.fs.copyTpl(this.templatePath('component.ejs'), filePath,
				{
					componentName: answers.name,
					compNameCamelCase: changeCase.camelCase(answers.name),
					compsRelPath: path.relative(dirPath, this.destinationPath('./components/_components.js')).split(path.sep).join('/')
				});
		});
	},

	_walkSync(dir, filtered, filelist, depth) {
		let files = fs.readdirSync(dir);
		filelist = filelist || [];
		filtered = filtered || [];
		depth = depth || 0;
		depth++;
		files.forEach(file => {
			if (fs.statSync(dir + path.sep + file).isDirectory()) {
				if (filtered && filtered.indexOf(file)) {
					filelist.push({
						name: '   '.repeat(depth-1) + file,
						value: dir + path.sep + file,
						short: file
					});
					filelist = this._walkSync(dir + path.sep + file, filtered, filelist, depth);
				}
			}
		});
		return filelist;
	},

	_validateComponentName(name) {
		return name.trim() !== '';
	}

});