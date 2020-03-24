import * as express from 'express';
import { getChirp, getChirps, createChirp, updateChirp, deleteChirp } from './chirpstore';
const router = express.Router();


router.get('/:id?', (req, res) => {
    let id = parseInt(req.params.id);
    if (id) {
        res.json(getChirp(id));
    } else {
        res.status(200).send(getChirps());
    }
});

router.post('/', (req, res) => {
    createChirp(req.body);
    res.sendStatus(200);
});


router.put('/:id', (req, res) => {
    updateChirp(parseInt(req.params.id), req.body);
    res.sendStatus(200);
});


router.delete('/:id', (req, res) => {
    deleteChirp(parseInt(req.params.id));
    res.sendStatus(200);
});

export default router;