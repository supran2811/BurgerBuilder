import React , {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css';

import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import {purchase} from '../../../store/actions/index';
import axios from '../../../axios-order';
import withErrorHander from '../../../hoc/withErrorHandler/withErrorHandler';
import {updateObject,checkValidity} from '../../../shared/utility';

class ContactData extends Component{
    state = {
        orderForm:{
            name:{
                 elementType:"input",
                 elementConfig:{
                     type:"text",
                     placeholder:"Your Name",
                     name:"name"
                 },
                 valid:false,
                 touched:false,
                 validation:{
                     required:true
                 },
                 value:""   
            },
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
                    required:true
                },
                value:""
            },
            street:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Street",
                    name:"street"
                },
                valid:false,
                touched:false,
                validation:{
                    required:true
                },
                value:""
            },
            country:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Country",
                    name:"country"
                },
                valid:false,
                touched:false,
                validation:{
                    required:true
                },
                value:""
            },
            zipcode:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Zip Code",
                    name:"zipcode"
                },
                valid:false,
                touched:false,
                validation:{
                    required:true,
                    maxlength:5,
                    minlength:5
                },
                value:""
            },
            deliveryMethod:{
                elementType :"select",
                elementConfig:{
                    options :[{value:"fastest",displayValue:"Fastest"},
                                {value:"cheapest",displayValue:"Cheapest"}]
                },
                value:"fastest",
                valid : true,
                validation:{}
            }
        },
        valid:false
    }

    orderHandler = (event) => {
       
        event.preventDefault();

        let orderForm = {};

        for(let key in this.state.orderForm){
            orderForm[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients : this.props.ingredients,
            price:this.props.price,
            orderData:orderForm,
            userid:this.props.userid

        }
        this.props.onPurchase(order);

    }

   
    inputChangedHandler = (event,id) => {
       
        const isValid = checkValidity(this.state.orderForm[id].validation , event.target.value);
        const updatedProperties = {value : event.target.value , valid : isValid,touched : true }
        const updatedOrderFormElement = updateObject(this.state.orderForm[id] , updatedProperties);
        const updatedOrderForm = updateObject(this.state.orderForm , {[id]:updatedOrderFormElement} )

        let formIsValid = true;
        for(let key in updatedOrderForm){
            formIsValid = formIsValid && updatedOrderForm[key].valid;
        }
        this.setState({orderForm:updatedOrderForm , valid:formIsValid});

    }

    render(){

        let formArrayElement = [];

        for(let key in this.state.orderForm){
            formArrayElement.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

        let form = <form>
                        {formArrayElement.map( element => (
                             <Input key = {element.id} 
                                    elementType = {element.config.elementType}
                                    elementConfig = {element.config.elementConfig}
                                    value = {element.config.value} 
                                    disabled = {!element.config.valid}
                                    touched = {element.config.touched}
                                    changed = {(event) => this.inputChangedHandler(event,element.id)}/>
                            )  )}
                        <Button btnType="Success" disabled={!this.state.valid} clicked={this.orderHandler}>ORDER</Button>
                    </form>;

        if(this.props.loading){
            form = <Spinner />;
        }            
        return(
            <div className={classes.ContactData}>
                    {form}
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        ingredients : state.burger.ingredients,
        price : state.burger.price,
        loading:state.order.loading,
        userid: state.auth.userid
    }
)

const mapDispatchToProps = dispatch => (
    {
        onPurchase : (order) => dispatch(purchase(order))
    }
);

export default connect(mapStateToProps,mapDispatchToProps )(withErrorHander(ContactData,axios));