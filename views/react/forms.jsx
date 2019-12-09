import React from 'react';
import {RadioButton} from './controls.jsx';
import {Func} from './util.jsx';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.account_type = React.createRef();
        this.username = React.createRef();
        this.password = React.createRef();
        this.password_confirmation = React.createRef();
        this.handle_signup = this.handle_signup.bind(this);
    }
    handle_signup(e) {
        e.preventDefault();
        const FORM_method = $(this.form.current).attr("method");
        const FORM_action = $(this.form.current).attr("action");
        const FORM_form = this.form.current;
        Func.send_ajax(
            FORM_method, 
            FORM_action, 
            FORM_form, 
            (XHR_response) => {
                $(this.form.current).attr("data-status", "SUCCESS");
                window.location = XHR_response.redirect;
            },
            (XHR_response) => {
                $(this.form.current).attr("data-status", "FAILURE");
            }
        );
        return false;
    }
    render() {
        return (
            <form action='/signup' method='POST' onSubmit={this.handle_signup} ref={this.form}>
                <br></br>
                <br></br>
                <p>I am a:</p>
                <RadioButton name="account_type" value="ACCOUNT_STUDENT" text="Student"/>
                <RadioButton name="account_type" value="ACCOUNT_EDUCATOR" text="Educator"/>
                <br></br>
                <br></br>
                <p>My name is:</p>
                <input 
                    className="col-3" 
                    name="username" 
                    type="text" 
                    ref={this.username}
                ></input>
                <br></br>
                <br></br>
                <p>My password is:</p>
                <input 
                    className="col-3" 
                    name="password" 
                    type="password" 
                    ref={this.password}
                ></input>
                <br></br>
                <br></br>
                <p>Confirm password:</p>
                <input 
                    className="col-3" 
                    name="password_confirmation" 
                    type="password" 
                    ref={this.password_confirmation}
                ></input>
                <br></br>
                <br></br>
                <input className="settings-button" type="submit" value="Go"></input>
            </form>
        );
    }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.username = React.createRef();
        this.password = React.createRef();
        this.handle_login = this.handle_login.bind(this);
    }
    handle_login(e) {
        e.preventDefault();
        const FORM_method = $(this.form.current).attr("method");
        const FORM_action = $(this.form.current).attr("action");
        const FORM_form = this.form.current;
        Func.send_ajax(
            FORM_method, 
            FORM_action, 
            FORM_form, 
            (XHR_response) => { 
                $(this.form.current).attr("data-status", "SUCCESS");
                window.location = XHR_response.redirect; 
            },
            (XHR_response) => {
                $(this.form.current).attr("data-status", "FAILURE");
            }
        );
        return false;
    }
    render() {
        return (
            <form action='/login' method='POST' onSubmit={this.handle_login} ref={this.form}>
                <br></br>
                <br></br>
                <p>My name is:</p>
                <input className="col-3" name="username" type="text" ref={this.username}></input>
                <br></br>
                <br></br>
                <p>My password is:</p>
                <input 
                    className="col-3" 
                    name="password" 
                    type="password" 
                    ref={this.password}
                ></input>
                <br></br>
                <br></br>
                <input className="settings-button" type="submit" value="Go"></input>
            </form>
        );
    }
}

