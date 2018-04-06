const gulp = require("gulp");
const gulpsync = require("gulp-sync")(gulp);
const zip = require("gulp-zip");
var fs = require("fs");
const del = require("del");
var sftp = require('gulp-sftp');
var ncmd = require('node-cmd');

require('events').EventEmitter.prototype._maxListeners = 100;

// Remote Deployment Defaults
var remoteDeploymentDefaultPath = "C:\\qmatic\\orchestra\\system\\custdeploy"
var remoteDeploymentDefaultLangPath = "C:\\qmatic\\orchestra\\system\\conf\\lang"
var remoteDeploymentDefaultHost = "localhost"
var remoteDeploymentPlatform = "windows"


// Custom Configuration
// ====================

try {
    var config = require('./gulp.config.json');

    // Must be provided via config.gulp.json file
    var remoteDeployHost = config.remote_deploy.host ? config.remote_deploy.host : remoteDeploymentDefaultHost;
    var remoteDeployUsername = config.remote_deploy.username
    var remoteDeployPassword = config.remote_deploy.password

    // Artifactory Deployment (artifactory)
    var targetArtifactoryIp = config.artifactory.host ? config.artifactory.host : "";
    var targetArtifactoryPath = config.artifactory.path ? config.artifactory.path : "";
    var targetArtifactoryPort = config.artifactory.port ? config.artifactory.port : "80";
    var targetArtifactoryProtocol = config.artifactory.protocol ? config.artifactory.protocol : "http";
    var targetArtifactoryUsername = config.artifactory.username
    var targetArtifactoryPassword = config.artifactory.password
    var targetArtifactoryUrl = targetArtifactoryProtocol + '://' + targetArtifactoryIp + ':' + targetArtifactoryPort;
} catch (ex) {
    // For those who don't provide an external configuration file, use the following default.
    // Assuming Orchestra is running on local machine
    console.log(ex);
}

// Clean up tasks
gulp.task("clean:artifactory", function() {
  return del(["./dist/*", "!./dist/*.zip"]);
});

gulp.task("clean:war", function() {
  return del(["./dist/*", "!./dist/properties", "!./dist/webapp", "!./dist/release-notes"]);
});

// Copy properties files
gulp.task("create:properties", function() {
  return gulp.src(["./src/assets/i18n/*"]).pipe(gulp.dest("./dist/properties"));
});

// Copy release notes
gulp.task("create:release-notes", function() {
  return gulp.src(["release-notes/**"]).pipe(gulp.dest("dist/release-notes/"));
});

// Create war
gulp.task("create:war", function() {
  return gulp
    .src(["./dist/**/*"])
    .pipe(zip("StaffBooking.war"))
    .pipe(gulp.dest("./dist/webapp/"));
});

// Create artifcatory zip
gulp.task("create:artifactory:zip", function() {
  try {
    var appData = JSON.parse(fs.readFileSync("./src/app.json"));
    if (appData) {
      var version = appData.version;
      return gulp
        .src(["dist/**/*"])
        .pipe(zip("StaffBooking-" + version + ".zip"))
        .pipe(gulp.dest("dist/"));
    }
  } catch (ex) {
    console.log(
      "There was an exception when trying to read the package.json! - " + ex
    );
    return false;
  }
});


// Deploy build to orchestra
gulp.task('deploy:war', function () {
    return gulp.src('./dist/webapp/StaffBooking.war')
        .pipe(sftp({
            remotePath: remoteDeploymentDefaultPath,
            remotePlatform: remoteDeploymentPlatform,
            host: remoteDeployHost,
            user: remoteDeployUsername,
            pass: remoteDeployPassword
        }));
});


// Deploy build to artifactory
gulp.task('deploy:war:artifactory', function () {
  var warName = fs.readdirSync('./dist')[0];
  var fileExtension = warName.substring(warName.lastIndexOf(".")+1)
  if(fileExtension === "zip") {
    ncmd.get(`curl -u '${targetArtifactoryUsername}:${targetArtifactoryPassword}' -X PUT ${targetArtifactoryUrl}${targetArtifactoryPath}/${warName} -T ./dist/${warName}`, function(err, data, stderr){
            if (!err) {
               console.log(data)
            } else {
               console.log(err)
            }
        });
  } else {
    console.log("War file not found!!");
  }
});

// Deploy lang file to orchestra
gulp.task('deploy:lang', function () {
    return gulp.src('./dist/properties/staffBookingMessages.properties')
        .pipe(sftp({
            remotePath: remoteDeploymentDefaultLangPath,
            remotePlatform: remoteDeploymentPlatform,
            host: remoteDeployHost,
            user: remoteDeployUsername,
            pass: remoteDeployPassword
        }));
});

/**
* Create Dev/Prod build war
*/
gulp.task(
  "build:war:properties",
  gulpsync.sync([
    "create:war",
    "create:properties",
    "clean:war"
  ])
);

/**
* Build war and deploy war/lang
*/
gulp.task(
  "build:war:deploy",
  gulpsync.sync([
    "build:war:properties",
    "deploy:war",
    "deploy:lang"
  ])
);

/**
* Create Artifactory build
*/
gulp.task(
  "build:artifactory",
  gulpsync.sync([
    "create:war",
    "create:properties",
    "create:release-notes",
    "clean:war",
    "create:artifactory:zip",
    "clean:artifactory"
  ])
);

/**
* Create Artifactory build and deploy
*/
gulp.task(
  "build:artifactory:deploy",
  gulpsync.sync([
    "build:artifactory",
    "deploy:war:artifactory"
  ])
);
