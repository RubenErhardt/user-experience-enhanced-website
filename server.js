import express from 'express';
import fetchJson from './helpers/fetch-json.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('port', process.env.PORT || 8000);

// Render login page
app.get('/', async (req, res) => {
    const apiUrl = 'https://fdnd-agency.directus.app/items/hf_sdgs';
    const response = await fetchJson(apiUrl);
    const data = response.data || [];
    res.render('Login', { data });
});

// Handle login form submission
app.get('/', async (req, res) => {
    // Handle login form submission logic if needed
    res.redirect('/'); // Redirect to the login page
});

// Render stakeholder page
app.get('/Stakeholder-SDG', async (req, res) => {
    const stakeholderApiUrl = 'https://fdnd-agency.directus.app/items/hf_stakeholders';
    const sdgsApiUrl = 'https://fdnd-agency.directus.app/items/hf_sdgs';
    const apiUrl = 'https://fdnd-agency.directus.app/items/hf_sdgs';
    const response = await fetchJson(apiUrl);
    const data = response.data || [];

    // Make API requests concurrently
    const [stakeholdersResponse, sdgsResponse] = await Promise.all([
        fetchJson(stakeholderApiUrl),
        fetchJson(sdgsApiUrl)
    ]);

    // Extract data from responses
    const stakeholdersData = stakeholdersResponse.data || [];
    const sdgsData = sdgsResponse.data || [];

    res.render('Stakeholder-SDG', { stakeholdersData, sdgsData, data });
});

// Handle questionnaire page GET request
app.get('/vragenlijst', async (req, res) => {
    const apiUrl = 'https://fdnd-agency.directus.app/items/hf_sdgs';
    const response = await fetchJson(apiUrl);
    const data = response.data || [];
    res.render('vragenlijst', { data });
});

// Render questionnaire page
app.post('/vragenlijst', async (req, res) => {
    res.redirect('/vragenlijst'); // Redirect to the questionnaire page
});



app.listen(app.get('port'), () => {
    console.log(`Applicatie gestart op http://localhost:${app.get('port')}`);
});
