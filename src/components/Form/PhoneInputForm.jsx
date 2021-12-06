import React from 'react';
import classnames from 'classnames';
import PhoneInput from 'react-phone-input-2';

const PhoneInputForm = ({ touched, errors, isError, errorMessage, label, ...props }) => {
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<PhoneInput
				{...props}
				enableSearch={true}
				enableTerritories={true}
				inputClass={classnames('form-control', {
					'is-invalid': (touched && errors) || (isError && errorMessage)
				})}
			/>
			{touched && errors && <div className="invalid-feedback d-block">{errors}</div>}
			{isError && errorMessage && <div className="invalid-feedback d-block">{errorMessage}</div>}
		</>
	);
};

export default PhoneInputForm;
