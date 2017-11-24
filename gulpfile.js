/**
 * Created by out_xu on 16/11/20.
 */
const gulp = require('gulp')
const qiniu = require('gulp-qiniu')
const sftp = require('gulp-sftp')            // sftp 服务 上传 html
const runSequence = require('run-sequence')  // 同步插件
const open = require('open')
const config = {
  qiniu: {
    ak: '2P_aWBg5cNCEEowisfEyxzn2cR-_Q340VFU1JVQe',
    sk: 'MWKZJaji6D23iIzxOEKyQC1atiT5iYirLxy9nBYo',
    bucket: 'nuedc',
    url: 'http://ou77rcnh8.bkt.clouddn.com',
    dir: 'nuedc/'
  }
}
const upPaths = {
  nuedc: {
    root: 'nuedc-fe/',
    static: 'nuedc-fe/static/',
    css: 'nuedc-fe/',
    js: 'nuedc-fe/'
  }
}

const distFile = {
  dist: './dist',
  html: './dist/index.html',
  static: './dist/static/*',
  css: './dist/*.css',
  js: './dist/*.js'
}

const ftpOptionProd = {
  host: 'hrsoft.net',
  port: '22',
  user: 'root',
  pass: 'NEUQer2016',
  remotePath: '/var/www/nuedc_fe/',
  url: 'http://nuedc.acmclub.cn'
}
const ftpOptionPre = {
  host: '123.206.55.207',
  port: '22',
  user: 'ubuntu',
  pass: '9799',
  remotePath: '/usr/share/nginx/html/prenuedc/',
  url: 'http://prenuedc.outxu.cn'
}

// 上传静态文件到七牛
gulp.task('uploadStatic', () => {
  return gulp.src([distFile.static])
    .pipe(qiniu({
      accessKey: config.qiniu.ak,
      secretKey: config.qiniu.sk,
      bucket: config.qiniu.bucket,
      private: false
    }, {
      dir: upPaths.nuedc.static
    }))
})

gulp.task('uploadCss', () => {
  return gulp.src([distFile.css])
    .pipe(qiniu({
      accessKey: config.qiniu.ak,
      secretKey: config.qiniu.sk,
      bucket: config.qiniu.bucket,
      private: false
    }, {
      dir: upPaths.nuedc.css
    }))
})
gulp.task('uploadJs', () => {
  return gulp.src([distFile.js])
    .pipe(qiniu({
      accessKey: config.qiniu.ak,
      secretKey: config.qiniu.sk,
      bucket: config.qiniu.bucket,
      private: false
    }, {
      dir: upPaths.nuedc.js
    }))
})

// 上传html
gulp.task('uploadHtml', () => {
  return gulp.src(distFile.html, {
    buffer: false
  }).pipe(sftp(ftpOptionProd))
})

gulp.task('uploadPre', () => {
  return gulp.src(distFile.html, {
    buffer: false
  }).pipe(sftp(ftpOptionPre))
})

gulp.task('default', (callback) => {
  runSequence(
    ['uploadCss', 'uploadJs', 'uploadStatic', 'uploadHtml'],
    callback
  )
  open(ftpOptionProd.url)
})

gulp.task('pre', (callback) => {
  runSequence(
    ['uploadCss', 'uploadJs', 'uploadStatic', 'uploadPre'],
    callback
  )
  open(ftpOptionPre.url)
})