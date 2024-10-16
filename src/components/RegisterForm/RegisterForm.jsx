import React from 'react';
import Form from '../common/Form';
import Input from '../common/Input';
import Joi from 'joi-browser';

class RegisterForm extends Form {
    state = {
        data: {
            username: "",
            password: "",
            name: ""
        },
        errors: {}
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
        name: Joi.string().required().label("Name"),
    };

    doSubmit = () => {
        console.log("Submitted");
    };

    render() {
        const { data, errors } = this.state;
        return (
            <div>
                <h1>Register</h1>
                <form className="container-fluid" onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Name")}
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
