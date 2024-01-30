import {Response} from "express";
import {QuotationDetail} from "../entity/QuotationDetail";
import {QuotationStatusEnum} from "../enums/QuotationStatusEnum";
import {Purchase} from "../entity/Purchase";
import QuotationService from "./QuotationService";
import {PurchaseDetail} from "../entity/PurchaseDetail";
import UserService from "./UserService";

export default class PurchaseService {
    private quotationService = new QuotationService();
    private userService = new UserService();

    checkout = async (req: any, res: Response) => {
        const user = await this.userService.findByEmail(req.token.id, res);
        const body = req.body;
        let purchase = new Purchase();
        const quotation = await this.quotationService.findById(body.quotationId, res);
        const quotationDetails: QuotationDetail[] = await quotation.quotationDetails;
        purchase.purchaseDetails = quotationDetails.map(detail => {
            const purchaseDetail: PurchaseDetail = new PurchaseDetail();
            purchaseDetail.purchase = purchase;
            purchaseDetail.productId = detail.productId;
            purchaseDetail.quantity = detail.quantity;
            purchaseDetail.subtotal = detail.subtotal;
            return purchaseDetail;
        });
        purchase.purchaseDate = new Date();
        purchase.totalAmount = quotation.totalAmount;
        purchase.userId = user.id;
        purchase.user = user;
        quotation.status = QuotationStatusEnum.FINISHED;
        await purchase.save();
        await quotation.save();
        return res.status(200).json({
            message: 'Checkout successful!',
            id: purchase.id,
            totalAmount: `R$${purchase.totalAmount.toFixed(2)}`
        });
    }
}