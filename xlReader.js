const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');

const formatDate = date => l = date.toLocaleDateString().split('/').reverse().join('-');
const getColumns = columns => columns.map(e => "'" + e + "'").join(",");
const getValues = row => row.map(e => {
    if (e === null) {
        return '';
    } else if (typeof (e) === 'number') {
        return e;
    } else if (typeof (e) === 'string') {
        return e ? "'" + e + "'" : e;
    } else {
        return "'" + formatDate(e) + "'";
    }
}).join(",");

const insertQuery = (table, columns, values) => `insert into ${table} (${getColumns(columns)}) values (${getValues(values)});`;

const xl2sql = (filename, tableName) => {
    let sqlData = '';
    readXlsxFile(`${filename}.xlsx`).then((rows) => {
        const columns = rows[0];
        let line = '';
        for (let i = 1; i < rows.length; i++) {
            console.log(rows[i]);
            console.log("row : --------- "+ i);
            line = insertQuery(tableName, columns, rows[i]);
            sqlData += (line + "\n");
        }
        fs.writeFile(`sqlQueries/${filename}.sql`, sqlData, (err) => {
            if (err) throw err;
        })
    });
}

//xl2sql('Food2eme', 'foodsec');
//xl2sql('appended', 'appended');
//xl2sql('food_dataN3', 'food_data');
xl2sql('food3_10000_2', 'food_data');
//xl2sql('fooddiction', 'food_diction');