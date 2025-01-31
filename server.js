const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Webhook endpoint for DigiSigner
app.post('/webhook/digisigner', (req, res) => {
    const eventData = req.body;

    console.log('📩 Received DigiSigner Webhook:', JSON.stringify(eventData, null, 2));

    // Handle different event types
    if (eventData.event_type === "SIGNATURE_REQUEST_COMPLETED") {
        console.log(`✅ Signature request ${eventData.signature_request.signature_request_id} is completed.`);
    } else if (eventData.event_type === "DOCUMENT_SIGNED") {
        console.log(`🖊️ Document ${eventData.document_id} signed by ${eventData.signer_email}`);
    } else {
        console.log(`⚠️ Unknown event type: ${eventData.event_type}`);
    }

    // DigiSigner expects this exact response
    res.status(200).send('DIGISIGNER_EVENT_ACCEPTED');
});

// Health Check (to keep Render service awake)
app.get('/', (req, res) => {
    res.status(200).send('DigiSigner Webhook is running.');
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 DigiSigner Webhook listening at https://digisigner-webhook.onrender.com`);
});
