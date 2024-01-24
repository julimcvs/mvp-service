import {Request, Response} from "express";
import {Quotation} from "../entity/Quotation";
import QuotationRepository from "../repository/QuotationRepository";
import ProductService from "./ProductService";
import {QuotationDetail} from "../entity/QuotationDetail";
import {QuotationStatusEnum} from "../enums/QuotationStatusEnum";
import {ProductTypeEnum} from "../enums/ProductTypeEnum";
import {Product} from "../entity/Product";

export default class QuotationService {
    private repository = new QuotationRepository();
    private productService = new ProductService();

    addItem = async (req: Request, res: Response) => {
        const body = req.body;
        const product = body.product;
        let quotation = new Quotation();
        if (body.id) {
            quotation = await this.findById(body.id, res);
        }
        const savedProduct = await this.productService.findById(product.id, res);
        const quotationDetail = this.getQuotationDetail(quotation, product, savedProduct);
        let quotationDetails = await quotation.quotationDetails;
        const index = quotationDetails.findIndex(detail => detail.productId === product.id);
        if (index !== -1) {
            quotationDetails.splice(index, 1);
        }
        quotationDetails.push(quotationDetail);
        quotation.quotationDetails = quotationDetails;
        quotation.status = QuotationStatusEnum.STARTED;
        quotation.totalAmount = quotationDetails
            .map((detail) => detail.subtotal)
            .reduce((previousValue, currentValue) => previousValue + currentValue);
        await quotation.save();
        return res.status(200).json({
            message: 'Item added successfully!',
            id: quotation.id,
            totalAmount: `R$${quotation.totalAmount.toFixed(2)}`
        });
    }

    async findById(id: number, res: Response) {
        const quotation = await this.repository.findById(id);
        if (quotation) {
            return quotation;
        }
        res.status(400).json({error: 'Quotation not found.'});
        throw new Error('Quotation not found.')
    }

    quotation = async (req: Request, res: Response) => {
        const body = req.body;
        const products = body.products;
        let quotation = new Quotation();
        if (body.id) {
            quotation = await this.findById(body.id, res);
        }
        const productsIds = products.map((product: any) => product.id);
        const savedProducts = await this.productService.findAllByIdIn(productsIds);
        const quotationDetails: QuotationDetail[] = savedProducts.map(savedProduct => {
            const product = products.find((product: any) => product.id === savedProduct.id);
            return this.getQuotationDetail(quotation, product, savedProduct);
        })
        quotation.quotationDetails = quotationDetails;
        quotation.status = QuotationStatusEnum.STARTED;
        quotation.totalAmount = quotationDetails
            .map((detail) => detail.subtotal)
            .reduce((previousValue, currentValue) => previousValue + currentValue);
        await quotation.save();
        return res.status(200).json({
            message: 'Quotation successful!',
            id: quotation.id,
            totalAmount: `R$${quotation.totalAmount.toFixed(2)}`
        });
    }

    private getQuotationDetail(quotation: Quotation, product: any, savedProduct: Product) {
        const quotationDetail: QuotationDetail = new QuotationDetail();
        quotationDetail.quotation = quotation;
        quotationDetail.product = product;
        if ([ProductTypeEnum.SERVICE, ProductTypeEnum.COMBO].includes(savedProduct.type)) {
            quotationDetail.quantity = 1;
        } else {
            quotationDetail.quantity = product.quantity;
        }
        quotationDetail.subtotal = (quotationDetail.quantity * savedProduct.price);
        return quotationDetail;
    }
}