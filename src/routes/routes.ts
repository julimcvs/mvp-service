import express, {Request, Response, Router} from 'express';
import ProductController from "../controller/ProductController";
import QuotationController from "../controller/QuotationController";
import PurchaseController from "../controller/PurchaseController";
import UserController from "../controller/UserController";
import {auth} from "../middlewares/AuthUtils";
import QuotationSchema from "../schema/QuotationSchema";
import { validateRequest } from 'typebox-express-middleware';
import PurchaseSchema from "../schema/PurchaseSchema";
import UserSchema from "../schema/UserSchema";

const router: Router = express.Router();

// Products
const productController = new ProductController();
router.post("/products", async (req: Request, res: Response) => {
    await productController.findPaginate(req, res);
})
router.get("/products/:id", async (req: Request, res: Response) => {
    await productController.findById(req, res);
})
router.get("/products/quotation/:id", async (req: Request, res: Response) => {
    await productController.findProductsByQuotationId(req, res);
})

// Purchase
const purchaseController = new PurchaseController();
const purchaseSchema = new PurchaseSchema();
router.post("/purchase/checkout", [auth, validateRequest(purchaseSchema.checkout)], async (req: Request, res: Response) => {
    await purchaseController.checkout(req, res);
})

// User
const userController = new UserController();
const userSchema = new UserSchema();
router.post("/auth/register", validateRequest(userSchema.register), async (req: Request, res: Response) => {
    await userController.register(req, res);
})
router.post("/auth/login", validateRequest(userSchema.login), async (req: Request, res: Response) => {
    await userController.login(req, res);
})

// Quotation
const quotationController = new QuotationController();
const quotationSchema = new QuotationSchema();
router.post("/quotation", validateRequest(quotationSchema.quotation), async (req: Request, res: Response) => {
    await quotationController.quotation(req, res);
})

router.post("/quotation/add", validateRequest(quotationSchema.addItem), async (req: Request, res: Response) => {
    await quotationController.addItem(req, res);
})

router.get("/quotation/:id", async (req: Request, res: Response) => {
    await quotationController.findQuotationById(req, res);
})

export default router;