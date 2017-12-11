import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
    
    componentDidMount() {
        if(!this.props.post) {
            const { id } = this.props.match.params; //we only want to access to id
            //as we've already passed it we can reference it
            this.props.fetchPost(id);
        }
    }
    onDeleteClick() {
        const { id } = this.props.match.params;
        //its risky to refer id beacause it assume that post exists in the current context,
        //so better we focus on params because it's always going to have the id available
        //this.props.deletePost(this.props.post.id);
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }
    render() {
        // posts[this.props.match.params.id]; //the post we want to show
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>;
        }
        return (

            <div>
                <button className="btn btn-danger pull-xs-right"
                onClick={this.onDeleteClick.bind(this)}
                >Delete Post
                </button>
                <Link to="/">Back To Posts</Link>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
//second argument the *action creator (fetchPost)*