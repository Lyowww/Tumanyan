const nodemailer = require('nodemailer');
const cors = require('cors');

const POEMS = [
  {
    title: "ՄԵՐ ՈՒԽՏԸ",
    content: `Մենք ուխտ ունենք՝ միշտ դեպի լույս, <br> 
Ու գնում ենք մեր ճամփով,  <br>
Մրրիկներով պատած անհույս,  <br>
Սև խավարով, մութ ամպով։  <br>
<br>
Մենք անցել ենք արյան ծովեր,  <br>
Սուր ենք տեսել ու կրակ,  <br>
Մեր ճակատը դեմ ենք արել  <br>
Մրրիկներին հակառակ։  <br>
<br>
Ու թեպետև պատառ-պատառ  <br>
Մեր դրոշը սրբազան,  <br>
Ու մենք չունենք տեղ ու դադար՝  <br>
Երկրից երկիր ցիրուցան։  <br>
<br>
Բայց գնում ենք մենք անվեհեր  <br>
Զարկերի տակ չար բախտի,  <br>
Մեր աչքերը միշտ դեպի վեր՝  <br>
Դեպի լույսը մեր ուխտի։`
  },
  {
    title: "ՀԱՅՈՑ ԼԵՌՆԵՐՈՒՄ",
    content: `Մեր ճամփեն խավար, մեր ճամփեն գիշեր,<br>  
Ու մենք անհատնում  <br>
էն անլույս մթնում  <br>
Երկա՜ր դարերով գնում ենք դեպ վեր  <br>
Հայոց լեռներում,  <br>
Դժար լեռներում։  <br>
<br>
Տանում ենք հնուց մեր գանձերն անգին,  <br>
Մեր գանձերը ծով,  <br>
Ինչ որ դարերով  <br>
Երկնել է, ծնել մեր խորունկ հոգին  <br>
Հայոց լեռներում,  <br>
Բարձր լեռներում։  <br>
<br>
Բայց քանի անգամ շեկ անապատի  <br>
Օրդուները սև  <br>
Իրարու հետև  <br>
Եկա՜ն զարկեցին մեր քարվանն ազնիվ  <br>
Հայոց լեռներում,  <br>
Արնոտ լեռներում։`
  },
  {
    title: "ՀՐԱԺԵՇՏ",
    content: `Այստեղ ահա կըբաժանվենք.  <br>
Մնաս բարյավ, սիրելի.  <br>
Այսպես ես չեմ ցավել երբեք  <br>
Դառնությունով սիրտս լի։  <br>
<br>
Այստեղ ահա քեզ թողնում եմ  <br>
Եվ չգիտեմ, ուր կերթաս.  <br>
Կասկածներից ես դողում եմ...  <br>
Թող պահպանե քեզ աստված։  <br>
<br>
Ա՛խ, առանց քեզ տխուր կյանքիս,  <br>
Օրը տարի կդառնա,  <br>
Բայց ուր լինիս, դարձյալ հոգիս  <br>
Շուրջդ պիտի թրթռա։`
  },
  {
    title: "ԻՄ ՍԵՐԸ",
    content: `Ես սիրել եմ վարդը տժգույն  <br>
Սիրուց տանջված այտերի,  <br>
Մելամաղձոտ խաղաղություն  <br>
Զույգ սևորակ աչքերի։  <br>
<br>
Ես պահել եմ սրտիս խորքում  <br>
Մի լուռ գաղտնիք սիրային,  <br>
Եվ այն երբե՜ք, ոչ մի երգում  <br>
Հայտնելու չեմ աշխարհին։`
  },
  {
    title: "ԳԱՐՆԱՆ ՀԻՇՈՂՈՒԹՅՈՒՆ",
    content: `Մի՞տդ է գալիս մեր քեֆն, ընկեր,<br>
Այն ճյուղալի ծառի տակին,  <br>
Երբ գնացինք դիմավորել  <br>
Նոր գարունքին ու նոր կյանքին։  <br>
<br>
Այն լավ օրից տարիք անցած,  <br>
Ես այն ճամփով անցնում էի,  <br>
Եվ ականջիս դիպավ հանկարծ  <br>
Մեր աղմուկը ուրախալի...`
  }
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
