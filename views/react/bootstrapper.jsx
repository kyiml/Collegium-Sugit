import ReactHabitat from 'react-habitat';
import {RadioButton, Tab} from './controls.jsx';
import {LoginForm, SignupForm} from './account_forms.jsx';

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


        this.setContainer(builder.build());
    }
}

export default new Bootstrapper();