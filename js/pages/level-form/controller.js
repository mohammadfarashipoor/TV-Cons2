import ClayLoadingIndicator from '@clayui/loading-indicator';
import {MODAL, TOAST, useActions} from '@sainui/context';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';

import './util/yup-method';
import {
	LEVEL_GET_SINGLE_URL,
	LEVEL_POST_URL,
	LEVEL_PUT_URL,
} from '../../constants/urls';
import View from './view';

// form validation

const formValidation = Yup.object().shape({
	description: Yup.string().min(2).max(550),
	maxCommission: Yup.number()
		.required()
		.checkMoreThanMinCommission('باید بیشتر از حداقل باشد'),

	// checkMoreThanMinCommission imported from "./util/yup-method"

	maxScoreLevel: Yup.number()
		.required()
		.checkMoreThanMinScoreLevel('باید بیشتر از حداقل باشد'),

	// checkMoreThanMinScoreLevel imported from "./util/yup-method"

	minCommission: Yup.number().required(),
	minScoreLevel: Yup.number().required(),
	order: Yup.number().required().min(0),
	percentDiscount: Yup.number().required().min(0),
	title: Yup.string().min(2).max(100).required(),
});

export default function Controller({match}) {
	const isNew = match.params.levelId ? false : true;
	const levelId = parseInt(match.params.levelId, 10);
	const action = useActions();
	const history = useHistory();

	const [initialValues, setInitialValues] = useState(
		isNew
			? {
					description: '',
					maxCommission: '',
					maxScoreLevel: '',
					minCommission: '',
					minScoreLevel: '',
					order: '',
					percentDiscount: '',
					title: '',
			  }
			: false
	);

	const handelForm = (form) => {
		var data = {...form};

		// loading true

		action({
			payload: {
				target: 'loading',
			},
			type: MODAL,
		});

		// add or edit level

		axios({
			data,
			method: isNew ? 'POST' : 'PUT',
			url: isNew
				? LEVEL_POST_URL
				: LEVEL_PUT_URL.replace('{levelId}', levelId),
		})
			.then(() => {
				action({
					payload: {visible: false},
					type: MODAL,
				});

				history.goBack();
				action({
					autoClose: 5000,
					hideCloseIcon: true,
					payload: {
						displayType: 'success',
						title: 'عملیات با موفقیت انجام شد',
					},
					type: TOAST,
				});
			})
			.catch(() => {});
	};

	useEffect(() => {
		if (isNew) {
			return;
		}

		axios
			.get(LEVEL_GET_SINGLE_URL.replace('{levelId}', levelId))
			.then((response) => {
				var data = response.data;

				setInitialValues(data);
			})
			.catch(() => {});
	}, [levelId, isNew]);

	return (
		<>
			{!initialValues ? (
				<ClayLoadingIndicator className="my-5" />
			) : (
				<View
					{...{
						formValidation,
						handelForm,
						initialValues,
						isNew,
					}}
				/>
			)}
		</>
	);
}
