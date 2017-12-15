import React ,{Component} from 'react';
import Order from '../../Components/Order/Order';
import classes from './Orders.css';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component{

    state = {
        orders:[],
        loading:true
    }

    componentDidMount(){
        let orders = [];
        axios.get('orders.json').then(response =>{
             if(response != null){
                // orders = Object.values(response.data).map(data =>{
                //      console.log("data",data);
                //      return {ingredients:data.ingredients , price:data.price};
                // })
                console.log(response.data);
                for(let key in response.data){
                    orders.push({
                        ...response.data[key],
                        id:key
                    });
                }

              
                this.setState({orders:orders , loading:false});
             }
        })
    }

    render(){

        
        let orders = [];
        if(this.state.loading){
            orders = <Spinner />;
        }
        else{
            console.log(this.state.orders);
            orders = this.state.orders.map((order,index) =>{
                return <Order key={order.id}  {...order} />
          })
        }

        return(
            <div className = {classes.Orders}>
               {orders}
            </div>
        );
    }
}

export default Orders;