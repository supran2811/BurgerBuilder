import React , {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../Components/UI/Spinner/Spinner';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class ContactData extends Component{
    state = {
        name:'',
        email:'',
        address:{
            street:'',
            postalcode:''
        },
        loading:false
    }

    orderHandler = (event) => {
       
        console.log(this.props.ingredients , this.props.price , this.props.history);
        this.setState({loading:true});
        const order = {
            ingredients : this.props.ingredients,
            price:this.props.price,
            name : "Supran",
            address :{
                street:"Kaspate Wasti",
                area: "Wakad",
                city:"Pune",
                state:"Maharashtra",
                country:"India"
            }
        }
        axios.post("orders.json",order).then(response => {
           this.setState({loading:false});
           this.props.history.push('/');
            //console.log(response);
            
        })
        .catch(errr => {
           this.setState({loading:false});
            console.log(errr);
        })

    }

    render(){
        let form = <form>
                        <input className={classes.Input} type="text" placeholder="Your Name" />
                        <input className={classes.Input} type="email" placeholder="Your Mail" />
                        <input className={classes.Input} type="text" placeholder="Street" />
                        <input className={classes.Input} type="text" placeholder="Postal Code" />
                        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                    </form>;

        if(this.state.loading){
            form = <Spinner />;
        }            
        return(
            <div className={classes.ContactData}>
                    {form}
            </div>
        );
    }
}

export default ContactData;