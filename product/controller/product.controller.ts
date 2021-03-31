// we import express to add types to the request/response objects from our controller functions
import express from 'express';

// we import our newly created user services
import productService from '../services/product.service';

// we import the argon2 library for password hashing
import argon2 from 'argon2';

// we use debug with a custom context as described in Part 1
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');
class ProductsController {
    async listOfProducts(req: express.Request, res: express.Response) {
        const products = await productService.list(100, 0);
        res.status(200).send(products);
    }

    async getProductById(req: express.Request, res: express.Response) {
        const product = await productService.readById(req.params.productId);
        res.status(200).send(product);
    }

    async createProduct(req: express.Request, res: express.Response) {
        // req.body.password = await argon2.hash(req.body.password);
        // req.body.password = req.body.password;
        const productId = await productService.create(req.body);
        res.status(201).send({ id: productId });
    }

    async patch(req: express.Request, res: express.Response) {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await productService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        log(
            await productService.putById(req.params.userId, {
                id: req.params.userId,
                ...req.body,
            })
        );
        res.status(204).send();
    }

    async removeProduct(req: express.Request, res: express.Response) {
        log(await productService.deleteById(req.params.userId));
        res.status(204).send();
    }
}

export default new ProductsController();