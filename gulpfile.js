// Import relevent modules
const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);
const zip = require('gulp-zip');
var fs = require('fs');
const del = require('del');
var sftp = require('gulp-sftp');
var ncmd = require('node-cmd');

require('events').EventEmitter.prototype._maxListeners = 100;

// Remote Deployment Defaults
var remoteDeploymentDefaultPath = 'C:\\qmatic\\orchestra\\system\\custdeploy';
var remoteDeploymentDefaultLangPath =
  'C:\\qmatic\\orchestra\\system\\conf\\lang';
var remoteDeploymentDefaultHost = 'localhost';
var remoteDeploymentPlatform = 'windows';

// Custom Configuration
// ====================

// try {
//   var config = require('./gulp.config.json');

//   // Must be provided via config.gulp.json file
//   var remoteDeployHost = config.remote_deploy.host ?
//     config.remote_deploy.host :
//     remoteDeploymentDefaultHost;
//   var remoteDeployUsername = config.remote_deploy.username;
//   var remoteDeployPassword = config.remote_deploy.password;

//   // Artifactory Deployment (artifactory)
//   var targetArtifactoryIp = config.artifactory.host ?
//     config.artifactory.host :
//     '';
//   var targetArtifactoryPath = config.artifactory.path ?
//     config.artifactory.path :
//     '';
//   var targetArtifactoryPort = config.artifactory.port ?
//     config.artifactory.port :
//     '80';
//   var targetArtifactoryProtocol = config.artifactory.protocol ?
//     config.artifactory.protocol :
//     'http';
//   var targetArtifactoryUsername = config.artifactory.username;
//   var targetArtifactoryPassword = config.artifactory.password;
//   var targetArtifactoryUrl =
//     targetArtifactoryProtocol +
//     '://' +
//     targetArtifactoryIp +
//     ':' +
//     targetArtifactoryPort;
// } catch (ex) {
//   // For those who don't provide an external configuration file, use the following default.
//   // Assuming Orchestra is running on local machine
//   console.log(ex);
// }

// Clean up tasks **********************************

// newly addded
function cleanArtifactory() {
  return del(['./dist/*', '!./dist/*.zip']);
}
exports.cleanArtifactory = cleanArtifactory;

function cleanWar() {
  return del([
    './dist/*',
    '!./dist/properties',
    '!./dist/webapp',
    '!./dist/release-notes'
  ]);
}
exports.cleanWar = cleanWar;
//
// gulp.task('clean:artifactory', function artifactoryClean(done) {
//   return del(['./dist/*', '!./dist/*.zip']);
// });


// gulp.task('clean:war', function clean() {
//   return del([
//     './dist/*',
//     '!./dist/properties',
//     '!./dist/webapp',
//     '!./dist/release-notes'
//   ]);
// });

// Copy properties files ******************************************

// newly added

function createProperties() {
  return gulp.src('./src/assets/i18n/*')
    .pipe(gulp.dest('./dist/properties/'));
}

exports.createProperties = createProperties;
// 

// gulp.task('create:properties', function createProperties() {
//   return gulp.src(['./src/assets/i18n/*']).pipe(gulp.dest('./dist/properties'));
// });




// Copy release notes ******************
function createReleaseNotes() {
  return gulp.src('release-notes/**')
    .pipe(gulp.dest('dist/release-notes/'));
}

exports.createReleaseNotes = createReleaseNotes;

// gulp.task('create:release-notes', function createReleaseNotes() {
//   return gulp.src(['release-notes/**']).pipe(gulp.dest('dist/release-notes/'));
// });

// Create war *****************************************************
function createWar() {
  return gulp
    .src(['./dist/**/*'])
    .pipe(zip('appointmentbooking-ui.war'))
    .pipe(gulp.dest('./dist/webapp/'));
}

exports.createWar = createWar;

