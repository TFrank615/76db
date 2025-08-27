// common.js

/**
 * A robust CSV parser that handles quoted fields containing commas.
 * @param {string} csvText - The raw CSV text to parse.
 * @returns {Array<Object>} An array of objects representing the rows.
 */
function parseCSV(csvText) {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const rows = [];
    // Regex to handle values that are quoted (and may contain commas) or unquoted.
    const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue; // Skip empty lines
        const values = lines[i].match(regex) || [];
        const rowObject = {};
        headers.forEach((header, index) => {
            let value = values[index] ? values[index].trim() : '';
            // If the value is quoted, remove the outer quotes and un-escape double quotes
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.substring(1, value.length - 1).replace(/""/g, '"');
            }
            rowObject[header] = value;
        });
        rows.push(rowObject);
    }
    return rows;
}

/**
 * A general-purpose function to fetch and cache data from a Google Sheet.
 * @param {string} sheetUrl - The URL of the Google Sheet CSV.
 * @param {string} cacheKey - A unique key for localStorage ('maintenanceData', 'scheduleData', etc.).
 * @param {function} displayFunction - The function to call to render the data, which will receive the data as its argument.
 * @param {number} colCount - The number of columns in the table for displaying error/loading messages.
 */
async function loadSheetData(sheetUrl, cacheKey, displayFunction, colCount = 5) {
    const tableBody = document.getElementById('table-body');
    const CACHE_DURATION_MS = (CONFIG.cacheDurationMinutes || 5) * 60 * 1000;

    // --- Caching Logic: Try to load from cache first ---
    try {
        const cachedData = JSON.parse(localStorage.getItem(cacheKey));
        const cacheTime = localStorage.getItem(`${cacheKey}Timestamp`);
        if (cachedData && cacheTime) {
            const isCacheFresh = (new Date().getTime() - cacheTime) < CACHE_DURATION_MS;
            if (isCacheFresh) {
                console.log(`Loading ${cacheKey} from cache.`);
                displayFunction(cachedData);
                return;
            }
        }
    } catch (e) {
        console.error("Could not read from cache", e);
    }

    // --- Configuration Check ---
    if (!sheetUrl || sheetUrl.includes('PASTE_YOUR_')) {
        tableBody.innerHTML = `
            <tr class="bg-yellow-900/50 !flex">
                <td colspan="${colCount}" class="text-center p-12 text-yellow-200 rounded-lg w-full">
                    <strong>Configuration Needed:</strong> Please set your Google Sheet URL in <strong>config.js</strong>.
                </td>
            </tr>`;
        return;
    }

    try {
        // Show a loading indicator
        tableBody.innerHTML = `<tr class="bg-gray-700 !flex"><td colspan="${colCount}" class="text-center p-12 text-gray-400 rounded-lg w-full"><div class="flex justify-center items-center space-x-2"><svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Loading fresh data...</span></div></td></tr>`;
        
        console.log(`Fetching fresh data for ${cacheKey}.`);
        const response = await fetch(sheetUrl, { cache: 'no-cache' });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}. Check if the Google Sheet link is correct and published.`);
        }
        const csvText = await response.text();
        if (!csvText || csvText.trim().startsWith('<')) {
             throw new Error('Fetched data is not valid CSV. The Google Sheet URL might be incorrect or require login.');
        }

        const data = parseCSV(csvText);

        // Cache the fresh data
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(`${cacheKey}Timestamp`, new Date().getTime());

        displayFunction(data);

    } catch (error) {
        console.error('Error fetching or processing data:', error);
        let errorMessage = `<strong>Error:</strong> Could not load data.`;
        if (error.message.includes('Failed to fetch')) {
            errorMessage += `<br><br>This is a browser security (CORS) error.`;
            errorMessage += `<br><br><strong>Solution:</strong> You must run this project using a local web server (like VS Code's "Live Server" extension).`;
        } else {
            errorMessage += `<br><br>${error.message}`;
        }
        tableBody.innerHTML = `
            <tr class="bg-red-900/50 !flex">
                <td colspan="${colCount}" class="text-left p-6 text-red-200 rounded-lg w-full">${errorMessage}</td>
            </tr>`;
    }
}