const fs = require('fs');

let read_json_file = () => {
    let file = './data/DVDsjson.json';
    return fs.readFileSync(file);
}

exports.list = () => {
    return JSON.parse(read_json_file());
};

exports.query_all = (arg, value) => {
    let json_result = JSON.parse(read_json_file());
    // all addresses are stored in a "result" object
    let result = json_result;


    let conversion = 1;
    let tax = 1.08;
    
    if(value=="Durham"){
        conversion = 1;
        tax = 1.08;
    } 
    if(value=="Raleigh"){
        conversion = 1;
        tax = 1.075;
    } 
    

    console.log("query by arg: " + arg + " " + value);
    for (let i = 0; i < result.length; i++) {
        result[i]["price"]= result[i].price * conversion * tax;
        result[i]["price"]= parseFloat(result[i]["price"].toFixed(2))
    }
    return result;
};

exports.query_by_arg = (arg, value) => {
    let json_result = JSON.parse(read_json_file());
    // all addresses are stored in a "result" object
    let result = json_result;
    console.log("query by arg: " + arg + " " + value);
    for (let i = 0; i < result.length; i++) {
        let dvd = result[i];
        if (dvd[arg] === value) {
            return dvd;
        }
    }
    return null;
};