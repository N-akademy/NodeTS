import express, {Request,Response,NextFunction} from "express";
import mongoose from "mongoose";
import wilderController from "./controllers/Wilders";
import cors from "cors";

const app = express();

// database

async function init(): Promise<void>{
    await mongoose.connect("mongodb://127.0.0.1:27017/wilderdb",
        { autoIndex: true }) 

    app.get("/", (req:Request, res:Response) => {});

app.use(express.json());
app.use(cors());
//routes
app.post("/api/wilders", wilderController.create);

app.get("/api/wilders/", wilderController.read);

app.get("/api/wilders/:id", wilderController.readOne);

app.put("/api/wilders/:id", wilderController.update);

app.delete("/api/wilders/:id", wilderController.delete);

app.use((err:any,req:Request, res: Response, next: NextFunction) => {
    res.status(500).send("Error, occured!")
});

app.use((req:Request, res: Response, next:NextFunction) => {
    res.status(404).send("Sorry can't find that route!")
});

//Start Server
app.listen(3000, () => console.log("Server started on 3000"));
}
init();