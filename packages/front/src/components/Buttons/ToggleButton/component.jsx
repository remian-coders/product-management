import React, { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import classes from './styles.module.css';

export default function ToggleButtonGroupControlled() {
	const [value, setValue] = useState([0, 0]);
	const handleChange = (val) => {
		if (val[0] === 0) {
			setValue([1, 0]);
		} else {
			setValue([0, 2]);
		}
	};
	return (
		<ToggleButtonGroup
			type="checkbox"
			value={value}
			onChange={handleChange}
			className={`${classes.toggleBtn}`}
		>
			<ToggleButton
				id="tbg-btn-1"
				variant="outline-success"
				value={1}
				style={{ boxShadow: 'none' }}
			>
				ON
			</ToggleButton>
			<ToggleButton
				id="tbg-btn-2"
				variant="outline-danger"
				value={2}
				style={{ boxShadow: 'none' }}
			>
				OFF
			</ToggleButton>
		</ToggleButtonGroup>
	);
}
