import ClayAlert from '@clayui/alert';
import React from 'react';

export default function View({title}) {
	return (
		<ClayAlert displayType="info" title="">
			{title}
		</ClayAlert>
	);
}
