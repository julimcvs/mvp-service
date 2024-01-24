import ProductService from "../service/ProductService";
import {Request, Response} from "express";

export default class ProductController {
    private service: ProductService = new ProductService();

    findPaginate = async (req: Request, res: Response) => {
        try {
            await this.service.findPaginate(req);
        } catch (error: any) {
            console.error(error.stack);
            if (!res.headersSent) {
                res.status(500).json({error: "Error listing products."});
            }
        }
    }

}