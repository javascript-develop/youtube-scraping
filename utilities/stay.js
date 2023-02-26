const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");

const app = express();
app.use(bodyParser.json());

// Set up SendGrid API key
sgMail.setApiKey("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");

// The email address to which you want to receive notifications
const notificationEmail = "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";

// POST endpoint for subscribing to the newsletter
app.post("/api/subscribe", (req, res) => {
    const { email } = req.body;

    // Send confirmation email to the user
    const message = {
        to: email,
        from: "rubelrana019914@gmail.com",
        subject: "Thanks for subscribing!",
        text: "Thanks for subscribing to our newsletter!",
        html: "<p>Thanks for subscribing to our newsletter!</p>",
    };

    // Send notification email to the notification email address
    const notificationMessage = {
        to: notificationEmail,
        from: "rubelrana019914@gmail.com",
        subject: "New subscriber!",
        text: `A new user with email address ${email} has subscribed to your newsletter.`,
        html: `<p>A new user with email address ${email} has subscribed to your newsletter.</p>`,
    };

    // Send both emails using the same instance of sgMail
    sgMail
        .send([message, notificationMessage])
        .then(() => {
            res.status(200).send("Email sent");
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error sending email");
        });
});

// Start the server
app.listen(3001, () => {
    console.log("Server listening on port 3001");
});
