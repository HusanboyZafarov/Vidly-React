import React, { forwardRef } from 'react';

const Input = forwardRef(({ name, label, value, onChange, type, error }, ref) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input
                ref={ref}
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                className="form-control"
                id={name}
            />

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>

    );
});

export default Input;
