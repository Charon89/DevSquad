import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment} from "../../actions/post";

const CommentForm = ({postId, addComment}) => {
    const [text, setText] = useState('');
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave a comment...</h3>
            </div>
            <form className="form my-1" onSubmit={event => {
                event.preventDefault();
                addComment(postId, {text});
                setText('');
            }}>
          <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Your comment here"
              value={text}
              onChange={e => setText(e.target.value)}
              required
          ></textarea>
                <button type="submit" className="btn btn-dark my-1" >
                    <i className="far fa-paper-plane"></i> {' '} Send
                </button>
            </form>
        </div>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
};

export default connect(null, {addComment})(CommentForm);
