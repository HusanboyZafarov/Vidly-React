import React from 'react';
import Form from '../common/Form';
import Input from '../common/Input';
import Joi from 'joi-browser';

class LoginForm extends Form {
    state = {
        data: {
            username: "",
            password: ""
        },
        errors: {}
    };

    schema = {
        username: Joi.string().required().label("Username*"),
        password: Joi.string().required().label("Password*")
    };

    doSubmit = () => {
        console.log("Submitted");
    };

    render() {
        const { data, errors } = this.state;
        return (
            <div>
                <h1>Login</h1>
                <form className="container-fluid" onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;
