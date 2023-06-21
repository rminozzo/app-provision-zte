import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.adyl.net.br/api-provision-zte/'
});