import ProductService from "../service/ProductService";
import {Request, Response} from "express";

export default class ProductController {
    private service: ProductService = new ProductService();

    findPaginate = async (req: Request, res: Response) => {
        const products = await this.service.findPaginate(req);
        res.status(200).send(products);
    }

}