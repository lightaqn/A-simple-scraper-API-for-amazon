const express = require('express');
const request = require('request-promise');
const app = express();
const PORT = process.env.PORT || 7000

const baseUrl = "scraperapi.com&autoparse=true"
const apiKey = "3ed7bb21d62269f85106ab31e2f25f57"

app.use(express.json())

app.get('/', (req, res) => {res.send('Welcome to API')})

const generateScaperApiUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// INTRO ROUTE
app.get('/', async (req, res) => {
    res.send('Welcome to my App!')
})


// GET PRODUCT DETAILS

app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params
    const { api_key } = req.query

    try {
        const response = await request(`${generateScraperApiUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {res.json(error)
        
    }
})

// GET PRODUCT REVIEWS

app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params
    const { api_key } = req.query

    try {
        const response = await request(`${generateScraperApiUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {res.json(error)
        
    }
})

// GET PRODUCT OFFERS

app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params
    const { api_key } = req.query

    try {
        const response = await request(`${generateScraperApiUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {res.json(error)
        
    }
})

// GET SEARCH RESULT

app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query

    try {
        const response = await request(`${generateScraperApiUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        res.json(JSON.parse(response))
    } catch (error) {res.json(error)
        
    }
})

app.listen('PORT', () => console.log(`Server running on PORT: ${PORT}`))