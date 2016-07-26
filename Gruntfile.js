module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //js代码风格检查配置项
        jshint: {
            options: {
                laxcomma: true,  // 允许逗号开头的表达式
                evil: true, //允许使用eval
                expr: true, //允许应该出现赋值或函数调用的地方使用表达式
                loopfunc: true //允许循环内部使用函数
            },
            src: ['src/**/*.js']
        },

        //压缩代码配置项
        uglify: {
            options: {
                //设置banner文字内容
                banner: '/*! <%=pkg.name%> version:<%=pkg.version%> build:<%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %>*/ \n',

                //保持一些名称的变量不变
                mangle: {
                    except: ['require', 'exports', 'module']
                }
            },
            scripts: {
                files: {
                    'build/index.min.js': ['build/index.js']
                }
            }
        },

        //合并代码配置项
        concat: {
            scripts: {
                options: {
                    include: 'all',
                    separator: ';\n'
                },
                files: {
                    'build/index.js': ['src/index.js', 'src/sub.js']
                }
            }
        },

        //检测js文件变化, 自动执行任务
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('build', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('default', ['watch']);
};