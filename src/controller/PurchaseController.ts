import {Request, Response} from "express";
import PurchaseService from "../service/PurchaseService";

export default class PurchaseController {
    private service: PurchaseService = new PurchaseService();

    checkout = async (req: Request, res: Response) => {
        const purchase = await this.service.checkout(req, res);
        res.status(200).send({
            message: 'Checkout successful!',
            id: purchase.id,
            totalAmount: `R$${purchase.totalAmount.toFixed(2)}`
        });
    }

}