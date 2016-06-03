import toastr from 'toastr';
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
            errors: {},
            saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.course.id !== nextProps.course.id)
            this.setState({course: Object.assign({}, nextProps.course)});
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        this.setState({course});
        return;
    }

    saveCourse(event) {
        event.preventDefault();
        this.setState({ saving: true });
        this.props.actions.saveCourse(this.state.course)
            .then(() => {
                this.setState({ saving: false });
                toastr.success('Course saved');
                this.context.router.push('/courses');
            })
            .catch((error) => {
                this.setState({ saving: false });
                toastr.error(error);
            });
    }

    render() {
        return (
                <CourseForm course={this.state.course}
                            errors={this.state.errors}
                            allAuthors={this.props.authors}
                            onChange={this.updateCourseState}
                            onSave={this.saveCourse}
                            saving={this.state.saving}
                />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id;

    let course = {
        id: '',
        watchHref: '',
        title: '',
        authorId: '',
        length: '',
        category: ''
    };

    if (courseId && state.courses.length) {
        course = state.courses.find(course => course.id === courseId);
    }

    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: `${author.firstName} ${author.lastName}`
        };
    });

    return {
        course: course,
        authors: authorsFormattedForDropdown
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