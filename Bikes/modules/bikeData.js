const fs= require('fs');

let parse_bike_data = () => {
    let file = './data/bikes-data.json';
    return fs.readFileSync(file);
}

exports.list = () => {
    return JSON.parse(parse_bike_data());
}