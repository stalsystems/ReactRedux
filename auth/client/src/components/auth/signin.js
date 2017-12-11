import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class SignIn extends Component {

    renderField(field) {
        const { meta: {touched, error }} = field;
        const className = "form-group";
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input 
                className = "form-control"
                type = {field.type}
                {...field.input}
                />
            </div>
        );
    }

    componentWillUnmount() {
        this.props.authError('');
    }

    handleFormSubmit(formProps) {
        // console.log(formProps);
        this.props.signinUser(formProps);
    }
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    render() {
        const { handleSubmit } = this.props;
        // const { handleSubmit, fields: { email, password }} = this.props;
        return(
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field 
                    // {...email}
                    label = "Email:"
                    name = "email"
                    type = "email"
                    component = { this.renderField }
                />
                <Field 
                    // {...password}
                    label = "Password:"
                    name = "password"
                    type = "password"
                    component = { this.renderField }
                />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signin'
    // fields: ['email', 'password']
})(
    connect(mapStateToProps, actions)(SignIn)
);