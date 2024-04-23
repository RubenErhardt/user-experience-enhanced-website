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
    req.session.data = data; 
    res.render('Login', { data });
});

// Handle login form submission
app.post('/', async (req, res) => {
    // Handle login form submission logic if needed
    res.redirect('/'); // Redirect to the login page
});

app.listen(app.get('port'), () => {
    console.log(`Applicatie gestart op http://localhost:${app.get('port')}`);
});
