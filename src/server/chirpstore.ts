import * as fs from 'fs';
let chirps: any = { nextid: 0 };

if (fs.existsSync('chirps.json')) {
    chirps = JSON.parse(fs.readFileSync('chirps.json', 'utf-8'));
}

let getChirps = () => {
    return Object.assign({}, chirps); //create a copy and return it
}

let getChirp = (id: number) => {
    return Object.assign({}, chirps[id]); //create a copy and return it
}

let createChirp = (chirp: Chirp) => {
    chirps[chirps.nextid++] = chirp;
    writeChirps();
};

let updateChirp = (id: number, chirp: Chirp) => {
    chirps[id] = chirp;
    writeChirps();
}

let deleteChirp = (id: number) => {
    delete chirps[id];
    writeChirps();
}

let writeChirps = () => {
    fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

export { getChirp, getChirps, createChirp, updateChirp, deleteChirp };

interface Chirp {
    user: string;
    text: string;
}