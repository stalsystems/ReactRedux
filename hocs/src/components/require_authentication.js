import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            if(!this.props.authenticated) {
                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.authenticated) {
                this.context.router.push('/');
            }
        }
        render() {
            // console.log(this.props.authenticated)
            // console.log(this.context);
            // console.log(this.props.resources) => resourcesList
            return <ComposedComponent {...this.props} /> // all props
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.authenticated };
    }
    return connect(mapStateToProps)(Authentication);
}

// <ComposedComponent resources={resourcesList}/>