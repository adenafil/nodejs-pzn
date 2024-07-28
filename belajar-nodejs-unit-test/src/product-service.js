import {getAllProducts, getProductById} from "./database.js";

export default class ProductService {
    static findById(id) {
        return getProductById(id);
    }

    static findAll() {
        return getAllProducts();
    }
}