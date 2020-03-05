
let gulp           	 = require('gulp'),
		sass           	 = require('gulp-sass'),
		nunjucksRender 	 = require('gulp-nunjucks-render');
		plumber        	 = require('gulp-plumber'),
		postcss        	 = require('gulp-postcss'),
		cssnano        	 = require('gulp-cssnano'),
		mqpacker       	 = require('css-mqpacker'),
		autoprefixer   	 = require('autoprefixer'),
		fontmagician     = require('postcss-font-magician'),
		sourcemaps     	 = require('gulp-sourcemaps'),
		svgSprite      	 = require('gulp-svg-sprite'),
		browserSync    	 = require('browser-sync'),
		concat         	 = require('gulp-concat'),
		babel          	 = require('gulp-babel'),
		uglify         	 = require('gulp-uglify'),
		rename         	 = require('gulp-rename'),
		del            	 = require('del'),
		data             = require('gulp-data');

const html = done => {
		const htmlSrc = [
			'./src/html/**/*.html',
			'!src/html/**/_*.html'
		];
		gulp.src(htmlSrc)
		.pipe(plumber())
		.pipe(data(function() {
			return require('./src/data.json')
		}))
		.pipe(nunjucksRender({
			path: './src/html'
		}))
		.pipe(gulp.dest('./build'));
	done();
};

const fonts = done => {
	gulp.src('./src/fonts/**/*')
		.pipe(plumber())
		.pipe(gulp.dest('./build/fonts'));
	done();
};

const files = done => {
	gulp.src('./src/files/**/*')
		.pipe(gulp.dest('./build/files'));
	done();
};

const php = done => {
	gulp.src('./src/php/**/*')
		.pipe(gulp.dest('./build/php'));
	done();
};

const es = done => {
	gulp.src([
		'./src/js/common.js',
		])
		.pipe(babel({
			presets: ['@babel/env']
		}))
	.pipe(rename({suffix: '.babel'}))
	.pipe(gulp.dest('./build/js'));
	done();
};

const commonJs = done => {
	gulp.src('./src/js/common.js')
	.pipe(plumber())
	.pipe(gulp.dest('./build/js'))
	.pipe(browserSync.stream());
	done();
};

const scripts = done => {
	const jsFiles = [
		'./src/scripts/jquery.min.js',
		'./src/scripts/jquery.ui.js',
		'./src/scripts/jquery.fileupload.js'
	];
	gulp.src(jsFiles)
	.pipe(plumber())
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./build/js'))
	.pipe(browserSync.stream());
	done();
};

const styles = done => {
	gulp.src('./src/styles/styles.scss')
	.pipe(plumber())
	.pipe(sass())
	.pipe(postcss([

		autoprefixer(),
		mqpacker({ sort: true	}),
	]))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.stream());
	done();
};

const scss = done => {
	gulp.src('./src/scss/**/*.scss')
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded'}
		))
	.pipe(postcss([
		fontmagician({
			formats: 'woff2 woff',
			display: 'swap',
			variants: {
				'Open Sans': {
					'300': ['woff, woff2'],
					'400': ['woff2']
				}
			}
		}),
		autoprefixer(),
		mqpacker({ sort: true	}),
	]))

	.pipe(sourcemaps.write('/'))
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.stream());
	done();
};

const images = done => {
	const imagesSrc = [
		'./src/img/**/*',
		'!./src/img/**/icon-*.svg'
	];
	gulp.src(imagesSrc)
	.pipe(gulp.dest('./build/img'));
	done();
};

const sprite = done => {
	gulp.src('./src/img/sprite/**/icon-*.svg', )
	.pipe(svgSprite({
		svg: {
			xmlDeclaration: false,
			doctypeDeclaration: false,
		},
		mode: {
			stack: {
					dest: './',
					sprite: 'sprite.svg'
			}
		}
	}
	))
	.pipe(gulp.dest('./src/img/sprite'));
	done();
};

const watching = () => {
	browserSync.init({
		server: {
				baseDir: "./build"
		},
		notify: false,
		open: false
	});

	gulp.watch('./src/fonts/**/*', fonts);
	gulp.watch('./src/styles/**/*.{css,scss}', styles);
	gulp.watch('./src/scss/**/*.scss', scss);
	gulp.watch('./src/scripts/**/*.js', scripts);
	gulp.watch('./src/js/common.js', commonJs);
	gulp.watch('./src/img/sprite/**/icon-*.svg', sprite);
	gulp.watch('./src/img/**/*', images).on('change', browserSync.reload);
	gulp.watch('./src/html/**/*.html', html).on('change', browserSync.reload);
};

const clean = done => {
	del('build');
	done();
};


gulp.task('html', html);

gulp.task('fonts', fonts);

gulp.task('files', files);
gulp.task('php', php);

gulp.task('styles', styles);
gulp.task('scss', scss);

gulp.task('babel', es);
gulp.task('scripts', scripts);
gulp.task('common-js', commonJs);

gulp.task('images', images);
gulp.task('sprite', sprite);

gulp.task('watch', watching);
gulp.task('clean', clean);


gulp.task('build', gulp.series(clean, gulp.parallel(html, files, php, fonts, es, images, scripts, commonJs, styles, scss, sprite)));
gulp.task('default', gulp.series(gulp.parallel(html, fonts, php, es, images, scripts, commonJs, styles, scss, sprite), watching));
