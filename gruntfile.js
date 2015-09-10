module.exports = function(grunt){
	//"Wrapper" Function

	//Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass:{
			dist:{
				files: {
					'style/style.css': 'sass/style.scss'
				}
			}
		},
		watch: {
			css:{
				files: '**/*.scss',
				tasks: ['sass']
			}
		},
		copy: {
			build: {
				cwd: 'source',
				src: ['**', '!**/*.styl'],
				dest: 'build',
				expand: true

			}
		},
		clean: {
			build:{
				src: ['build']
			}
		},
		stylus: {
			build: {
				options: {
					linenos: true,
					compress: false
				};
			files: [{
				expand: true,
				cwd: 'source',
				src: [ '**/*.styl' ],
				dest: 'build',
				ext: '.css'
			}]
			}
		},
		autoprefixer: {
			build: {
				expand: true,
				cwd: 'build',
				src: [ '**/*.css' ],
				dest: 'build'
			}
		},
		cssmin: {
			build: {
				files: {
					'build/application.css': [ 'build/**/*.css']
				}
			}
		},
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//Copies files from source directory to build
	grunt.loadNpmTasks('grunt-contrib-copy');
	//wipes build directory clean
	grunt.loadNpmTasks('grunt-contrib-clean');
	//adds vendor previxes to CSS3 properties AFTER stylus files compliled to CSS.
	grunt.loadNpmTasks('grunt-autoprefixer');
	//Minifies CSS files and combines them into a single file
	grunt.loadNpmTasks('grunt-contrib-cssmin')
	grunt.registerTask('default',['watch']);
	//Compiles the stylesheets
	grunt.registerTask('stylesheets', [ 'stylus', 'autoprefixer', 'cssmin' ]);
	//Compiles all of the assets and copies the files to the build directory.
	grunt.registerTask('build',['clean', 'copy','stylesheets']);
}
