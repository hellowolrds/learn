(function () {
	require.config({
		baseUrl: '/public',
		paths: {
			common: 'js/common',
			index: 'js/index/index',
			setting: 'js/index/setting',
			teacherList: 'js/teacher/list',
			courseAdd: 'js/course/course_add',
			jquery: 'assets/jquery/jquery.min',
			bootstrap: 'assets/bootstrap/js/bootstrap.min',
			validate: 'assets/jquery-validate/jquery.validate.min',
			valZH: 'assets/jquery-validate/jquery.zh',
			cookie: 'assets/jquery-cookie/jquery.cookie',
			echarts: 'assets/echarts/echarts.min',
			nprogress: 'assets/nprogress/nprogress',
			template: 'assets/artTemplate/template-web',
			datepicker: 'assets/bootstrap-datepicker/js/bootstrap-datepicker.min',
			dateLanguage: 'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
			layer: 'assets/layer/layer',
			form: 'assets/jquery-form/jquery.form',
			region: 'assets/jquery-region/jquery.region',
			uploadify: 'assets/uploadify/jquery.uploadify.min',
			ckeditor: 'assets/ckeditor/ckeditor',
			val: 'assets/validate/jquery-validate.min'
		},
		//模块之间的依赖配置
		shim: {
			bootstrap: {
				deps: ['jquery']
			},
			datepicker: {
				deps: ['jquery', 'bootstrap']
			},
			dateLanguage: {
				deps: ['datepicker']
			},
			valZH: {
				deps: ['validate']
			},
			region: {
				deps: ['jquery']
			},
			uploadify: {
				deps: ['jquery']
			},
			ckeditor: {
				exports: 'CKEDITOR'
			},
			val: {
				deps: ['jquery']
			}
		}
	});
})();