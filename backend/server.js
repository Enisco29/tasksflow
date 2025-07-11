import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connectDB
connectDB();

//Routes
app.get("/", (req, res) => res.send("API WORKING"));
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is live on PORT ${port}`);
});
