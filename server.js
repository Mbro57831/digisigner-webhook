const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Webhook endpoint to receive DigiSigner callbacks
app.post('/webhook/digisigner', (req, res) => {
    const eventData = req.body;

    // Log received webhook event
    console.log('Received DigiSigner Webhook:', JSON.stringify(eventData, null, 2));

    // Check event type
    if (eventData.event_type === "SIGNATURE_REQUEST_COMPLETED") {
        console.log(`Signature request ${eventData.signature_request.signature_request_id} is completed.`);
    } else if (eventData.event_type === "DOCUMENT_SIGNED") {
        console.log(`Document ${eventData.document_id} signed by ${eventData.signer_email}`);
    } else {
        console.log(`Unknown event type: ${eventData.event_type}`);
    }

    // Respond with the required confirmation message
    res.status(200).send('DIGISIGNER_EVENT_ACCEPTED');
});

// Start the server
app.listen(port, () => {
    console.log(`DigiSigner Webhook server running on http://localhost:${port}`);
});
