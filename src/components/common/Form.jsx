import Joi from 'joi-browser';
import React, { Component, createRef } from 'react';
import Input from './Input';

class Form extends Component {
    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    handleChange = ({ target: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    renderButton(label) {
        return <button disabled={this.validate()} type="submit" className="btn btn-primary">
            {label}
        </button>
    }

    renderInput(name, label, type = "text") {
        const { data, errors } = this.state
        return (
            <Input
                type={type}
                name={name}
                label={label}
                value={data[name]}
                onChange={this.handleChange}
                error={errors[name]}
            />
        )
    }

    renderSelect(name, label, options) {
        const { data, errors } = this.state;
        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <select
                    name={name}
                    id={name}
                    value={data[name]}
                    onChange={this.handleChange}
                    className="form-control"
                >
                    <option value="" />
                    {options.map(option => (
                        <option key={option._id} value={option._id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                {errors[name] && <div className="alert alert-danger mt-3">{errors[name]}</div>}
            </div>
        );
    }
}

export default Form;
