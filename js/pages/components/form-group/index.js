import ClayForm from '@clayui/form';
import React from 'react';

function FormGroup({children, className, error, id, label, style}) {
	return (
		<ClayForm.Group
			className={`${className} ${error && 'has-error'}`}
			style={style}
		>
			{label && <label htmlFor={id}>{label}</label>}

			{children}

			<ClayForm.FeedbackGroup>
				<ClayForm.FeedbackItem>{error}</ClayForm.FeedbackItem>
			</ClayForm.FeedbackGroup>
		</ClayForm.Group>
	);
}

export default React.memo(FormGroup);
