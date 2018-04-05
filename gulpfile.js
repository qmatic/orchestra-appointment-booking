const gulp = require("gulp");
const gulpsync = require("gulp-sync")(gulp);
const zip = require("gulp-zip");
var fs = require("fs");
const del = require("del");

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

/**
* Dev/Prod build
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
* Artifactory build
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
