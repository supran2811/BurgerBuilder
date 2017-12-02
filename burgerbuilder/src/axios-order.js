import axios from 'axios';

const instance = axios.create({
    baseURL:"https://react-burger-builder-4fe2a.firebaseio.com/"
})

export default instance;