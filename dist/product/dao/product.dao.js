"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default('app:in-memory-dao');
class ProductDao {
    constructor() {
        this.products = [];
        log('Created new instance of ProductDao');
    }
    //* creates a new product
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            product.id = shortid_1.default.generate();
            this.products.push(product);
            return product.id;
        });
    }
    //* gets list of products
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.products;
        });
    }
    //* get a product by ID
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.products.find((product) => product.id === productId);
        });
    }
    //* updates a product by ID
    putProductById(productId, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.products.findIndex((obj) => obj.id === productId);
            this.products.splice(objIndex, 1, product);
            return `${product.id} updated via put`;
        });
    }
    //* patches a product by ID
    patchProductById(productId, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.products.findIndex((obj) => obj.id === productId);
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
        });
    }
    //* deletes a product using their ID
    removeProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.products.findIndex((obj) => obj.id === productId);
            this.products.splice(objIndex, 1);
            return `${productId} removed`;
        });
    }
    //* gets a product by their name
    getProductByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.products.findIndex((obj) => obj.name === name);
            let currentProduct = this.products[objIndex];
            if (currentProduct) {
                return currentProduct;
            }
            else {
                return null;
            }
        });
    }
}
exports.default = new ProductDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9kdWN0L2Rhby9wcm9kdWN0LmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBLHNEQUE4QjtBQUM5QixrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLGVBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRXhELE1BQU0sVUFBVTtJQUdaO1FBRkEsYUFBUSxHQUE0QixFQUFFLENBQUM7UUFHbkMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELHlCQUF5QjtJQUNuQixVQUFVLENBQUMsT0FBeUI7O1lBQ3RDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDdEIsQ0FBQztLQUFBO0lBRUQseUJBQXlCO0lBQ25CLFdBQVc7O1lBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7S0FBQTtJQUVELHVCQUF1QjtJQUNqQixjQUFjLENBQUMsU0FBaUI7O1lBQ2xDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUF1QixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7S0FBQTtJQUVELDJCQUEyQjtJQUNyQixjQUFjLENBQUMsU0FBaUIsRUFBRSxPQUFzQjs7WUFDMUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQ3BDLENBQUMsR0FBbUIsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxTQUFTLENBQ2hELENBQUM7WUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLE9BQU8sR0FBRyxPQUFPLENBQUMsRUFBRSxrQkFBa0IsQ0FBQztRQUMzQyxDQUFDO0tBQUE7SUFFRCwyQkFBMkI7SUFDckIsZ0JBQWdCLENBQUMsU0FBaUIsRUFBRSxPQUF3Qjs7WUFDOUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQ3BDLENBQUMsR0FBbUIsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxTQUFTLENBQ2hELENBQUM7WUFDRixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sa0JBQWtCLEdBQUc7Z0JBQ3ZCLE1BQU07Z0JBQ04sYUFBYTtnQkFDYixVQUFVO2dCQUNWLGlCQUFpQjthQUNwQixDQUFDO1lBQ0YsS0FBSyxJQUFJLEtBQUssSUFBSSxrQkFBa0IsRUFBRTtnQkFDbEMsSUFBSSxLQUFLLElBQUksT0FBTyxFQUFFO29CQUNsQixhQUFhO29CQUNiLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFDO2FBQ0o7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLENBQUM7UUFDbkMsQ0FBQztLQUFBO0lBRUQsb0NBQW9DO0lBQzlCLGlCQUFpQixDQUFDLFNBQWlCOztZQUNyQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FDcEMsQ0FBQyxHQUFtQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FDaEQsQ0FBQztZQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBRUQsZ0NBQWdDO0lBQzFCLGdCQUFnQixDQUFDLElBQVk7O1lBQy9CLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUNwQyxDQUFDLEdBQXFCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUMvQyxDQUFDO1lBQ0YsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxJQUFJLGNBQWMsRUFBRTtnQkFDaEIsT0FBTyxjQUFjLENBQUM7YUFDekI7aUJBQU07Z0JBQ0gsT0FBTyxJQUFJLENBQUM7YUFDZjtRQUNMLENBQUM7S0FBQTtDQUNKO0FBRUQsa0JBQWUsSUFBSSxVQUFVLEVBQUUsQ0FBQyJ9