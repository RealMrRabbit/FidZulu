const fs = require('fs');

let read_json_file = () => {
    let file = './data/teams.json';
    return fs.readFileSync(file);
}

exports.list = () => {
    return JSON.parse(read_json_file());
};

exports.query_team = () => {
    let json_result = JSON.parse(read_json_file());
    // all addresses are stored in a "result" object
    let result = json_result;
    
    for (let i = 0; i < result.length; i++) {
        let team = result[i];
        
            return team;
        
    }
    return null;
};