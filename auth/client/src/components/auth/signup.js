import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signup extends Component {
    renderField({ input, label, type, meta: {touched, error, warning}}) {
        const className = "form-group";
        return (
            <div className={className}>
                <label>{label}:</label>
                <input 
                className = "form-control"
                placeholder={label}
                type = {type}
                {...input} />
                {touched &&
                    ((error && <span className="error">{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        );
    }
    componentWillUnmount() {
        this.props.authError('');
    }
    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
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
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                    label="Email"
                    name="email"
                    type="email" 
                    component = {this.renderField}
                    />
                <Field
                    label="Password"
                    name="password"
                    type="password" 
                    component = {this.renderField}
                    />
                <Field
                    label="Confirm Password"
                    name="passwordConfirm"
                    type="password" 
                    component = {this.renderField}
                    />
                    {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign Up!</button>
            </form>
        );
    }
}
function validate(formProps) {
    const errors = {};

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a confirmation password'
    } else if (formProps.password !== formProps.passwordConfirm) {
        errors.passwordConfirm = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}
export default reduxForm({
    form: 'signup',
    // fields: ['email', 'password', 'passwordConfirm'],
    validate
})(
    connect(mapStateToProps, actions)(Signup)
);