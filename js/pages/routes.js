import LevelForm from './level-form/controller';
import Levels from './levels/controller';

// Routes

export default [
	{
		breadcrumb: [{title: 'سطوح'}],
		component: Levels,
		exact: true,
		isMain: true,
		path: '/',
	},
	{
		breadcrumb: [{path: '/', title: 'سطوح'}, {title: 'افزودن سطح'}],
		component: LevelForm,
		exact: true,
		isMain: false,
		path: '/level/form/add',
	},
	{
		breadcrumb: [{path: '/', title: 'سطوح'}, {title: 'ویرایش سطح'}],
		component: LevelForm,
		exact: true,
		isMain: false,
		path: '/level/form/:levelId',
	},
];
