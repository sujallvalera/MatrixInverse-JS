
const puppeteer = require('puppeteer');
const {matrixList} = require('./matrix.json')

// sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//let matrixList = [42011, 69, 420, 69, 420, 69, 420, 69, 420]
// to check if the given matrix is a 3 by 3 matrix
if(matrixList.length==9){
    // simple program to calculate determinant of a matrix
    det = (matrixList[0] * ((matrixList[4] * matrixList[8]) - (matrixList[7] * matrixList[5]))) - (
    matrixList[1] * ((matrixList[3] * matrixList[8]) - (matrixList[6] * matrixList[5]))) + (
        matrixList[2] * ((matrixList[3] * matrixList[7]) - (matrixList[6] * matrixList[4])))
    // if the given matrix's inverse exists
    if(det!=0){
        let inverses = [];
        async function matrix() {
            // initialization
            const browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();
            await page.goto('https://matrixcalc.org/en/');
            await sleep(500)

            // typing the elements
            //row 1 row 1
            await page.type('#A-0-0', matrixList[0].toString());

            //row 1 column 2
            await page.type('#A-0-1', matrixList[1].toString());

            // row 1 column 3
            await page.type('#A-0-2', matrixList[2].toString());

            // row 2 column 1
            await page.type('#A-1-0', matrixList[3].toString());

            // row 2 column 2
            await page.type('#A-1-1', matrixList[4].toString());

            // row 2 column 3
            await page.type('#A-1-2', matrixList[5].toString());

            // row 3 column 1
            await page.type('#A-2-0', matrixList[6].toString());

            // row 3 column 2
            await page.type('#A-2-1', matrixList[7].toString());

            // row 3 column 3
            await page.type('#A-2-2', matrixList[8].toString());
            await sleep(500)

            // mapping to the inverse button
            await page.click('#right > main > form > div:nth-child(1) > div > button:nth-child(2)')
            await sleep(500)

            // mapping to the inverses which returns a list of elements
            let inv = await page.$$eval('mrow', elem=> {
                return elem.map(data_ms => data_ms.getAttribute('data-matrix'))
            });
            //removing the null elements
            inv.forEach(element => {
                if(element!=null){
                    inverses.push(element)
                }
                else{
                    //pass
                }
            });
            // printing the final output which is the inverse of the matrix(row wise)
            console.log('The determinant of the matrix: ', det);
            console.log('The inverse of the matrix: ', inverses[1]);
            await browser.close();

        } 

        matrix();
    }
    else{
        console.log("Inverse of the given matrix doesn't exist.");
    }

}

else{
    console.log("Please enter a 3 by 3 matrix.")
}
