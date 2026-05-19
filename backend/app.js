import express from "express";
import productRoutes from "./src/routes/products.js";
import categoryRoutes from "./src/routes/categories.js";
import brandRoutes from "./src/routes/brands.js";
import promotionRoutes from "./src/routes/promotions.js";

import cookieParser from "cookie-parser";
import cors from "cors";

//creo una constante que guarde Express
const app = express();

app .use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5173"],
        //permitir el envío de cookies y credenciales  
        credentials: true,
    })
);

app.use(cookieParser());

//que acepte los json desde postman
app.use(express.json());

app.use ("/api/products", productRoutes);
app.use ("/api/categories", categoryRoutes);
app.use ("/api/brands", brandRoutes);
app.use ("/api/promotions", promotionRoutes);

export default app; 