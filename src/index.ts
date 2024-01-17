import express, {Express, NextFunction, Request, Response} from "express";
import { AppDataSource } from "./data-source"
import dotenv from "dotenv";
import mainRouter from './routes/routes';
import bodyParser from "body-parser";

const app: Express = express();

const port = process.env.PORT ?? 3000;

dotenv.config();

app.use(bodyParser.json())

app.use(mainRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

AppDataSource.initialize().then(async () => {
    console.log('DB Connection initialized');
}).catch(error => console.log(error))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send({ error: { message: "Something went wrong" }});
});

export default app;