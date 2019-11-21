import React from 'react';

class RadioButton extends React.Component {
    render() {
        return (
            <p className="settings-choice-label">
                <input 
                    id={this.props.value + "_option"} type="radio" 
                    name={this.props.name} value={this.props.value}>
                </input>
                <label htmlFor={this.props.value + "_option"} className="noselect">
                    {this.props.text}
                </label>
            </p>
        );
    }
}

class Slider extends React.Component {

}

class Checkbox extends React.Component {
    render() {
        return (
            <p className="settings-choice-label">
                <input 
                    id={this.props.value + "_option"} type="checkbox" 
                    name={this.props.name} value={this.props.value}>
                </input>
                <label htmlFor={this.props.value + "_option"} className="noselect">
                    {this.props.text}
                </label>
            </p>
        );
    }
}

class Tab extends React.Component {
    static active_tabs = {};
    static all_tabs = [];
    constructor(props) {
        super(props);
        Tab.all_tabs.push(this);
    }
    handle_click() {
        Tab.active_tabs[this.props.group] = this.props.name;
        Tab.all_tabs.forEach((t) => t.forceUpdate()); // TODO: make this better
    }
    render() {
        const style = Tab.active_tabs[this.props.group] == this.props.name ? 
        (<style>{
            `.${this.props.name} {\
                display:block;\
            }`
        }</style>)
        :
        (<style>{
            `.${this.props.name} {\
                display:none;\
            }`
        }</style>);
        const mystyle = Tab.active_tabs[this.props.group] == this.props.name ? 
        "settings-tab active"
        :
        "settings-tab"
        return (
            <div className={mystyle} onClick={this.handle_click.bind(this)}>
                {this.props.text}
                {style}
            </div>
        );
    }
}

export {RadioButton, Slider, Checkbox, Tab};