'use strict';

const fs = require('fs');
const walk = require('walk');

class FileMapper {

	constructor(options) {
		this.options = options;
	}

	_getRootPathTo(fileOrDir) {
		return `${process.env.PWD}/${fileOrDir}`;
	}

	_mapSingleFile(mapFile, filePath) {
		let result = fs.readFileSync(this._getRootPathTo(filePath), 'utf8');
		Object.keys(mapFile).forEach(key => {
			result = result.replace(key, mapFile[key].newFileName);
		});
		fs.writeFileSync(this._getRootPathTo(filePath), result);
	}

	_mapDir(mapFile) {
		const walkerOptions = {
			followLinks: false,
			listeners: {
				file: (root, fileStats, next) => {
					this._mapSingleFile(mapFile, `${this.options.dirPath}/${fileStats.name}`);
					next();
				},
			},
		};
		walk.walkSync(this.options.dirPath, walkerOptions);
	}

	_mapFiles() {
		// eslint-disable-next-line
		const mapFile = require(this._getRootPathTo(this.options.mapPath));
		if (!this.options.dirPath) {
			this._mapSingleFile(mapFile, this.options.filePath);
		} else {
			this._mapDir(mapFile);
		}
	}

	_onDone(compiler) {
		compiler.plugin('done', () => {
			this._mapFiles();
		});
	}

	apply(compiler) {
		this._onDone(compiler);
	}
}

module.exports = FileMapper;
