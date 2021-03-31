import ProductDao from '../dao/product.dao';
import { CRUD } from '../../common/interface/crud.interface';
import { CreateProductDto } from '../dto/create.product.dto';
import { PutProductDto } from '../dto/put.product.dto';
import { PatchProductDto } from '../dto/patch.product.dto';

class ProcustService implements CRUD {
    async create(resource: CreateProductDto) {
        return ProductDao.addProduct(resource);
    }

    async deleteById(id: string) {
        return ProductDao.removeProductById(id);
    }

    async list(limit: number, page: number) {
        return ProductDao.getProducts();
    }

    async patchById(id: string, resource: PatchProductDto) {
        return ProductDao.patchProductById(id, resource);
    }

    async readById(id: string) {
        return ProductDao.getProductById(id);
    }

    async putById(id: string, resource: PutProductDto) {
        return ProductDao.putProductById(id, resource);
    }

    async getUserByName(name: string) {
        return ProductDao.getProductByName(name);
    }
}

export default new ProcustService();