import React, { Component, createRef } from 'react';
import Input from '../common/Input';
import Joi from 'joi-browser';
import { property } from 'lodash';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.username = createRef();
        this.password = createRef();
    }

    schema = {
        username: Joi.string().required(),
        password: Joi.string().required()
    }

    state = {
        account: {
            username: "",
            password: ""
        },
        errors: {
        }
    };

    validate = () => {
        const result = Joi.validate(this.state.account, this.schema, {
            abortEarly: false
        })
        if (!result.error) return null
        const errors = {};

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({
            errors: errors || {}
        })
        if (errors) return;


        if (this.username.current && this.password.current) {
            const username = this.username.current.value;
            const password = this.password.current.value;
            console.log("Submitted", { username, password });
        } else {
            console.error("Refs are null. Ensure that the input elements are rendered correctly.");
        }
    };

    validateProperty = ({ name, value }) => {
        if (name === "username") {
            if (value.trim() === "") return "Username is required!"
        }

        if (name === "password") {
            if (value.trim() === "") return "Password is required!"
        }
    }

    handleChange = ({ target: input }) => {
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name]

        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account, errors });
    };

    render() {
        const { account, errors } = this.state;
        return (
            <div>
                <h1>Login</h1>
                <form className="container-fluid" onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        label="Username"
                        value={account.username}
                        onChange={this.handleChange}
                        ref={this.username}
                        type="text"
                        error={errors.username}
                    />
                    <Input
                        name="password"
                        label="Password"
                        value={account.password}
                        onChange={this.handleChange}
                        ref={this.password}
                        type="password"
                        error={errors.password}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;