var gulp = require("gulp")
var terser = require('gulp-terser')
var sourcemaps = require('gulp-sourcemaps')

let path = {
    src: { src: './src/*.js', dest: './dist/' },
    controllers: { src: './src/controllers/*.js', dest: './dist/controllers/' },
    dao: { src: './src/dao/*.js', dest: './dist/dao/' },
    middleware: { src: './src/middleware/*.js', dest: './dist/middleware/' },
    models: { src: './src/models/*.js', dest: './dist/models/' },
    plugins: { src: './src/plugins/*.js', dest: './dist/plugins/' },
    routes: { src: './src/routes/*.js', dest: './dist/routes/' },
    utils: { src: './src/utils/*.js', dest: './dist/utils/' },
}

gulp.task("uglify:src", function() {
    return gulp.src(path.src.src)
        // .pipe(sourcemaps.init())
        .pipe(terser())
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.src.dest))
})

gulp.task("uglify:controllers", function() {
    return gulp.src(path.controllers.src)
        // .pipe(sourcemaps.init())
        .pipe(terser())
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.controllers.dest))
})

gulp.task("uglify:dao", function() {
    return gulp.src(path.dao.src)
        // .pipe(sourcemaps.init())
        .pipe(terser())
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.dao.dest))
})

gulp.task("uglify:middleware", function() {
    return gulp.src(path.middleware.src)
        // .pipe(sourcemaps.init())
        .pipe(terser())
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.middleware.dest))
})

gulp.task("uglify:models", function() {
    return gulp.src(path.models.src)
        // .pipe(sourcemaps.init())
        .pipe(terser())
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.models.dest))
})

gulp.task("uglify:plugins", function() {
    return gulp.src(path.plugins.src)
        // .pipe(sourcemaps.init())
        .pipe(terser())
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.plugins.dest))
})

gulp.task("uglify:routes", function() {
    return gulp.src(path.routes.src)
        // .pipe(sourcemaps.init())
        .pipe(terser())
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.routes.dest))
})

gulp.task("uglify:utils", function() {
    return gulp.src(path.utils.src)
        // .pipe(sourcemaps.init())
        .pipe(terser())
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.utils.dest))
})

gulp.task('default', gulp.series('uglify:src', 'uglify:controllers', 'uglify:dao', 'uglify:middleware', 'uglify:models', 'uglify:plugins', 'uglify:routes', 'uglify:utils', (done) => done()))
