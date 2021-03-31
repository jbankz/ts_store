import { CreateProductDto } from '../dto/create.product.dto';
import { PatchProductDto } from '../dto/patch.product.dto';
import { PutProductDto } from '../dto/put.product.dto';
import shortid from 'shortid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class ProductDao {
    products: Array<CreateProductDto> = [];

    constructor() {
        log('Created new instance of ProductDao');
    }

    //* creates a new product
    async addProduct(product: CreateProductDto) {
        product.id = shortid.generate();
        this.products.push(product);
        return product.id;
    }

    //* gets list of products
    async getProducts() {
        return this.products;
    }

    //* get a product by ID
    async getProductById(productId: string) {
        return this.products.find((product: { id: string }) => product.id === productId);
    }

    //* updates a product by ID
    async putProductById(productId: string, product: PutProductDto) {
        const objIndex = this.products.findIndex(
            (obj: { id: string }) => obj.id === productId
        );
        this.products.splice(objIndex, 1, product);
        return `${product.id} updated via put`;
    }

    //* patches a product by ID
    async patchProductById(productId: string, product: PatchProductDto) {
        const objIndex = this.products.findIndex(
            (obj: { id: string }) => obj.id === productId
        );
        let currentProduct = this.products[objIndex];
        const allowedPatchFields = [
            'name',
            'description',
            'quantity',
            'permissionLevel',
        ];
        for (let field of allowedPatchFields) {
            if (field in product) {
                // @ts-ignore
                currentProduct[field] = product[field];
            }
        }
        this.products.splice(objIndex, 1, currentProduct);
        return `${product.id} patched`;
    }

    //* deletes a product using their ID
    async removeProductById(productId: string) {
        const objIndex = this.products.findIndex(
            (obj: { id: string }) => obj.id === productId
        );
        this.products.splice(objIndex, 1);
        return `${productId} removed`;
    }

    //* gets a product by their name
    async getProductByName(name: string) {
        const objIndex = this.products.findIndex(
            (obj: { name: string }) => obj.name === name
        );
        let currentProduct = this.products[objIndex];
        if (currentProduct) {
            return currentProduct;
        } else {
            return null;
        }
    }
}

export default new ProductDao();