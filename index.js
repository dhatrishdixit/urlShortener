import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import Url from './models/urls.models.js';
import connectDB from './data/database.js';
import { config } from 'dotenv';
import os from 'os';

config({
    path:'./data/config.env',
});

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// Define a custom error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

const uniqueId = async (shortUrl) => {
    while (await Url.findOne({ shortUrl })) {
        shortUrl = await nanoid(5);
    }
    return shortUrl;
};

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is working',
    });
});

app.post('/', async (req, res, next) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const longUrl = req.body.longUrl;
        const url = await Url.findOne({ longUrl: longUrl });

        if (url) {
            return res.json({
                status: 'ok',
                message: 'URL already exists',
                url: `${baseUrl}/${url.shortUrl}`,
            });
        }

        const shortUrl = await nanoid(5);
        const unique = await uniqueId(shortUrl);
        await Url.create({
            longUrl: longUrl,
            shortUrl: unique,
        });

        res.json({
            status: 'ok',
            message: 'URL converted',
            url: `${baseUrl}/${unique}`,
        });
    } catch (err) {
        next(err); // Pass the error to the error handling middleware
    }
});

app.get('/all', async (req,res) =>{
    const url = await Url.find();
    res.json({
        status:200,
        url:url
    })
})


app.get('/:shortUrl', async (req, res, next) => {
    try {
        const shortUrl = req.params.shortUrl;
        const url = await Url.findOne({ shortUrl });

        if (url && url.longUrl) {
            url.count += 1;
            await url.save();
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json({
                status: 404,
                message: 'URL not found',
            });
        }
    } catch (err) {
        next(err); // Pass the error to the error handling middleware
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server is working on machine ${os.hostname()} in port ${process.env.PORT}`);
});
