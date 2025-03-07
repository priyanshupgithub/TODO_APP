import express, { json } from "express";
import dotenv from "dotenv";
import connectDb from "./database/database.js";
import todoRoute from "./routes/todo-route.js"
import userRoute from "./routes/user-route.js"
import cors from "cors"

dotenv.config();
const app = express();
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:"GET,POST,PUT,DELETE",
  allowedHeaders :["Content-Type", "Authorization"]
}))
app.use(express.json())
const PORT = process.env.PORT;


connectDb()
  .then(() => {
    console.log("database connection established.");
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("database cannot be connected!", err);
  });


//   routes

app.use('/todo',todoRoute);
app.use('/user',userRoute)
app.use("/", (req, res) => {
    console.log("console hello from the home.");
    res.send("hello from the home page.");
  });



  