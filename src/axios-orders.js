import axios from 'axios';

const instance=axios.create({
    baseURL: "https://react-my-burger-27fb2-default-rtdb.firebaseio.com/"
})
export default instance;