import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost} from "../../actions/post";


const PostsForm = ({addPost}) => {
    const [text, setText] = useState('');
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={event => {
                event.preventDefault();
                addPost({text});
                setText('');
            }}>
          <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Create a post"
              value={text}
              onChange={e => setText(e.target.value)}
              required
          ></textarea>
                <button type="submit" className="btn btn-dark my-1">
                    <i className="far fa-paper-plane"></i> {' '} Send
                </button>
            </form>
        </div>
    );
};

PostsForm.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default connect(null, {addPost})(PostsForm);
