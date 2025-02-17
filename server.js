const nodemailer = require('nodemailer');
const fs = require('fs');
const cors = require('cors');

const POEMS = [
    {
        title: "Առաջին ձյունը",
        text: `– Վա՜յ, մայրիկ ջան, տե՛ս՝<br>Բակն ու դուռը լի<br>Ինչքա՜ն սպիտակ<br>Թիթեռ է գալիս…<br>Այսքան շատ թիթեռ<br>Չեմ տեսել ես դեռ։<br>– Չէ, ի՛մ անուշիկ,<br>Թիթեռներ չեն էդ,<br>Թիթեռներն անցան<br>Ծաղիկների հետ։<br>Էդ ձյունն է գալիս,<br>Փաթիլն է ձյունի,<br>Որ կարծես սպիտակ<br>Թիթեռնիկ լինի։`
    },
    {
        title: "Ծաղիկները",
        text: `– Ո՞ւր գնացին ծաղիկները…<br>– Սո՛ւս, քնած են հողի տակ,<br>Տաք ծածկված ողջ ձմեռը<br>Ձյուն ծածկոցով սպիտակ։<br>Կգա գարնան արևն էլ հետ<br>Իր շողերով կենդանի,<br>Ձմռան սաստիկ ցրտերի հետ<br>Ձյուն ծածկոցը կտանի։<br>«Ելե՛ք, – կասի, – ի՛մ մանուկներ», –<br>Ու երբ նրանք իմանան,<br>Դուրս կհանեն գլխիկները,<br>Աչիկները կբանան։`
    },
    {
        title: "Մի բաց նամակ ամենքին",
        text: `Դաշտ ու անտար, գյուղի ճամփան<br>Ծածկվել են մի թիզ ձյունով,<br>Էլ չի ճարվում ուտելու բան,<br>Ո՞վ էր տեսել էս տեսակ սով։<br>Ոչ մի ցորեն, ոչ մի հատիկ…<br>Խնդրում ենք ձեզ, բարի՛ մարդիկ,<br>Աստծու սիրուն, մի կտոր հաց,<br>Կոտորվեցինք, մեռանք սոված։`
    },
    {
        title: "Շուտով կգան օրեր գարնան",
        text: `Շուտով կգան օրեր գարնան,<br>Մենք ձեզ համար կերգենք զվարթ<br>Ու փոխարեն ձեր լավության՝<br>Ձեր պարտեզը, այգին ու արտ<br>Կմաքրենք մենք թրթուրներից,<br>Ճիճուներից ու որդերից,<br>Միայն հիմի մի կտոր հաց,<br>Կոտորվեցինք, մեռանք սոված։`
    },
    {
        title: "Մարտ",
        text: `Ա՜խ, էսպես էլ գիժ ամիս,<br>Մարդու հանգիստ չի տալիս։<br>Էսօր ուրախ օր կանի,<br>Վաղը՝ անձրև ու քամի,<br>Առավոտը՝ պայծառ օդ,<br>Կեսօրը՝ մութ ու ամպոտ։<br>Մին հագնում է սպիտակ,<br>Մին կանաչին է տալիս,<br>Մի օր ցուրտ է, մի օր՝ տաք,<br>Մին խնդում է, մին՝ լալիս…<br>Ա՜խ էսպես էլ գիժ ամիս։`
    },
    {
        title: "Աշուն",
        text: `Դեղնած դաշտերին<br>Իջել է աշուն<br>Անտառը կրկին<br>Ներկել է նածշուն։<br>Պաղ-պաղ մեգի հետ<br>Փչում է քամին,<br>Քշում է տանում<br>Տերևը դեղին։<br>Տխուր հանդերից<br>Մարդ ու անասուն<br>Քաշվում են կամաց<br>Իրենց տունն ու բույն։`
    },
    {
        title: "Տերևաթափ",
        text: `– Այ փոքրիկներ, այ սիրուններ, –<br>Ասավ քամին տերևներին, –<br>Աշուն եկավ, մոտ է ձմեռ,<br>Ի՞նչ եք դողում ծառի ծերին։<br>Ոսկի, դեղին, վառ ծիրանի<br>Գույներ հագեք խայտաբղետ<br>Ու ճյուղերից ձեր մայրենի<br>Եկեք ինձ հետ, փախեք ինձ հետ…<br>Տերևները հենց լսեցին,<br>Նախշուն-նախշուն գույներ հագան,<br>Սվսվալով տխուր երգեր՝<br>Քամու թևին թռան, փախան։`
    },
    {
        title: "Գրիչ",
        text: `Ի՞նչ կլինի, ասա՛, գրի՛չ,<br>Ինձ էլ սիրես գոնե մի chút։<br>Ինչո՞ւ իմ մեծ քրոջ ձեռքին<br>Գրում ես միշտ վարժ ու կարգին,<br>Իսկ իմ ձեռքին խազմզում ես<br>Սև ագռավի ճանկերի պես։<br>Ես քեզ վատ բան ի՞նչ եմ արել։<br>Է՛կ, խնդրում եմ, ինձ համար էլ<br>Գրիր էդպես արագ-արագ,<br>Էդպես ուղիղ, սիրուն, բարակ։<br>Գրիչը լուռ լսում-լսում,<br>Ճռճռում է ու խազմզում,<br>Բայց այս անգամ արդեն կարծես<br>Փոքրիկ ծտի ճանկերի պես։`
    }
];

function sendEmail(email, poem) {
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
        html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Book Gift Day</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    .email-header {
                        background-color: #5f6368;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                    }
                    .email-body {
                        padding: 20px;
                        color: #333333;
                    }
                    .email-footer {
                        background-color: #eeeeee;
                        padding: 10px;
                        text-align: center;
                        font-size: 12px;
                        color: #777777;
                    }
                    h2 {
                        color: #2c3e50;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                    }
                    .cta-button {
                        background-color: #3498db;
                        color: white;
                        padding: 10px 15px;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-header">
                        <h1>Գիրք նվիրելու տոնի առթիվ</h1>
                    </div>
                    <div class="email-body">
                        <h2>${poem.title}</h2>
                        <p>${poem.text}</p>
                        <p>Շնորհակալ եմ քեզ իմ բանաստեղծությունը կարդալու համար:</p>
                        <p>Սիրով,<br>Ամենայն հայոց բանաստեղծ՝ Հովհաննես Թումանյան</p>
                    </div>
                </div>
            </body>
            </html>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
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

    let email, hobbies, color;
    try {
        const { email: requestEmail, answers } = req.body;
        email = requestEmail;
        hobbies = answers.hobbies;
        color = answers.color;
    } catch (error) {
        return res.status(400).json({ error: 'Invalid request format' });
    }

    if (!email || !email.endsWith('@edu.ysu.am')) {
        return res.status(400).json({ error: 'Only YSU emails are allowed' });
    }

    const poem = POEMS[Math.floor(Math.random() * POEMS.length)];

    sendEmail(email, poem);

    res.status(200).json({ message: 'Poem has been sent to your email!' });
};
