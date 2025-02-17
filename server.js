const nodemailer = require('nodemailer');
const cors = require('cors');

const POEMS = [
    { title: "Առաջին ձյունը", text: "– Վա՜յ, մայրիկ ջան, ..." },
    { title: "Ծաղիկները", text: "– Ո՞ւր գնացին ծաղիկները…" },
    { title: "Մի բաց նամակ ամենքին", text: "Դաշտ ու անտար, գյուղի ճամփան..." },
    { title: "Շուտով կգան օրեր գարնան", text: "Շուտով կգան օրեր գարնան..." },
    { title: "Մարտ", text: "Ա՜խ, էսպես էլ գիժ ամիս..." },
    { title: "Աշուն", text: "Դեղնած դաշտերին..." },
    { title: "Տերևաթափ", text: "– Այ փոքրիկներ, այ սիրուններ, –..." },
    { title: "Գրիչ", text: "Ի՞նչ կլինի, ասա՛, գրի՛չ..." }
];

function sendEmail(email, poem, res) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amenayn.banastexc@gmail.com',
            pass: 'arbu uaoh hgle qqks'
        }
    });

    const mailOptions = {
        from: '"Գիրք նվիրելու տոնի առթիվ" <no-reply@yourdomain.com>',
        to: email,
        subject: 'Սիրով Թումանյանից',
        html: `<html><body>
                <h2>${poem.title}</h2>
                <p>${poem.text}</p>
                <p>Շնորհակալ եմ քեզ իմ բանաստեղծությունը կարդալու համար:</p>
                <p>Սիրով,<br>Ամենայն հայոց բանաստեղծ՝ Հովհաննես Թումանյան</p>
              </body></html>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).json({ message: 'Poem has been sent to your email!' });
        }
    });
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { email, answers } = req.body;
        if (!email || !email.endsWith('@edu.ysu.am')) {
            return res.status(400).json({ error: 'Only YSU emails are allowed' });
        }

        const poem = POEMS[Math.floor(Math.random() * POEMS.length)];
        sendEmail(email, poem, res);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid request format' });
    }
};
