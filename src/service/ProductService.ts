import ProductRepository from "../repository/ProductRepository";
import {Request, Response} from "express";
import {PaginateQuery} from "../interfaces/PaginateQuery";
import {PaginateProjection} from "../interfaces/PaginateProjection";

export default class ProductService {
    private repository = new ProductRepository();

    findAllByIdIn = async (ids: number[]) => {
        return await this.repository.findAllByIdIn(ids);
    }

    findPaginate = async (req: Request) => {
        const query: any = req.query;
        this.validateQuery(query);
        const paginateQuery: PaginateQuery = new PaginateQuery();
        paginateQuery.page = query.page;
        paginateQuery.rowsPerPage = query.rowsPerPage;
        paginateQuery.sortDirection = query.sortDirection;
        paginateQuery.sortField = query.sortField;
        const products: PaginateProjection = await this.repository.findPaginate(paginateQuery);
        products.content.forEach(product => {
            product.price = `R$${product.price.toFixed(2)}`;
        });
        return products
    }

    private validateQuery = (query: any) => {
        query.page = query.page ?? 1;
        query.rowsPerPage = query.rowsPerPage ?? 5;
        if (query.sortDirection || query.sortField) {
            query.sortField = query.sortField ?? 'id';
            query.sortDirection = query.sortDirection ?? 'ASC'
        }
    }

    findById = async (id: number, res: Response) => {
        const product = await this.repository.findById(id);
        if (product) {
            return product;
        }
        res.status(400).send(new Error("Product not found."));
        throw new Error("Product not found.");
    }
}