import {Request, Response} from "express";
import {Quotation} from "../entity/Quotation";
import {QuotationDetail} from "../entity/QuotationDetail";
import {QuotationStatusEnum} from "../enums/QuotationStatusEnum";
import {Purchase} from "../entity/Purchase";
import QuotationService from "./QuotationService";
import ProductService from "./ProductService";
import {PurchaseDetail} from "../entity/PurchaseDetail";

export default class PurchaseService {
    private quotationService = new QuotationService();
    private productService = new ProductService();

    checkout = async (req: Request, res: Response) => {
        const body = req.body;
        let purchase = new Purchase();
        const quotation = await this.quotationService.findById(body.quotationId, res);
        const quotationDetails: QuotationDetail[] = await quotation.quotationDetails;
        // const productsIds: number[] = quotationDetails.map((product: any) => product.id);
        // const savedProducts = await this.productService.findAllByIdIn(productsIds);
        const purchaseDetails: PurchaseDetail[] = quotationDetails.map(detail => {
            const purchaseDetail: PurchaseDetail = new PurchaseDetail();
            purchaseDetail.purchase = purchase;
            purchaseDetail.productId = detail.productId;
            purchaseDetail.quantity = detail.quantity;
            return purchaseDetail;
        })
        purchase.purchaseDetails = purchaseDetails;
        purchase.purchaseDate = new Date();
        purchase.totalAmount = quotation.totalAmount;
        quotation.status = QuotationStatusEnum.FINISHED;
        await quotation.save();
        await purchase.save();
        return {
            id: purchase.id,
            totalAmount: purchase.totalAmount
        };
    }
}