const fs = require('fs');
const readline = require('readline');
let filename = 'Food2eme.xlsx';
let lines;


fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    lines = data.split('\n');
    
    let line0 = lines[0].split(" ")
    const TOTAL_BOOKS = +line0[0];
    const TOTAL_LIBRAIRIES = +line0[1];
    const TOTAL_DAYS = +line0[2];

    
    let line1 = lines[1].split(" ")
    let librairies = [];
    let books = bookFactory(line1);
    for(let k=0; k<TOTAL_LIBRAIRIES*2; k+=2) {
        libProps = lines[k+2].split(" ");
        libBooks = lines[k+3].split(" ").map(e => findById(e, books)).sort((b1, b2) => b2.score - b1.score);
        let t = libProps[1];
        let nb = libProps[2];
        let totalScore = 0;
        // todo : calcul score
        let fin = (TOTAL_DAYS - t)*nb;
        fin = Math.min(fin, libBooks.length);
        for(let i = 0; i<fin; i++) {
            totalScore += libBooks[i].score;
        } 
        librairies[k/2] = new Library(k/2, libBooks, +t, +nb, totalScore);
    }
//    librairies = librairies.filter(lib => lib.timeSignUp >= TOTAL_DAYS);

    // todo : choose the optimal lib collections

    console.log(librairies[0]);
    console.log(librairies[1]);
    let allLibSorted = librairies.sort((l1, l2) => l2.totalScoreLibraries - l1.totalScoreLibraries );
    console.log(librairies);
    console.log(allLibSorted);
    console.log(calculScore(allLibSorted, TOTAL_DAYS));
    let ourData = calculScore(allLibSorted, TOTAL_DAYS);
    
    let outputData = '' + ourData.nbrLibs + '\n';
    for(let i=0; i<ourData.nbrLibs; i++) {
        outputData = outputData + '' + allLibSorted[i].id + ' ' + allLibSorted[i].scannedBooks.length + '\n'
        list = allLibSorted[i].scannedBooks.map(e => e.id).sort((b1, b2)=> b1-b2);
        console.log(list);
        outputData = outputData + list.join(' ') + '\n'
    }


    fs.writeFile(filename+'_Output.txt', outputData, (err) => { 
      
        // In case of a error throw err. 
        if (err) throw err; 
    }) 
});


