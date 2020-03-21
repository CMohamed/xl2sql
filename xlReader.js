const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');


let sqlData = '';
const formatDate = date => l = date.toLocaleDateString().split('/').reverse().join('-');
const getColumns = columns => columns.map(e => "'" + e + "'").join(",");
const getValues = row => row.map(e => {
    console.log("e ")
    console.log(e, typeof(e));
    console.log("e ")
    if (e === null) {
        return '';
    } else if (typeof(e) === 'number') {
        return e;
    } else if (typeof(e) === 'string') {
        return e ? "'" + e + "'" : e ;
    } else {
        return "'" + formatDate(e) + "'";
    }
}).join(",");
const insertQuery = (table, columns, values) => `insert into ${table} (${getColumns(columns)}) values (${getValues(values)});`;
readXlsxFile('Food2eme.xlsx').then((rows) => {

    const columns = rows[0];
    let line = '';
    for (let i = 1; i < rows.length; i++) {
        console.log(rows[i]);
        line = insertQuery('Food', columns, rows[i]);
        sqlData += (line + "\n");
    }
    fs.writeFile( 'FoodOutOutput.sql', sqlData, (err) => { 
      
        // In case of a error throw err. 
        if (err) throw err; 
    })
});