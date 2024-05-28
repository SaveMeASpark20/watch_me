"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_1 = __importDefault(require("./routes/movies"));
require("express-async-errors");
const app = (0, express_1.default)();
app.use(express_1.default.json);
//Middleware 
//API
app.use("/api/movies", movies_1.default);
app.get("/", (req, res) => {
    res.send("hello world");
});
app.use((err, req, res, next) => {
    console.error('An error occurred:', err);
    const status = err.status || 500;
    res.status(status).send('Internal Server Error');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
