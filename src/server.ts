import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import '@controllers/UserController';
import bodyParser from 'body-parser';

const app: Application = express();

const port = 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => res.status(200).json({ message: 'Hello World' }));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Application started successfully on port ${port}.`));
