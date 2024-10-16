import React, { forwardRef } from 'react';

const Input = forwardRef(({ name, label, error, ...rest }, ref) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input
                {...rest}
                ref={ref}
                name={name}
                className="form-control"
                id={name}
            />

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>

    );
});

export default Input;
