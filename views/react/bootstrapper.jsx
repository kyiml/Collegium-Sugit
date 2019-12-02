import ReactHabitat from 'react-habitat';
import {RadioButton, Tab, DropdownControl} from './controls.jsx';
import {LoginForm, SignupForm, UploadImageForm, SettingsForm} from './forms.jsx';

class Bootstrapper extends ReactHabitat.Bootstrapper {
    constructor(){
        super();
        const builder = new ReactHabitat.ContainerBuilder();

        // Register a component:
        builder.register(RadioButton).as('RadioButton').withOptions({
            tag: 'span',
        });
        builder.register(Tab).as('Tab').withOptions({
            tag: 'span',
        });;
        builder.register(LoginForm).as('LoginForm').withOptions({
            tag: 'div',
        });
        builder.register(SignupForm).as('SignupForm').withOptions({
            tag: 'div',
        });
        builder.register(UploadImageForm).as('UploadImageForm').withOptions({
            tag: 'div',
        });
        builder.register(SettingsForm).as('SettingsForm').withOptions({
            tag: 'div',
        });
        builder.register(DropdownControl).as('DropdownControl').withOptions({
            tag: 'span',
        });


        this.setContainer(builder.build());
    }
}

export default new Bootstrapper();