import React ,{Component} from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../Components/Order/Order';
import classes from './Orders.css';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Orders extends Component{

    componentDidMount(){

       this.props.initOrders();
        
    }

    render(){

        
        let orders = [];
        if(this.props.loading){
            orders = <Spinner />;
        }
        else{
            console.log(this.props.orders);
            orders = this.props.orders.map((order,index) =>{
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

const mapStateToProps = state => (
    {
        orders:state.order.orders,
        loading:state.order.loading
    }
);

const mapDispatchToProps = dispatch => (
    {
        initOrders : () => dispatch(actions.downloadOrders())
    }
);
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));