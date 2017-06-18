(function () {
	require.config({
		baseUrl: '/public',
		paths: {
			common: 'js/common',
			index: 'js/index/index',
			setting: 'js/index/setting',
			teacherList: 'js/teacher/list',
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
			form: 'assets/jquery-form/jquery.form'
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
			}
		}
	});
})();