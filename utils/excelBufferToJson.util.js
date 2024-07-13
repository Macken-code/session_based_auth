const ExcelJS = require('exceljs');
const {trimField} = require("../utils/trimField.util");

async function excelBufferToJson(excelBuffer, workSheetName) {

    return new Promise( async (resolve, reject) => {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(excelBuffer);
        const worksheet = workbook.getWorksheet(workSheetName);

        // get first row as header
        let worksheetHeader = worksheet.getRow(1).values.map(h => h.replace(/ /g,'_').toLowerCase());
        console.log("TARGET >>>>>> ", worksheetHeader);

        // from excel worksheet rows to json object array
        let jsonRows = [];
        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            if(rowNumber == 1) return;
            let values = row.values;
            let obj = {};
            for(let i = 1; i<worksheetHeader.length; i++) {
                obj[worksheetHeader[i]] = values[i]
                trimField(obj);
            }
            jsonRows.push(obj);
        });

        resolve(jsonRows);
    })

}

module.exports = {excelBufferToJson};