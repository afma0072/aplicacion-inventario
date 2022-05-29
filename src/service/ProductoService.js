import axios from 'axios';

export class ProductoService {
    baseUrl = "http://localhost:9000/producto/api/";

    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    } 

    save(producto) {
        return axios.post(this.baseUrl + "save", producto).then(res => res.data);
    }

    delete(id) {
        return axios.post(this.baseUrl + "delete/"+id, null).then(res => res.data);
    } 
    
}


