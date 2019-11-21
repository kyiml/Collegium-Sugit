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
        const FORM_data = $(this.form.current).serialize();
        Func.send_ajax(
            FORM_method, 
            FORM_action, 
            FORM_data, 
            () => {
                window.location = response.redirect;
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
        const FORM_data = $(this.form.current).serialize();
        Func.send_ajax(
            FORM_method, 
            FORM_action, 
            FORM_data, 
            () => { 
                window.location = response.redirect; 
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

export {LoginForm, SignupForm};