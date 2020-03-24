import * as express from 'express';
import chirpsRouter from './routes';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/chirps', chirpsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

