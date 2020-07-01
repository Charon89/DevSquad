import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import Moment from "react-moment";
import PropTypes from 'prop-types';
import {deleteEducation} from "../../actions/profile";

const Education = ({education, deleteEducation}) => {

    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.fieldofstudy}</td>
            <td>
                <Moment format={'YYYY/MM/DD'}>{edu.from}</Moment> - {edu.to === "" ? "Now" : (
                <Moment format='YYYY/MM/DD'></Moment>)}
            </td>
            <td>
                <button onClick={() => deleteEducation(edu._id)} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ))

    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Field of Study</th>
                    <th className="hide-sm">Years</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {educations}
                </tbody>
            </table>
        </Fragment>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
};

export default connect(null, {deleteEducation})(Education);
