import {Quotation} from "../entity/Quotation";
import {QuotationStatusEnum} from "../enums/QuotationStatusEnum";

export default class QuotationRepository {
    findById = async (id: number) => {
        return await Quotation.createQueryBuilder('quotation')
            .where('quotation.id = :id', {id})
            .andWhere('quotation.status = :status', {status: QuotationStatusEnum.STARTED})
            .getOne();
    }
}