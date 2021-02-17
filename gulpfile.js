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

// Copy properties files ******************************************

function createProperties() {
  return gulp.src('./src/assets/i18n/*')
    .pipe(gulp.dest('./dist/properties/'));
}

exports.createProperties = createProperties;


// Copy release notes ******************
function createReleaseNotes() {
  return gulp.src('release-notes/**')
    .pipe(gulp.dest('dist/release-notes/'));
}

exports.createReleaseNotes = createReleaseNotes;


// Create war *****************************************************
function createWar() {
  return gulp
    .src(['./dist/**/*'])
    .pipe(zip('appointmentbooking-ui.war'))
    .pipe(gulp.dest('./dist/webapp/'));
}

exports.createWar = createWar;


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


// Write to manifest file ***************************************

function writeManifest(done) {
  try {
    var versionInfo = getVersionInfo();
    if (versionInfo) {
      var fileContent = 'Build-Date: ' + new Date().toISOString().substring(0, 10) + '\r\n';
      fileContent += 'Product-Name: Appointment Booking' + '\r\n';
      fileContent += 'Build-Version: ' + versionInfo.version + '\r\n';
      fs.writeFileSync('./src/META-INF/MANIFEST.MF', fileContent);
      done();
      return true;
    }
  } catch (ex) {
    console.log(
      'There was an exception when trying to read the package.json! - ' + ex
    );
    done();
    return false;
  }
}
exports.writeManifest = writeManifest;

// Set app version ***************************************

function setAppVersion(done) {
  try {
    var pageData = fs.readFileSync('./src/app/components/presentational/qm-page-footer/qm-page-footer.component.html');
    var versionInfo = getVersionInfo();
    if (versionInfo && pageData) {
      pageData = pageData.toString().replace('%APP_VERSION%', ' (AB ' + versionInfo.version + ') ');
      fs.writeFileSync('./src/app/components/presentational/qm-page-footer/qm-page-footer.component.html', pageData);
      done();
      return true;
    }
  } catch (ex) {
    console.log(
      'There was an exception when trying to read the property file or package.json - ' + ex
    );
    done();
    return false;
  }
}
exports.setAppVersion = setAppVersion;

function resetAppVersion(done) {
  try {
    var pageData = fs.readFileSync('./src/app/components/presentational/qm-page-footer/qm-page-footer.component.html');
    var versionInfo = getVersionInfo();
    if (versionInfo && pageData) {
      pageData = pageData.toString().replace(' (AB ' + versionInfo.version + ') ' ,'%APP_VERSION%');
      fs.writeFileSync('./src/app/components/presentational/qm-page-footer/qm-page-footer.component.html', pageData);
      done();
      return true;
    }
  } catch (ex) {
    console.log(
      'There was an exception when trying to read the property file or package.json - ' + ex
    );
    done();
    return false;
  }
}
exports.resetAppVersion = resetAppVersion;


function getVersionInfo() {
  var appData = JSON.parse(fs.readFileSync('./package.json'));
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


/**
 * Create Dev/Prod build war ********************************************************
 */

const buildWarProperties = gulp.series(createWar, createProperties, cleanWar, resetAppVersion);
exports.buildWarProperties = buildWarProperties;

/**
 * Build war and deploy war/lang
 */
const deployWarProperties = gulp.series(createProperties, deployWar, deployLang);
exports.deployWarProperties = deployWarProperties;


/**
 * Create Artifactory build
 */

const buildArtifactory = gulp.series(writeManifest, createWar, createProperties, createReleaseNotes, cleanWar, createArtifactory, cleanArtifactory, resetAppVersion);
exports.buildArtifactory = buildArtifactory;

/**
 * Create Artifactory build and deploy
 */

const buildArtifactoryDeploy = gulp.series(buildArtifactory, deployArtifactory);
exports.deployWarProperties = buildArtifactoryDeploy;
