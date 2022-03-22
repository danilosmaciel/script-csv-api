const CSVToJSON = require('csvtojson');
const axios = require('axios') ;
const fs = require('fs');
const finishDir = "./finalizados";

const api = axios.create({
    baseURL: "https://api.github.com",
});

let id = 'teste';
let filepath = 'um.csv';


CSVToJSON().fromFile(filepath)
    .then(row => {
        console.log(row);
        //const response = await api.post(`/api/v1/group-muscle/${id}/exercise`, row);
        
        api.post(`/api/v1/group-muscle/${id}/exercise`, row)
        .then(response => {
            processFile();
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }).catch(err => {
        console.log(err);
    });



function processFile() {
    if (!fs.existsSync(finishDir)) {
        //Efetua a criação do diretório
        fs.mkdirSync(finishDir);
    }
    fs.copyFile(filepath, `${finishDir}/${filepath}`, () => {
        fs.unlink(`./${filepath}`, () => {
            console.log('Arquivo processado com sucesso!');
        });
    });
}
    