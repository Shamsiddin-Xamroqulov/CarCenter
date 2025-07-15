import express from "express";
import path from "node:path";
import {serverConfig} from "./config.js"
import mainRouter from "./routes/main.routes.js";
import viewsRouter from "./routes/views.routes.js";
const {PORT} = serverConfig;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(process.cwd(), "public")))

app.set("view engine", "ejs"),
app.set("views", path.join(process.cwd(), "src", "views"));

app.use(viewsRouter);
app.use("/api", mainRouter);

app.listen(PORT, () => {
    console.log(`Server is runnning on ${PORT}:port`)
})