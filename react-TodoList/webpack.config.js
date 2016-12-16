'use strict';
module.exports = {
	entry: [
		'./src/entry.js'
	],
	output: {
		path: './dist/',
		filname: 'bundle.js'
	},
	externals: {
		'react': 'React'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'jsx!babel', include: /src/ },
			{ test: /.ss$/, loader: 'style!css' },
			{ test: /.scss$/, loader: 'style!css!sass' },
			{ test: /.(png|jpg)$/, loader: 'url?limit=8129' }
		]
	}
};