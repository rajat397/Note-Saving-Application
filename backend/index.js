import connectToMongo from "./db.js";
import  express  from "express";
import router from "./routes/auth.js";
import router2 from "./routes/notes.js";
import cors from 'cors';
connectToMongo();

const app = express()

const port = 5000
app.use(cors());
app.use(express.json())

app.use('/api/auth',router)
app.use('/api/notes',router2)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
