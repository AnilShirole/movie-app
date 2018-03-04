module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            'lib/angular/angular.min.js',
            'lib/angular/angular-resource.min.js',
            'lib/angular/angular-route.min.js',
            'lib/angular/angular-mocks.js',
            'lib/bootstrap/ui-bootstrap-tpls.min.js',
            'src/**/*.js',
            'spec/**/*.js'
        ],

        exclude: [],

        preprocessors: {},

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: false
    });
};