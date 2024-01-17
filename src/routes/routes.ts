import express, { Request, Response, Router } from 'express';
import ProductController from "../controller/ProductController";
import QuotationController from "../controller/QuotationController";
import PurchaseController from "../controller/PurchaseController";

const router: Router = express.Router();

// Products
const productController = new ProductController();
router.get("/products", async (req: Request, res: Response) => {
    await productController.findPaginate(req, res);
})

// Purchase
const purchaseController = new PurchaseController();
router.post("/purchase/checkout", async (req: Request, res: Response) => {
    await purchaseController.checkout(req, res);
})

// Quotation
const quotationController = new QuotationController();
router.post("/quotation", async (req: Request, res: Response) => {
    await quotationController.quotation(req, res);
})

router.post("/quotation/add", async (req: Request, res: Response) => {
    await quotationController.addItem(req, res);
})


router.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

export default router;