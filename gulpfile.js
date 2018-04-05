const gulp = require('gulp');
const zip = require('gulp-zip');
var fs = require('fs');
const del = require('del')

gulp.task('clean:build', function () {
    return del([
        './dist'
    ])
})

gulp.task('clean:war', function () {
    return del([
        './dist/*', '!./dist/webapp'
    ])
})

gulp.task('clean:dist', function () {
    return del([
        './dist/css/**/*',
        '!./dist/css/bundle.css',
        './dist/scripts/**/*',
        '!./dist/scripts/bundle.js',
        '!./dist/scripts/json2.js',
        '!./dist/scripts/rest-ie.js',
        '!./dist/scripts/upgrades',
        '!./dist/scripts/upgrades/**/*'
    ])
});


gulp.task('build:artifactory:zip', function () {
    try {
        var appData = JSON.parse(fs.readFileSync('./app.json'));
        if (appData) {
            var version = appData.version;
            return gulp.src(['dist/**/*'])
                .pipe(zip( 'counter-' + version + '.zip'))
                .pipe(gulp.dest('dist/'));
        }
    } catch (ex) {
        console.log("There was an exception when trying to read the package.json! - " + ex);
        return false;
    }
});


gulp.task('build:artifactory:clean', function () {
    return del([
        './dist/**/*',
        '!./dist/*.zip'
    ])
});


gulp.task('util:war', function () {
    return gulp.src(['dist/**', '!dist/lang'])
        .pipe(zip('workstationterminal.war'))
        .pipe(gulp.dest('dist/webapp/'))
});


/**
 * Create developement war
 */
gulp.task('build:dev:war', gulpsync.sync(
    [
        'clean:build',
        'compile:nunjucks',
        'compile:scss',
        'move:js',
        'move:assets',
        'move:images',
        'move:icons',
        'cache:killer',
        'move:config',
        'util:war',
        'clean:war',
        'move:lang',
        'clean:build:utts'
    ]), function () {
        return console.log(`build:dev:war TASK COMPLETE!!`);
    })


/**
* Create Production war
*/
gulp.task('build:prod:war', gulpsync.sync(
    [
        'clean:build',
        'compile:scss',
        'move:js',
        'compile:nunjucks',
        'index:concat:uglify',
        'index:minify',
        'clean:dist',
        'move:assets',
        'move:images',
        'move:icons',
        'cache:killer',
        'move:inf',
        'move:config',
        'util:war',
        'clean:war',
        'move:lang',
        'clean:build:utts'
    ]), function () {
        return console.log(`build:prod:war TASK COMPLETE!!`);
    })

/**
* Artifactory build
*/
gulp.task('build:artifactory', gulpsync.sync(
    [
        'clean:build',
        'compile:scss',
        'move:js',
        'compile:nunjucks',
        'index:concat:uglify',
        'index:minify',
        'clean:dist',
        'move:assets',
        'move:images',
        'move:icons',
        'cache:killer',
        'move:inf',
        'move:config',
        'util:war',
        'clean:war',
        'move:lang',
        'clean:build:utts',
        'move:release-notes',
        'build:artifactory:zip',
        'build:artifactory:clean'
    ]), function () {
        return console.log(`build:artifactory TASK COMPLETE!!`);
    })