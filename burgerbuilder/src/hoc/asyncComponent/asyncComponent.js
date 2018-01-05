import React , {Component} from 'react';

const asynComponent = (importComponent) => (
    class extends Component {
        state = {
            component:null
        }

        componentDidMount(){
            importComponent().then( component => (this.setState({component:component.default})));
        }

        render(){
            const C = this.state.component;

            return C !== null ? <C {...this.props} /> :null;
        }
    }
);

export default asynComponent;