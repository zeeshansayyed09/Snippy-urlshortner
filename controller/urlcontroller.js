const { model } = require('mongoose');
const URL = require('../models/urlmodel')
const { nanoid } = require('nanoid')
const QRCode = require('qrcode')


const urlShortnerHandler = async function handler(req, res) {
    const body = req.body
    if (!body || !body.url) {
        return res.status(400).json({
            message: "Url required!"
        });

    }
    const nanoId = nanoid(9)

    await URL.create({
        shortid: nanoId,
        redirectUrl: body.url,
        viewClickedHistory: [],
        createdBy: req.user._id,
    })

    const allurls = await URL.find({ createdBy: req.user._id });

    res.render("home", {
        id: nanoId,
        urls: allurls,
        userName: req.user.name,
        host: `${req.protocol}://${req.get('host')}`,
    });


};

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortid: shortId });

    if (!result) {
        return res.status(404).json({ message: "URL not found" });
    }

    return res.json({
        totalClicks: result.viewClickedHistory.length,
        analytics: result.viewClickedHistory,
    });
}

async function handleGenerateQr(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortid: shortId });

    // console.log("Entry: " ,entry);
    

    if (!entry) return res.status(404).json({ message: "URL not found" });

    const fullShortUrl = `${req.protocol}://${req.get('host')}/url/${shortId}`;

    try {
        const qrBuffer = await QRCode.toBuffer(fullShortUrl, {
            type: 'png',
            width: 260,
            margin: 1,
            color: {
                dark: '#1e1b4b',
                light: '#ffffff',
            },
        });

        res.set('Content-Type', 'image/png');
        return res.send(qrBuffer);
    } catch (err) {
        return res.status(500).json({ message: "Could not generate QR code" });
    }
}

module.exports = { urlShortnerHandler, handleGetAnalytics, handleGenerateQr }
