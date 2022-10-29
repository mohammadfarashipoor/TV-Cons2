import * as Yup from 'yup';

Yup.addMethod(
	Yup.number,
	'checkMoreThanMinCommission',
	function (errorMessage) {
		return this.test(`check-more-than-min`, errorMessage, function () {
			const {createError, parent, path} = this;

			if (parent.maxCommission <= parent.minCommission) {
				return createError({
					message: errorMessage,
					path,
				});
			}

			return true;
		});
	}
);

Yup.addMethod(
	Yup.number,
	'checkMoreThanMinScoreLevel',
	function (errorMessage) {
		return this.test(`check-more-than-min`, errorMessage, function () {
			const {createError, parent, path} = this;

			if (parent.maxScoreLevel <= parent.minScoreLevel) {
				return createError({
					message: errorMessage,
					path,
				});
			}

			return true;
		});
	}
);
