const fs = require('fs');

let read_json_file = () => {
    let file = './data/Foodjson.json';
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
    
    if(value=="US-NC"){
        conversion = 1;
        tax = 1.08;
    } 
    else if(value=="IE"){
        conversion = 0.85;
        tax = 1.23;
    }
    else if(value=="IN"){
        conversion = 73.58;
        tax = 1.18;
    }

    console.log("query by arg: " + arg + " " + value);
    for (let i = 0; i < result.length; i++) {
        result[i]["price"]= result[i].price * conversion * tax;
        result[i]["price"]= result[i]["price"].toFixed(2);
    }
    return result;
};

exports.query_by_arg = (arg, value) => {

    let json_result = JSON.parse(read_json_file());
    // all addresses are stored in a "result" object
    let result = json_result;
    console.log("query by arg: " + arg + " " + value);
    for (let i = 0; i < result.length; i++) {
        let food = result[i];
        if (food[arg] === undefined){
            throw new Error("Unknow parameter " + arg);
        }
        if (food[arg] === value) {
            return food;
        }

    }
    return null;
};

