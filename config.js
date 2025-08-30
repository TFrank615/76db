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
    statsSheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0VotPZTFkALWoh6U6g6WnfqsVeltkkjCkd5CBVAHh60e-A63h5HdzaSVamSjkcxveTOfycKZ2K66r/pub?gid=1511491703&single=true&output=csv',
    newsSheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0VotPZTFkALWoh6U6g6WnfqsVeltkkjCkd5CBVAHh60e-A63h5HdzaSVamSjkcxveTOfycKZ2K66r/pub?gid=1982591100&single=true&output=csv',

    // Cache duration in minutes for Google Sheet data
    cacheDurationMinutes: 5,

    // Weather settings for weather.html and weather_radar.html
    weatherConfig: {
        latitude: 39.95,        // Latitude for weather forecast and radar
        longitude: -83.6,       // Longitude for weather forecast and radar
        locationName: "South Vienna, OH", // Display name for the location
        radarZoom: 12.25,       // Default zoom level for the weather radar map
        refreshIntervalMinutes: 15 // How often to refresh weather data
    },
    
    // Column headers for the news feed (news.html)
    newsColumnHeaders: {
        title: 'Title',
        description: 'Description',
        publishedDate: 'Published Date',
        publishedBy: 'Published By',
        pinned: 'Pinned Message?'
    }
};

