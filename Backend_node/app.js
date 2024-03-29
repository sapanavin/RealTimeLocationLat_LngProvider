
const express = require('express');
const cors = require('cors'); // Import the cors package
const fs = require('fs');
const bodyParser = require('body-parser');
// Requiring module 
const xlsx = require('xlsx') 
  
const app = express();
const port = 3000;

// Define the CORS options
const corsOptions = {
  credentials: true,
  origin: ['*','http://localhost:3000', 'http://127.0.0.1:5500','http://localhost:5500'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions)); // Use the cors middleware with your options

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Initialize workbook and worksheet
let workbook;
let worksheet;
const filePath = 'data.xlsx';

// Load existing workbook or create new if doesn't exist
if (fs.existsSync(filePath)) {
    workbook = xlsx.readFile(filePath);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
} else {
    workbook = xlsx.utils.book_new();
    worksheet = xlsx.utils.aoa_to_sheet([['Count','TimeStamp', 'Time','Latitude', 'Longitude']]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
}

var count= 0;

// API endpoint to receive latitude and longitude data
app.post('/save-data', (req, res) => {
  // Initialize workbook and worksheet

  var { timestamp, lat, lng } = req.body;
  
  const timestamp1 = new Date(timestamp);
  const timeString = timestamp1.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
  //console.log(timeString);

  console.log("count, timestamp, lat, lng : ==> ",count++, timestamp1, timeString , lat, lng );
    lat=String(lat);
    lng=String(lng);
   xlsx.utils.sheet_add_aoa(worksheet, [[count, timestamp1, timeString, lat.toString(), lng.toString()]], { origin: -1 });

  // Write workbook to file
  xlsx.writeFile(workbook, 'data.xlsx');

  // Send response back to the HTML page
  res.status(200).send('Data saved successfully');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