// gulp.task('create:war', function create() {
//   return gulp
//     .src(['./dist/**/*'])
//     .pipe(zip('appointmentbooking-ui.war'))
//     .pipe(gulp.dest('./dist/webapp/'));
// });

// Create artifcatory zip *************************************************
function createArtifactory() {
  try {
    var appData = getVersionInfo();
    if (appData) {
      var version = appData.version;
      return gulp
        .src(['dist/**/*'])
        .pipe(zip('appointmentbooking-' + version + '.zip'))
        .pipe(gulp.dest('dist/'));
    }
  } catch (ex) {
    console.log(
      'There was an exception when trying to read the package.json! - ' + ex
    );
    return false;
  }
}

exports.createArtifactory = createArtifactory;

// gulp.task('create:artifactory:zip', function createArtifactory() {
//   try {
//     var appData = getVersionInfo();
//     if (appData) {
//       var version = appData.version;
//       return gulp
//         .src(['dist/**/*'])
//         .pipe(zip('appointmentbooking-' + version + '.zip'))
//         .pipe(gulp.dest('dist/'));
//     }
//   } catch (ex) {
//     console.log(
//       'There was an exception when trying to read the package.json! - ' + ex
//     );
//     return false;
//   }
// });


// Write to manifest file ***************************************

function writeManifest() {
  try {
    var versionInfo = getVersionInfo();
    if (versionInfo) {
      var fileContent = 'Build-Date: ' + new Date().toISOString().substring(0, 10) + '\r\n';
      fileContent += 'Product-Name: Appointment Booking' + '\r\n';
      fileContent += 'Build-Version: ' + versionInfo.version + '\r\n';
      fs.writeFileSync('./src/META-INF/MANIFEST.MF', fileContent);
      return true;
    }
  } catch (ex) {
    console.log(
      'There was an exception when trying to read the package.json! - ' + ex
    );
    return false;
  }
}
exports.writeManifest = writeManifest;

// gulp.task('write:manifest', function writeManifest() {
//   try {
//     var versionInfo = getVersionInfo();
//     if (versionInfo) {
//       var fileContent = 'Build-Date: ' + new Date().toISOString().substring(0, 10) + '\r\n';
//       fileContent += 'Product-Name: Appointment Booking' + '\r\n';
//       fileContent += 'Build-Version: ' + versionInfo.version + '\r\n';
//       fs.writeFileSync('./src/META-INF/MANIFEST.MF', fileContent);
//       return true;
//     }
//   } catch (ex) {
//     console.log(
//       'There was an exception when trying to read the package.json! - ' + ex
//     );
//     return false;
//   }
// });

function getVersionInfo() {
  var appData = JSON.parse(fs.readFileSync('./src/app.json'));
  if (appData) {
    return {
      versionPrefix: appData.version,
      version: appData.version + '.' + appData.build,
      build: appData.build
    };
  }
  return null;
}

// Deploy build to orchestra **************************************

function deployWar() {
  return gulp.src('./dist/webapp/appointmentbooking-ui.war').pipe(
    sftp({
      remotePath: remoteDeploymentDefaultPath,
      remotePlatform: remoteDeploymentPlatform,
      host: remoteDeployHost,
      user: remoteDeployUsername,
      pass: remoteDeployPassword,
      timeout: 9999999
    })
  );
}

exports.deployWar = deployWar;


// gulp.task('deploy:war', function deploy() {
//   return gulp.src('./dist/webapp/appointmentbooking-ui.war').pipe(
//     sftp({
//       remotePath: remoteDeploymentDefaultPath,
//       remotePlatform: remoteDeploymentPlatform,
//       host: remoteDeployHost,
//       user: remoteDeployUsername,
//       pass: remoteDeployPassword,
//       timeout: 9999999
//     })
//   );
// });

// Deploy build to artifactory ************

