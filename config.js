// config.js

const CONFIG = {
    // NWS Alert Zone (from index.html)
    // Find your zone here: https://www.weather.gov/alerts
    nwsAlertZone: 'OHZ053',

    // Google Sheet URLs
    // Go to File > Share > Publish to web, select the sheet, choose CSV, and copy the link.
    maintenanceSheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0VotPZTFkALWoh6U6g6WnfqsVeltkkjCkd5CBVAHh60e-A63h5HdzaSVamSjkcxveTOfycKZ2K66r/pub?gid=1918136459&single=true&output=csv',
    scheduleSheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0VotPZTFkALWoh6U6g6WnfqsVeltkkjCkd5CBVAHh60e-A63h5HdzaSVamSjkcxveTOfycKZ2K66r/pub?gid=1149820120&single=true&output=csv',
    trainingSheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0VotPZTFkALWoh6U6g6WnfqsVeltkkjCkd5CBVAHh60e-A63h5HdzaSVamSjkcxveTOfycKZ2K66r/pub?gid=1034894331&single=true&output=csv',

    // Cache duration in minutes
    cacheDurationMinutes: 5,
};