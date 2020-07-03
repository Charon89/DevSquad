import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {deleteComment} from "../../actions/post";

const CommentItem = ({postId, deleteComment, auth, comment: {_id, text, name, avatar, user, date}}) => {

    return (
        <div className="post bg-white p my">
            <div>
                <Link to={`/profile/${user}`}>
                   <span className="hide-sm"> <img
                        className="round-img"
                        src={avatar}
                        alt=""
                   /></span>
                    <h4>{name}</h4>
                </Link>
            </div>
            <div className='mar-2' style={{margin: 'auto, 0'}}>
                <p className="my">
                    {text}
                </p>
                <p className="post-date">
                    Posted on {' '}
                    <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>
                {!auth.loading && user === auth.user._id && (
                    <button onClick={event => deleteComment(postId, _id)} type='button'
                            className='btn btn-danger'><i className="fas fa-times"></i> {' '} Delete comment</button>
                )}
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem);
