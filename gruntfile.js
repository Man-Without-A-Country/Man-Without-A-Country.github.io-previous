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
		copy: {
			build: {
				cwd: 'source',
				src: ['**', '!**/*.styl', '!**/*.coffee'],
				dest: 'build',
				expand: true
			}
		},
		clean: {
			build:{
				src: ['build']
			},
			stylesheets : {
				src: ['build/**/*.css', '!build/application.css']
			},
			scripts : {
				src: ['build/**/*.js', '!build/application.js']
			},
		},
		stylus: {
			build: {
				options: {
					linenos: true,
					compress: false
				},
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
		coffee: {
			build: {
				expand: true,
				cwd: 'source',
				src: [ '**/*.coffee' ],
				dest: 'build',
				ext: '.js'
			}
		},
		uglify: {
			build: {
				options: {
					mangle: false
				},
				files: {
					'build/application.js': ['build/**/*.js']
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
			stylesheets: {
				files: 'source/**/*.styl',
				tasks: ['stylesheets']
			},
			scripts: {
				files: 'source/**/*.coffee',
				tasks: ['scripts']
			},
			copy: {
				files: ['source/**', '!source/**/*.styl', '!source/**/*.coffee'],
				tasks: ['copy']
			},
		},
		connect: {
			server: {
				options: {
					port: 4000,
					base: 'build',
					hostname: 'localhost'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	//Copies files from source directory to build
	grunt.loadNpmTasks('grunt-contrib-copy');
	//wipes build directory clean
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	//adds vendor previxes to CSS3 properties AFTER stylus files compliled to CSS.
	grunt.loadNpmTasks('grunt-autoprefixer');
	//Minifies CSS files and combines them into a single file
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	//Minifies Javascript files and combines into 1 file
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//Watches source code for changes and auto builds them
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-jekyll');
	//Watches the project for chanes, automatically builds them and runs a server
	grunt.registerTask('default', ['build', 'connect', 'watch']);
	//Compiles the stylesheets
	grunt.registerTask('stylesheets', [ 'stylus', 'autoprefixer', 'cssmin', 'clean:stylesheets' ]);
	//Compiles the Javascript files.
	grunt.registerTask('scripts', ['coffee', 'uglify', 'clean:scripts']);
	//Compiles all of the assets and copies the files to the build directory.
	grunt.registerTask('build', ['clean:build', 'copy','stylesheets', 'scripts']);
};
