angular.module('input.converter', [])
.directive('input', ['$filter', function($filter) {
	return {
		restrict: 'AE',
		require: '?ngModel',
		compile: function(element, attrs){
			return {
				post: function(scope, element, attrs, ngModel){
					if( !ngModel ) { return; }

					switch( attrs.type ) {
						case "date" :
							ngModel.$formatters.push(function(value) {
								return value ? new Date(value) : new Date();
							});
							ngModel.$parsers.push(function(value) {
								return angular.isDate(value) ? $filter('date')(value, 'yyyy-MM-dd') : null;
							});
							break;
						case "time" :
							ngModel.$formatters.push(function(value) {
								return value ? new Date('1970/01/01 ' + value) : new Date();
							});
							ngModel.$parsers.push(function(value) {
								return angular.isDate(value) ? $filter('date')(value, 'HH:mm:ss') : null;
							});
							break;
						case "datetime-local" :
							ngModel.$formatters.push(function(value) {
								return value ? new Date(value.replace(/-/g, '/')) : new Date();
							});
							ngModel.$parsers.push(function(value) {
								return angular.isDate(value) ? $filter('date')(value, 'yyyy-MM-dd HH:mm:ss') : null;
							});
							break;
						case "number":
							ngModel.$formatters.push(function(value) {
								return isNaN(value) ? 0 : parseInt(value);
							});
							break;
					}
				}
			};
		}
	};
}]);