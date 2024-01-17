import {Product} from "../entity/Product";
import {PaginateQuery} from "../interfaces/PaginateQuery";
import {PaginateProjection} from "../interfaces/PaginateProjection";

export default class ProductRepository {
    findPaginate = async (pagination: PaginateQuery): Promise<PaginateProjection> => {
        const [products, count] = await Product.findAndCount({
            order: {[pagination.sortField ?? 'id']: pagination.sortDirection ?? 'DESC'},
            skip: (pagination.page - 1) * pagination.rowsPerPage,
            take: pagination.rowsPerPage,
        });
        return {
            content: products,
            totalElements: count
        }
    }

    async findAllByIdIn(ids: number[]) {
        return Product.createQueryBuilder('product')
            .where('product.id in (:...ids)', {ids})
            .getMany();
    }

    findById = async (id: number) => {
        return await Product.createQueryBuilder('product')
            .where('product.id = :id', {id})
            .getOne();
    }
}