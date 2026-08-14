const express = require("express");
const { model } = require("mongoose");
const URL = require('../models/urlmodel')
const connectToDb = require('../connectDb')
const {urlShortnerHandler, handleGetAnalytics, handleGenerateQr} = require('../controller/urlcontroller');


const router = express.Router();

router.post('/', urlShortnerHandler)
router.get('/analytics/:shortId', handleGetAnalytics)
router.get('/qr/:shortId', handleGenerateQr)
router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
   const entry = await URL.findOneAndUpdate({
        shortid: shortId
    }, {
        $push: {
            viewClickedHistory: {
                timestamps: Date.now(),
            },
        },
    }
    );

    if (!entry) return res.status(404).json({ message: "URL not found" });
    res.redirect(entry.redirectUrl)
})


module.exports = router;
