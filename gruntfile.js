module.exports = function(grunt){
	//"Wrapper" Function
	//Show elapsed time after tasks
	require('time-grunt')(grunt);
	//Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		shell: {
			jekyllBuild: {
				command: 'jekyll build'
			},
			jekyllServe: {
				command: 'jekyll serve'
			}
		},
		sass:{
			dist:{
				files: {
					'css/style/style.css': 'css/sass/style.scss'
				}
			}
		},
		jshint: {
			files: ['gruntfile.js', 'js/*.js'],
			options: {
				globals: {
					jQuery: true
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
		autoprefixer: {
			build: {
				expand: true,
				cwd: 'build',
				src: [ 'css/**/*.css' ],
				dest: 'build'
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
			jekyll: {
				files: ['_includes/*.html', '_layouts/*.html',
						'_posts/*.markdown', '_posts/*.md',
						'_config.yml', 'index.html'],
				tasks: ['shell:jeckyllBuild', 'shell:jekyllServe'],
				options: {
						interrupt: true,
						atBegin: true
				}
			},
			css: {
				files: 'css/**/*.scss',
				tasks: ['sass']
			},
			stylesheets: {
				files: '**/*.styl',
				tasks: ['stylesheets']
			},
			copy: {
				files: ['source/**', '!source/**/*.styl'],
				tasks: ['copy']
			},
			js: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint']
			},
		},
		connect: {
			server: {
				options: {
					port: 4000,
					base: 'shell',
					hostname: 'localhost'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-sass');
	//Copies files from source directory to build
	grunt.loadNpmTasks('grunt-contrib-copy');
	//adds vendor previxes to CSS3 properties AFTER stylus files compliled to CSS.
	grunt.loadNpmTasks('grunt-autoprefixer');
	//Minifies Javascript files and combines into 1 file
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//Watches source code for changes and auto builds them
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//Register the grunt serve task
	grunt.registerTask('serve', ['serve']);
	//Register the grunt jbuild task
	grunt.registerTask('jbuild', ['shell:jekyllBuild']);
	grunt.registerTask('dev',['sass','jshint']);
	//Watches the project for chanes, automatically builds them and runs a server
	grunt.registerTask('default', ['shell', 'connect', 'watch']);
	//Compiles the stylesheets
	grunt.registerTask('stylesheets', ['autoprefixer']);
	//Compiles the Javascript files.
	grunt.registerTask('scripts', [ 'uglify']);
	//Compiles all of the assets and copies the files to the build directory.
	grunt.registerTask('build', ['copy','stylesheets', 'scripts']);
};
