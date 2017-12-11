import React, {Component} from 'react';

//In general he really recommends us start off with a functional component and 
//only when us need like added functionality, we should start to factor it to
//a class.
class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            term:''
        }
    }
    render() {
        return (
            <div className="search-bar">
            <input onChange={event => this.onInputChange(event.target.value)}/>
            </div>
        );
    }
    //define a function that's going to run whenever an event occurs
    //whenever we have a single line of code on an OnChange function we can use
    //ES6 arrow function
    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;