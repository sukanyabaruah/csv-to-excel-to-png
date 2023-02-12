const ObjectsToCsv = require('objects-to-csv');
const { parse } = require("csv")
const CSV = require('csv-parser')
const csv = require("csv")
const ChartJsImage = require('chartjs-to-image');
const XLSX = require("xlsx");
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');
const { convertCsvToXlsx } = require('@aternus/csv-to-xlsx'); //conversion from csv to excel
const { dirname } = require('path');

const app = express();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploaded');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: fileStorageEngine });

app.post('/single', upload.single("file"), (req, res) => {
    console.log(req.file);

    var parser = parse({ columns: true }, function (err, records) {
        var newData = { new: records };
        var notEmptyRecord = newData.new.filter(x => x.Gender !== '');

        // let serial_No = 1;
        // notEmptyRecord.forEach(d => {
        //     d['serial_No'] = serial_No;
        //     serial_No += 1;
        // });
       
        
        const csv = new ObjectsToCsv(notEmptyRecord);
        // Save to file:
        csv.toDisk('./uploads/test.csv');

    });

    fs.createReadStream(req.file.path).pipe(parser)

    // Convert CSV to Excel

    // Specifying source directory + file name
    let source = path.join(__dirname, 'uploads\\test.csv');

    // Specifying destination directory + file name
    let destination = path.join(__dirname, 'uploads\\converted_report.xlsx');


    // try-catch block for handling exceptions
    try {

        // Functions to convert csv to excel
        convertCsvToXlsx(source, destination);
    } catch (e) {

        // Handling error
        console.error(e.toString());
    }

    //Calculate female and male gender

    const arr = [];
    const file = XLSX.readFile('./uploads/converted_report.xlsx');
    const sheets = file.SheetNames

    for (let i = 0; i < sheets.length; i++) {
        const temp = XLSX.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            arr.push(res)
        })
    }

    var data = { records: arr };

    //console.log(data);

    var femaleCount = data.records.filter(x => x.Gender == 'Female').length
    var maleCount = data.records.filter(x => x.Gender == 'Male').length

    //console.log(femaleCount);

    //Convert excel to png

    const myChart = new ChartJsImage();
    myChart.setConfig({
        type: 'pie',
        data: { labels: ['Men', 'Female'], datasets: [{ label: 'Gender', data: [maleCount, femaleCount] }] },
    });
    myChart.toFile('./uploads/mychart.png');

    // console.log(myChart.getUrl());

    res.send('single file upload success');

})



app.listen(5000);
