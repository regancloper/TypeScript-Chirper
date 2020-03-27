import * as express from 'express';
import { getChirp, getChirps, createChirp, updateChirp, deleteChirp } from './chirpstore';
const router = express.Router();


router.get('/:id?', (req, res) => {
    let id = parseInt(req.params.id);
    if (id) {
        res.json(getChirp(id));
    } else {
        const data = getChirps();
        let arr = [];
        for (var i in data) {
            if (i !== "nextid") {
                arr.push({ id: parseInt(i), author: data[i].user, text: data[i].text });
            }
        }
        res.status(200).json(arr);
    }
});

router.post('/', (req, res) => {
    const chirp = req.body;
    createChirp(chirp);
    res.sendStatus(200);
});


router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const chirp = req.body;
    updateChirp(id, chirp);
    res.sendStatus(200);
});


router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    deleteChirp(id);
    res.sendStatus(200);
});

export default router;