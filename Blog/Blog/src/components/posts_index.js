import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }
    //render posts with link to post_show
    renderPosts(){
        return _.map(this.props.posts, post => {
            var id = post.id;
            return (                
                <li className="list-group-item" key={post.id} >
                    <Link to={`posts/${id}`}>
                    {post.title}
                    
                    </Link>
                </li>
            );
        });
    }
    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-success" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { posts: state.posts };
}
//Action creator hooked up with the component
export default connect(mapStateToProps, { fetchPosts: fetchPosts })(PostsIndex);