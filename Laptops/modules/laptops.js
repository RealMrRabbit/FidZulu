const fs = require('fs');
let read_json_file = () => {
    let file = './data/laptops.json';
    return fs.readFileSync(file);
}

exports.list = () => {
    return JSON.parse(read_json_file());
};


exports.calcTax = (tax) => {
    let data = JSON.parse(read_json_file());
    for (let i = 0; i < data.length; ++i) {
      let addedTax = data[i].price * tax;
      data[i].price = parseFloat((data[i].price + addedTax).toFixed(2));
    }
    return data;
  }

exports.addData = (addedData) => {
  let data = JSON.parse(read_json_file());
  data.push(addedData);

  let newData = JSON.stringify(data);
  fs.writeFile('./data/laptops.json', newData, err => {
    if(err){
      throw err;
    }
    console.log("new data added")
  } )
}