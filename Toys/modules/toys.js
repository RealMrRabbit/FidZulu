const fs = require('fs');
let read_json_file = () => {
    let file = './data/toys.json';
    return fs.readFileSync(file);
}

exports.list = () => {
    return JSON.parse(read_json_file());
};


exports.calcTax = (tax) => {
    let data = JSON.parse(read_json_file());
    for (let i = 0; i < data.length; ++i) {
      let addedTax = data[i].prize * tax;
      data[i].prize = parseFloat((data[i].prize + addedTax).toFixed(2));
    }
    return data;
}

exports.addData = (addedData) => {
    let data = JSON.parse(read_json_file());
    data.push(addedData);
  
    let newData = JSON.stringify(data);
    fs.writeFile('./data/toys.json', newData, err => {
      if(err){
        throw err;
      }
      console.log("new data added")
    } )
  }