import React from 'react';
//import {RadioButton} from './controls.jsx';
//import {Func} from './util.jsx';

class Course extends React.Component {
    render() {
        return (
            <div className="course-container">
                <img 
                    className="picture-box medium"
                    src={this.props.thumbnail || "/static/img/course_thumbnail_default.png"}
                ></img>
                <div className="course-description">
                    <h1>{this.props.title}</h1>
                    <h4>{this.props.description}</h4>
                </div>
            </div>
        );
    }
}

class CourseList extends React.Component {
    render() {
        return (
            <div>
                {this.props.courses.map((course, index) => {
                    return (
                        <Course 
                            key={index}
                            thumbnail={course.thumbnail}
                            title={course.title}
                            description={course.description}
                        ></Course>
                    );
                })}
            </div>
        );
    }
}

export {CourseList};