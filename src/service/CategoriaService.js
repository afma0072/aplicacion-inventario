import axios from 'axios';

export class CategoriaService {
    baseUrl = "http://localhost:9000/categoria/api/";

    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    } 

    save(categoria) {
        return axios.post(this.baseUrl + "save", categoria).then(res => res.data);
    }

    delete(id) {
        return axios.post(this.baseUrl + "delete/"+id, null).then(res => res.data);
    }
}
