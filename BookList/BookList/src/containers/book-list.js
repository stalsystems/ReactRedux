import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectBook} from '../actions/index'
import {bindActionCreators} from 'redux'
//a container is just a component that has direct access to the state
//that's produced by redux. React and redux are 2 separeted. Only through
//this third library (react-redux) that we can meld
//the two together and get a smart-component that's actually aware of the state that
//is contained within redux

//Because Booklist had to be aware that state, we promoted it to a container
class BookList extends Component {
    renderList() {
        return this.props.books.map((book) => {
            return (
                <li 
                    key={book.title} 
                    onClick={() => this.props.selectBook(book)}
                    className="list-group-item">
                    {book.title}
                </li>
            )
        })
    }
    render() {//promove from component to conteiner
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        )
    }
}

//it's gonna take our application state
function mapStateToProps(state) {
    //Whatever is returned will show up as props
    //inside of BookList
    return { //connection between redux and our component here our container.
        //Returns an object
        //Key: value
        books: state.books
    }
}
//Anything return from this function will end up as props
//on the BookList container
//ACTION CREATOR
function mapDispatchToProps(dispatch) {
    //Whenever selectedBook is called, the result should be passed
    //to all of our reducers
    return bindActionCreators({selectBook: selectBook}, dispatch)
}

//takes a function and a component and produces a container.
//The container is a component that is aware of the state that's in within by redux.

//Promote BookList from a component to a container - it needs to know 
// about this new dispatch method, selectBook. Make it available
// as a prop
export default connect(mapStateToProps, mapDispatchToProps)(BookList);



