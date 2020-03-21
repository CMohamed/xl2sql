const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');


let sqlData = '';
const getColumns = columns => columns.map(e => "'" + e + "'").join(",");
const getValues = row => row.map(e => {
    if (typeof(e) === 'number') {
        return e;
    } else {
        return e ? "'" + e + "'" : e ;
    }
}).join(",");
const insertQuery = (table, columns, values) => `insert into ${table} (${getColumns(columns)}) values (${getValues(values)});`;
readXlsxFile('appended.xlsx').then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.

    const columns = rows[0];
    let line = '';
    for (let i = 1; i < rows.length; i++) {
        console.log(rows[i]);
        line = insertQuery('Food', columns, rows[i]);
        sqlData += (line + "\n");
    }
    fs.writeFile( 'appendedOutput.sql', sqlData, (err) => { 
      
        // In case of a error throw err. 
        if (err) throw err; 
    })
});