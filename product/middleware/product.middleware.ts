import express from 'express';
import productService from '../services/product.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');
class ProductMiddleware {
    async validateRequiredProductBodyFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body && req.body.name) {
            next();
        } else {
            res.status(400).send({
                error: `Missing required fields name`,
            });
        }
    }

    async validateSameNameDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await productService.getUserByName(req.body.name);
        if (user) {
            res.status(400).send({ error: `Product name already exists` });
        } else {
            next();
        }
    }

    async validateSameNameBelongToSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const product = await productService.getUserByName(req.body.name);
        if (product && product.id === req.params.productId) {
            next();
        } else {
            res.status(400).send({ error: `Invalid name` });
        }
    }

    // Here we need to use an arrow function to bind `this` correctly
    validatePatchName = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (req.body.email) {
            log('Validating name', req.body.email);

            this.validateSameNameBelongToSameUser(req, res, next);
        } else {
            next();
        }
    };

    async validateProductExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const product = await productService.readById(req.params.userId);
        if (product) {
            next();
        } else {
            res.status(404).send({
                error: `Product ${req.params.productId} not found`,
            });
        }
    }

    async extractProductId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.productId;
        next();
    }

}

export default new ProductMiddleware();