function deployArtifactory() {
  var warName = fs.readdirSync('./dist')[0];
  var fileExtension = warName.substring(warName.lastIndexOf('.') + 1);
  if (fileExtension === 'zip') {
    ncmd.get(
      `curl -u '${targetArtifactoryUsername}:${targetArtifactoryPassword}' -X PUT ${targetArtifactoryUrl}${targetArtifactoryPath}/${warName} -T ./dist/${warName}`,
      function (err, data, stderr) {
        if (!err) {
          console.log(data);
        } else {
          console.log(err);
        }
      }
    );
  } else {
    console.log('War file not found!!');
  }
}

exports.deployArtifactory = deployArtifactory;

// gulp.task('deploy:war:artifactory', function deployWar() {
//   var warName = fs.readdirSync('./dist')[0];
//   var fileExtension = warName.substring(warName.lastIndexOf('.') + 1);
//   if (fileExtension === 'zip') {
//     ncmd.get(
//       `curl -u '${targetArtifactoryUsername}:${targetArtifactoryPassword}' -X PUT ${targetArtifactoryUrl}${targetArtifactoryPath}/${warName} -T ./dist/${warName}`,
//       function (err, data, stderr) {
//         if (!err) {
//           console.log(data);
//         } else {
//           console.log(err);
//         }
//       }
//     );
//   } else {
//     console.log('War file not found!!');
//   }
// });

// Deploy lang file to orchestra


function deployLang() {
  return gulp
    .src('./dist/properties/appointmentBookingMessages.properties')
    .pipe(
      sftp({
        remotePath: remoteDeploymentDefaultLangPath,
        remotePlatform: remoteDeploymentPlatform,
        host: remoteDeployHost,
        user: remoteDeployUsername,
        pass: remoteDeployPassword,
        timeout: 9999999
      })
    );
}

exports.deployLang = deployLang;


// gulp.task('deploy:lang', function deployLang() {
//   return gulp
//     .src('./dist/properties/appointmentBookingMessages.properties')
//     .pipe(
//       sftp({
//         remotePath: remoteDeploymentDefaultLangPath,
//         remotePlatform: remoteDeploymentPlatform,
//         host: remoteDeployHost,
//         user: remoteDeployUsername,
//         pass: remoteDeployPassword,
//         timeout: 9999999
//       })
//     );
// });

/**
 * Create Dev/Prod build war ********************************************************
 */

const buildWarProperties = gulp.series(createWar, createProperties, cleanWar);
exports.buildWarProperties = buildWarProperties;

// gulp.task(
//   'build:war:properties', function buildWar(done) {
//     gulp.series('create:war', 'create:properties', 'clean:war');
//     done();
//   }
// );

/**
 * Build war and deploy war/lang
 */
const deployWarProperties = gulp.series(createProperties, deployWar, deployLang);
exports.deployWarProperties = deployWarProperties;


// gulp.task(
//   'build:war:deploy', function buildWarDeploy() {
//     return gulpsync.sync(['build:war:properties', 'deploy:war', 'deploy:lang'])
//   }
// );

/**
 * Create Artifactory build
 */

const buildArtifactory = gulp.series(writeManifest, createWar, createProperties, createReleaseNotes, cleanWar, createArtifactory, cleanArtifactory);
exports.deployWarProperties = buildArtifactory;


    // gulp.task(
    //   'build:artifactory',
    //   function buildArtifactory() {
    //     return gulpsync.sync([
    //       'write:manifest',
    //       'create:war',
    //       'create:properties',
    //       'create:release-notes',
    //       'clean:war',
    //       'create:artifactory:zip',
    //       'clean:artifactory'
    //     ])
    //   }
    // );

/**
 * Create Artifactory build and deploy
 */

const buildArtifactoryDeploy = gulp.series(buildArtifactory, deployArtifactory);
exports.deployWarProperties = buildArtifactoryDeploy;

// gulp.task(
//   'build:artifactory:deploy',
//   function buildArtifactoryDeploy() {
//     return gulpsync.sync(['build:artifactory', 'deploy:war:artifactory'])
//   }
// );
