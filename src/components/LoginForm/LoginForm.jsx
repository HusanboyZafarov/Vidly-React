import React from 'react';
import Joi from 'joi-browser';
import { useNavigate, useLocation } from 'react-router-dom'; // React Router v6 hooklari
import Form from '../common/Form';
import auth from '../../services/authService';

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

    async doSubmit() {
        try {
            const { data } = this.state;
            await auth.login(data.username, data.password);

            const { state } = this.props.location;
            const navigate = this.props.navigate;
            navigate(state?.from?.pathname || "/");
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() {
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

function withNavigate(Component) {
    return function WrapperComponent(props) {
        const navigate = useNavigate();
        const location = useLocation();
        return <Component {...props} navigate={navigate} location={location} />;
    };
}

export default withNavigate(LoginForm);
