window.Liferay = {
	Language: {
		get(key) {
			return key;
		},
	},
	ThemeDisplay: {
		getPathContext() {
			return '';
		},
	},
};

var main = require('./main.dev.js');

const params = {
	configuration: {
		portletPreferences: {},
		system: {},
	},
	contextPath: '/',
	portletElementId: 'the-portlet',
	portletNamespace: '_the-portlet_',
};

if (main.default) {
	main = main.default;
}

main(params);
