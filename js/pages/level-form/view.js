import {ClayInput} from '@clayui/form';
import {Formik} from 'formik';
import React from 'react';

import ClayFormGroup from '../components/form-group/index';

export default function View({
	formValidation,
	handelForm,
	initialValues,
	isNew,
}) {
	return (
		<div className="campaign-form">
			<h3 className="mb-3 mt-3">
				<span className="lead">{isNew ? 'افزودن' : 'ویرایش'} سطح</span>
			</h3>

			<Formik
				initialValues={initialValues}
				onSubmit={(values) => handelForm(values)}
				validationSchema={formValidation}
			>
				{({errors, handleChange, handleSubmit, touched, values}) => {
					return (
						<form className="row" onSubmit={handleSubmit}>
							<div className="col-md-4 mb-2">
								<ClayFormGroup
									error={touched.title && errors.title}
									id="title"
									label="نام"
								>
									<ClayInput
										name="title"
										onChange={handleChange}
										type="text"
										value={values.title}
									/>
								</ClayFormGroup>
							</div>

							<div className="col-md-2 mb-2">
								<ClayFormGroup
									error={
										touched.minScoreLevel &&
										errors.minScoreLevel
									}
									id="minScoreLevel"
									label="حداقل امتیاز"
								>
									<ClayInput
										name="minScoreLevel"
										onChange={handleChange}
										type="text"
										value={values.minScoreLevel}
									/>
								</ClayFormGroup>
							</div>

							<div className="col-md-2 mb-2">
								<ClayFormGroup
									error={
										touched.maxScoreLevel &&
										errors.maxScoreLevel
									}
									id="maxScoreLevel"
									label="حداکثر امتیاز"
								>
									<ClayInput
										name="maxScoreLevel"
										onChange={handleChange}
										type="text"
										value={values.maxScoreLevel}
									/>
								</ClayFormGroup>
							</div>

							<div className="col-md-2 mb-2">
								<ClayFormGroup
									error={
										touched.minCommission &&
										errors.minCommission
									}
									id="minCommission"
									label="حداقل کارمزد"
								>
									<ClayInput
										name="minCommission"
										onChange={handleChange}
										type="text"
										value={values.minCommission}
									/>
								</ClayFormGroup>
							</div>

							<div className="col-md-2 mb-2">
								<ClayFormGroup
									error={
										touched.maxCommission &&
										errors.maxCommission
									}
									id="maxCommission"
									label="حداکثر کارمزد"
								>
									<ClayInput
										name="maxCommission"
										onChange={handleChange}
										type="text"
										value={values.maxCommission}
									/>
								</ClayFormGroup>
							</div>

							<div className="col-md-2 mb-2">
								<ClayFormGroup
									error={
										touched.percentDiscount &&
										errors.percentDiscount
									}
									id="percentDiscount"
									label="مقدار تخفیف"
								>
									<ClayInput
										name="percentDiscount"
										onChange={handleChange}
										type="text"
										value={values.percentDiscount}
									/>
								</ClayFormGroup>
							</div>

							<div className="col-md-2 mb-2">
								<ClayFormGroup
									error={touched.order && errors.order}
									id="order"
									label="ترتیب"
								>
									<ClayInput
										name="order"
										onChange={handleChange}
										type="text"
										value={values.order}
									/>
								</ClayFormGroup>
							</div>

							<div className="col-md-8 mb-2">
								<ClayFormGroup
									error={
										touched.description &&
										errors.description
									}
									id="description"
									label="توضیحات"
								>
									<ClayInput
										name="description"
										onChange={handleChange}
										type="text"
										value={values.description}
									/>
								</ClayFormGroup>
							</div>

							<div className="col-sm-12">
								<input
									className="btn btn-primary"
									type="submit"
									value="ذخیره"
								/>
							</div>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}
