import {Product} from "../entity/Product";
import {PaginateQuery} from "../interfaces/PaginateQuery";
import {PaginateProjection} from "../interfaces/PaginateProjection";
import {QuotationStatusEnum} from "../enums/QuotationStatusEnum";

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

    findProductsByQuotationId = async (quotationId: number) => {
        return await Product.createQueryBuilder('product')
            .innerJoin('product.quotationDetails', 'quotationDetails')
            .innerJoin('quotationDetails.quotation', 'quotation')
            .where('quotation.id = :quotationId', {quotationId})
            .andWhere('quotation.status = :status', {status: QuotationStatusEnum.STARTED})
            .select(`product.description as "description",
            product.price as "price",
            product.image as "image",
            quotationDetails.quantity as "quantity"`)
            .getRawMany();
    }
}