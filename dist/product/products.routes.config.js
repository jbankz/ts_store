"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const product_controller_1 = __importDefault(require("./controller/product.controller"));
const product_middleware_1 = __importDefault(require("./middleware/product.middleware"));
class ProductsRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'ProductRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/products`)
            .get(product_controller_1.default.listOfProducts)
            .post(product_middleware_1.default.validateRequiredProductBodyFields, product_middleware_1.default.validateSameNameDoesntExist, product_controller_1.default.createProduct);
        this.app.param(`productId`, product_middleware_1.default.extractProductId);
        this.app
            .route(`/products/:productId`)
            .all(product_middleware_1.default.validateProductExists)
            .get(product_controller_1.default.getProductById)
            .delete(product_controller_1.default.removeProduct);
        this.app.put(`/products/:productId`, [
            product_middleware_1.default.validateRequiredProductBodyFields,
            product_middleware_1.default.validateSameNameBelongToSameUser,
            product_controller_1.default.put,
        ]);
        this.app.patch(`/products/:productId`, [
            product_middleware_1.default.validatePatchName,
            product_controller_1.default.patch,
        ]);
        return this.app;
    }
}
exports.ProductsRoutes = ProductsRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3Byb2R1Y3QvcHJvZHVjdHMucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx5RUFBb0U7QUFDcEUseUZBQWdFO0FBQ2hFLHlGQUFnRTtBQUdoRSxNQUFhLGNBQWUsU0FBUSx5Q0FBa0I7SUFDbEQsWUFBWSxHQUF3QjtRQUNoQyxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDO2FBQ2xCLEdBQUcsQ0FBQyw0QkFBaUIsQ0FBQyxjQUFjLENBQUM7YUFDckMsSUFBSSxDQUNELDRCQUFpQixDQUFDLGlDQUFpQyxFQUNuRCw0QkFBaUIsQ0FBQywyQkFBMkIsRUFDN0MsNEJBQWlCLENBQUMsYUFBYSxDQUNsQyxDQUFDO1FBRU4sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLDRCQUFpQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsc0JBQXNCLENBQUM7YUFDN0IsR0FBRyxDQUFDLDRCQUFpQixDQUFDLHFCQUFxQixDQUFDO2FBQzVDLEdBQUcsQ0FBQyw0QkFBaUIsQ0FBQyxjQUFjLENBQUM7YUFDckMsTUFBTSxDQUFDLDRCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFO1lBQ2pDLDRCQUFpQixDQUFDLGlDQUFpQztZQUNuRCw0QkFBaUIsQ0FBQyxnQ0FBZ0M7WUFDbEQsNEJBQWlCLENBQUMsR0FBRztTQUN4QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRTtZQUNuQyw0QkFBaUIsQ0FBQyxpQkFBaUI7WUFDbkMsNEJBQWlCLENBQUMsS0FBSztTQUMxQixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBbkNELHdDQW1DQyJ9