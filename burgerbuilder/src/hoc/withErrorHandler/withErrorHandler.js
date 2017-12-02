import React , {Component} from 'react'
import Aux from '../Aux/Aux';
import Modal from '../../Components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent , axios) => (
     class extends Component {
         
        state = {
            error:null
        }

        componentDidMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res , errr => {
                this.setState({error:errr});
            });
        }
        
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorClosedHandler = () => {
            this.setState({error:null});
        }

         render(){
               return (
                    <Aux>
                          <Modal show = {this.state.error} modalClosed={this.errorClosedHandler}>
                              {this.state.error?this.state.error.message:null}
                          </Modal> 
                          <WrappedComponent {...this.props} /> 
                    </Aux>
               ); 
         }
     }
);

export default withErrorHandler;