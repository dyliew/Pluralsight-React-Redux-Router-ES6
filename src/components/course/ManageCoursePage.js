import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {}
        };
    }

    render() {
        return (
                <CourseForm course={this.state.course}
                            errors={this.state.errors}
                            allAuthors={[]}
                />
        );
    }
}

ManageCoursePage.PropTypes = {
    course: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    let course = {
        id: '',
        watchHref: '',
        title: '',
        authorId: '',
        length: '',
        category: ''
    };
    return {
        course: course
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

// import React, {PropTypes} from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
//
// class ManageCoursePage extends React.Component {
//     constructor(props, context) {
//         super(props, context);
//     }
//
//     render() {
//         return ();
//     }
// }
//
// ManageCoursePage.PropTypes = {
//     // myProps: PropTypes.string.isRequired
// };
//
// function mapStateToProps(state, ownProps) {
//     return {
//         state: state
//     };
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(actions, dispatch);
//     };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);