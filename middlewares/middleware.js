const axios = require('axios');

function getPlayerByFullName(fullName) {
    return axios.get(`https://www.balldontlie.io/api/v1/players?per_page=1&search=${fullName}`)
};

function getPlayerById(id) {
    return axios.get(`https://www.balldontlie.io/api/v1/players/${id}`);
};

function getPlayersByFullName(fullName) {
    return axios.get(`https://www.balldontlie.io/api/v1/players?per_page=100&search=${fullName}`)
};

module.exports = { getPlayerByFullName, getPlayersByFullName, getPlayerById }