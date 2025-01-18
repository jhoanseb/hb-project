import express from "express";
import passport from "passport";
import cors from "cors";
import bodyParser from "body-parser";
import { authRouter } from "./routes.js";

const PORT = 3000;
const app = express();

// middlewares
import "./middlewares.js";
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());

app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`server in http://localhost:${PORT}`));
