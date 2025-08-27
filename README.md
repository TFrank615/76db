# 76db - Harmony Township Dashboard

This project is a simple, browser-based dashboard designed for display screens in places like a fire station or community center. It rotates through several information panels, including maintenance status, EMS schedules, upcoming trainings, a weather radar, and a Google Slides presentation. It also includes an integrated National Weather Service (NWS) alert system.

---

## Features

- **Rotating Slides**: Automatically cycles through different content panes (`maintenance`, `schedule`, `trainings`, `weather`, etc.) at configurable intervals.
- **Google Sheets Integration**: Pulls live data from published Google Sheets for maintenance, schedules, and trainings.
- **NWS Alerts**: Fetches active weather alerts for a specific zone and displays them as a high-priority overlay with an audible tone.
- **Responsive Design**: Includes basic media queries for better viewing on smaller screens.
- **Easy Configuration**: All key settings, like API endpoints and Google Sheet URLs, are located in a central `config.js` file.

---

## 🚀 Setup

Because the dashboard fetches data from external sources (Google Sheets, NWS API), you cannot simply open the `index.html` file directly in your browser due to Cross-Origin Resource Sharing (CORS) security policies.

**You must run this project from a local web server.**

The easiest way to do this is using the **Live Server** extension in Visual Studio Code:
1.  Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
2.  Open the project folder in VS Code.
3.  Right-click on `index.html` in the file explorer and select "Open with Live Server".

---

## ⚙️ Configuration

All user-specific settings are in the `config.js` file.

-   **`nwsAlertZone`**: Set this to your specific NWS Public Forecast Zone. You can find your zone ID on the [NWS website](https://www.weather.gov/alerts).
-   **`maintenanceSheetUrl`, `scheduleSheetUrl`, `trainingSheetUrl`**: Replace the placeholder URLs with the URLs for your own published Google Sheets.
    -   To get the correct URL, in your Google Sheet, go to **File > Share > Publish to web**.
    -   Select the correct sheet/tab.
    -   Choose **Comma-separated values (.csv)** as the format.
    -   Click **Publish** and copy the generated link.
-   **`cacheDurationMinutes`**: Adjust how long data from Google Sheets is cached in the browser to reduce network requests.

### ❗ Important Data Note
In `trainings.html`, the code now looks for a column header named `Description`. If your Google Sheet for trainings still uses the typo `Discription`, please update the column header in the sheet itself to ensure data is displayed correctly.