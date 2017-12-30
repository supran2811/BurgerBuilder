import React , { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Auth extends Component {
    
    state = {
        controls : {
            email:{
                elementType:"input",
                elementConfig:{
                    type:"email",
                    placeholder:"Your Mail",
                    name:"mail"
                },
                valid:false,
                touched:false,
                validation:{
                    required:true,
                    isEmail:true
                },
                value:""
            },
            password:{
                elementType:"input",
                elementConfig:{
                    type:"password",
                    placeholder:"Enter Password",
                    name:"password"
                },
                valid:false,
                touched:false,
                validation:{
                    required:true,
                    minlength:6
                },
                value:""
            }
        },
        type:"signup"
    }    
    checkValidity(rules,value){
        let isValid = true;
        if(rules.required){
            isValid = isValid && value.trim() !== "";
        }

        if(rules.maxlength){
            isValid = isValid && value.trim().length <= rules.maxlength;
        }

        if(rules.minlength){
            isValid = isValid && value.trim().length >= rules.minlength;
        }
        console.log(isValid,rules);

        return isValid;
    }

    inputChangedHandler = (event,id) => {
        const updatedControls = {
            ...this.state.controls,
            [id]:{
                ...this.state.controls[id],
                value:event.target.value,
                valid:this.checkValidity(this.state.controls[id].validation,event.target.value),
                touched:true
            }
        };

        this.setState({controls:updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        
        if(this.state.type === "signin"){
            this.props.onSignIn(this.state.controls.email.value , 
                                     this.state.controls.password.value);
        }
        else{
            this.props.onSignUp(this.state.controls.email.value,
                                     this.state.controls.password.value);
        }
    }

    componentDidMount(){
        console.log("[componentWillMount]",this.props.location.search.substr(1));
        const type = this.props.location.search.substr(1);
        if(type !== this.state.type){
            this.setState({type:type});
        }
    }
    componentDidUpdate(){
        console.log("[componentWillUpdate]",this.props.location.search.substr(1));
        const type = this.props.location.search.substr(1);
        if(type !== this.state.type){
            this.setState({type:type});
        }
    }
    render(){
        let formArrayElement = [];

        for(let key in this.state.controls){
            formArrayElement.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        let form = formArrayElement.map( element => (
            <Input key = {element.id} 
                   elementType = {element.config.elementType}
                   elementConfig = {element.config.elementConfig}
                   value = {element.config.value} 
                   disabled = {!element.config.valid}
                   touched = {element.config.touched}
                   changed = {(event) => this.inputChangedHandler(event,element.id)}/>
           )  );
        if(this.props.loading){
            form = <Spinner />;
        }   
        let errorMessage = null;
        if(this.props.error){
            errorMessage = <div style = {{ color:'red'}} >{this.props.error}</div>
        }
        return (
            <div className = {classes.Auth}>
                {errorMessage}
                <form onSubmit = {this.submitHandler}>
                    {form}
                    <Button btnType="Success">{this.state.type === "signup"?"SIGN UP":"SIGN IN"}</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => (
    {
        onSignIn: (email,password) => dispatch(actions.signIn(email,password)),
        onSignUp: (email,password) => dispatch(actions.signUp(email,password)) 
    }
);

const mapStateToProps = state => (
    {
        loading:state.auth.loading,
        error:state.auth.error
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(Auth);