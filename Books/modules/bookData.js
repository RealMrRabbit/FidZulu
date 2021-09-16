const fs= require('fs');

let parse_book_data = () => {
    let file = './data/books-data.json';
    return fs.readFileSync(file);
}

exports.list = () => {
    return JSON.parse(parse_book_data());
}