class UploadImageForm extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.file_name = React.createRef();
        this.handle_image_upload = this.handle_image_upload.bind(this);
    }
    handle_image_upload(e) {
        e.preventDefault();
        const FORM_method = $(this.form.current).attr("method");
        const FORM_action = $(this.form.current).attr("action");
        const FORM_form = this.form.current;
        Func.send_ajax_multipart(
            FORM_method, 
            FORM_action, 
            FORM_form, 
            (XHR_response) => {
                $(this.form.current).attr("data-status", "SUCCESS");
                document.querySelector(`#${this.props.form_id}`).value = XHR_response.location;
            },
            (XHR_response) => {
                $(this.form.current).attr("data-status", "FAILURE");
            }
        );
        return false;
    }
    render() {
        return (
            <form 
                action='/upload/image' 
                method='POST' 
                onSubmit={this.handle_image_upload} 
                ref={this.form} 
                encType="multipart/form-data"
            >
                <label className="settings-button" >
                    Select Image
                    <input 
                        type="file" 
                        accept="image/*" 
                        name="image" 
                        ref={this.file_name}
                        onChange={function() {this.forceUpdate()}.bind(this)}
                    ></input>
                </label>
                <span className="settings-file-selected success-green failure-red">
                    {
                        this.file_name.current && 
                        this.file_name.current.value.match(/^(C:\\fakepath\\)?(.*?)$/)[2] ||
                        "no file selected"
                    }
                </span>
                <input className="settings-button" type="submit" value="upload"></input>
            </form>
        );
    }
}

class SettingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.form_id = Func.LEMON("form-id");
        this.form = React.createRef();
        this.handle_update_settings = this.handle_update_settings.bind(this);
    }
    handle_update_settings(e) {
        e.preventDefault();
        const FORM_method = $(this.form.current).attr("method");
        const FORM_action = $(this.form.current).attr("action");
        const FORM_form = this.form.current;
        Func.send_ajax(
            FORM_method, 
            FORM_action, 
            FORM_form, 
            (XHR_response) => {
                $(this.form.current).attr("data-status", "SUCCESS");
                window.location = XHR_response.redirect; 
            },
            (XHR_response) => {
                $(this.form.current).attr("data-status", "FAILURE");
            }
        );
        return false;
    }
    render() {
        return (
            <div>
                <p>Set Profile Picture</p>
                <UploadImageForm form_id={this.form_id}></UploadImageForm>
                <form 
                    action='/settings' 
                    method='POST' 
                    onSubmit={this.handle_update_settings} 
                    ref={this.form}
                >
                    <input id={this.form_id} type="hidden" name="profile_picture"></input>
                    <div style={{position: "absolute", right:"0", bottom:"0"}}>
                        <input 
                            className="settings-button" 
                            type="submit" 
                            value="Update Profile">
                        </input>
                    </div>
                </form>
            </div>
        );
    }
}

class CourseForm extends React.Component {
    constructor(props) {
        super(props);
        this.form_id = Func.LEMON("form-id");
        this.form = React.createRef();
        this.handle_upload_course = this.handle_upload_course.bind(this);
    }
    handle_upload_course(e) {
        e.preventDefault();
        const FORM_method = $(this.form.current).attr("method");
        const FORM_action = $(this.form.current).attr("action");
        const FORM_form = this.form.current;
        Func.send_ajax(
            FORM_method, 
            FORM_action, 
            FORM_form, 
            (XHR_response) => {
                $(this.form.current).attr("data-status", "SUCCESS");
                window.location = XHR_response.redirect;
            },
            (XHR_response) => {
                $(this.form.current).attr("data-status", "FAILURE");
            }
        );
        return false;
    }
    render() {
        return (
            <div>
                <p>Create New Course</p>
                <br></br>
                <br></br>
                <p>Set Course Picture</p>
                <UploadImageForm form_id={this.form_id}></UploadImageForm>
                <form 
                    action='/upload/course' 
                    method='POST' 
                    onSubmit={this.handle_upload_course} 
                    ref={this.form}
                >
                    <br></br>
                    <br></br>
                    <p>Course Title</p>
                    <input className="col-3" name="title" type="text" ref={this.title}></input>
                    <input id={this.form_id} type="hidden" name="thumbnail"></input>
                    <br></br>
                    <br></br>
                    <p>Course Description</p>
                    <textarea name="description" className="col-3">
                        
                    </textarea>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div style={{position: "absolute", right:"0", bottom:"0"}}>
                        <input 
                            className="settings-button" 
                            type="submit" 
                            value="Create Course">
                        </input>
                    </div>
                </form>
            </div>
        );
    }
}

export {LoginForm, SignupForm, UploadImageForm, SettingsForm, CourseForm};