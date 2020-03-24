"use strict";
exports.__esModule = true;
var fs = require('fs');
var chirps = { nextid: 0 };
if (fs.existsSync('chirps.json')) {
    chirps = JSON.parse(fs.readFileSync('chirps.json'));
}
var getChirps = function () {
    return Object.assign({}, chirps); //create a copy and return it
};
exports.getChirps = getChirps;
var getChirp = function (id) {
    return Object.assign({}, chirps[id]); //create a copy and return it
};
exports.getChirp = getChirp;
var createChirp = function (chirp) {
    chirps[chirps.nextid++] = chirp;
    writeChirps();
};
exports.createChirp = createChirp;
var updateChirp = function (id, chirp) {
    chirps[id] = chirp;
    writeChirps();
};
exports.updateChirp = updateChirp;
var deleteChirp = function (id) {
    delete chirps[id];
    writeChirps();
};
exports.deleteChirp = deleteChirp;
var writeChirps = function () {
    fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

