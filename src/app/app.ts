import express, {Application, Request, Response} from 'express';

import { notesRoutes } from './controllers/notes.controller';
import { usersRoutes } from './controllers/user.comtroller';

const app: Application = express();
app.use(express.json());

app.use("/notes", notesRoutes)
app.use("/users", usersRoutes)

// // create a schema for notes


app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Note App")

})

export default app;