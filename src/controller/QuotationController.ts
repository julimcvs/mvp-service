import {Request, Response} from "express";
import QuotationService from "../service/QuotationService";

export default class QuotationController {
    private service: QuotationService = new QuotationService();

    addItem = async (req: Request, res: Response) => {
        const quotation = await this.service.addItem(req, res);
        res.status(200).send({
            message: 'Quotation successful!',
            id: quotation.id,
            totalAmount: `R$${quotation.totalAmount.toFixed(2)}`
        });
    }

    quotation = async (req: Request, res: Response) => {
        const quotation = await this.service.quotation(req, res);
        res.status(200).send({
            message: 'Quotation successful!',
            id: quotation.id,
            totalAmount: `R$${quotation.totalAmount.toFixed(2)}`
        });
    }

}