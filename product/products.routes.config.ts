import { CommonRoutesConfig } from '../common/common.routes.config';
import ProductController from './controller/product.controller';
import ProductMiddleware from './middleware/product.middleware';
import express from 'express';

export class ProductsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ProductRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/products`)
            .get(ProductController.listOfProducts)
            .post(
                ProductMiddleware.validateRequiredProductBodyFields,
                ProductMiddleware.validateSameNameDoesntExist,
                ProductController.createProduct
            );

        this.app.param(`productId`, ProductMiddleware.extractProductId);
        this.app
            .route(`/products/:productId`)
            .all(ProductMiddleware.validateProductExists)
            .get(ProductController.getProductById)
            .delete(ProductController.removeProduct);

        this.app.put(`/products/:productId`, [
            ProductMiddleware.validateRequiredProductBodyFields,
            ProductMiddleware.validateSameNameBelongToSameUser,
            ProductController.put,
        ]);

        this.app.patch(`/products/:productId`, [
            ProductMiddleware.validatePatchName,
            ProductController.patch,
        ]);

        return this.app;
    }
}