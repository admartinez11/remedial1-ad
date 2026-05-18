import express from "express";
import productRoutes from "./src/routes/products.js"

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


export default app; 