import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import chirpsRouter from './routes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use('/chirps', chirpsRouter);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

