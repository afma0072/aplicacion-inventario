import axios from 'axios';

export class TransaccionService {
    baseUrl = "http://localhost:9000/transaccion/api/";

    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    } 

    save(transaccion) {
        return axios.post(this.baseUrl + "save", transaccion).then(res => res.data);
    }

    delete(id) {
        return axios.post(this.baseUrl + "delete/"+id, null).then(res => res.data);
    }
}
