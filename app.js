const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home', { response: null, url: '' });
});

app.post('/', async (req, res) => {
    const action = req.body.action;
    let response = null;
    let url = '';
    if (action === 'clear') {
        // Clear the form
        response = null;
        url = '';
    } else {
        url = req.body.url;
        try {
            const r = await axios.get(url, { timeout: 5000 });
            response = r.data;
        } catch (e) {
            response = `Error: ${e.message}`;
        }
    }
    res.render('home', { response, url });
});

app.get('/about', (req, res) => {
    res.render('about');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});