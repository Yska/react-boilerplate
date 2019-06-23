import gulp from 'gulp'
import sprite from 'gulp-svg-sprite'
import svgo from 'gulp-svgo'
import del from 'del'

const svgConfig = {
  mode: {
    stack: {
      dest: './',
      sprite: 'sprite'
    }
  }
}

async function svg () {
  gulp.src(['public/icons/*.svg'])
    .pipe(svgo({
      plugins: [{
        removeXMLNS: true
        // more here https://www.npmjs.com/package/svgo
      }]
    }))
    .pipe(sprite(svgConfig))
    .pipe(gulp.dest('public/'))
}

gulp.task('svg', svg)
gulp.task('watch', () => {
  gulp.watch('public/icons/*.svg', gulp.parallel('svg'))
})

gulp.task('clean', () => del('public/sprite.svg'))
gulp.task('default', gulp.series('clean', 'svg', 'watch'))
gulp.task('build', gulp.series('clean', 'svg'))
