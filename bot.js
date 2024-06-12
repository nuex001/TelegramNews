const { Telegraf } = require("telegraf");
const express = require("express");
const mongoose = require("mongoose");
const upload = require("express-fileupload");
require("dotenv").config();
const cors = require('cors');


// 
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
// Middleware to parse JSON requests
// connecting db
let dbURL = process.env.DBURL;
// initializing port
const PORT = process.env.PORT || 5000;
app.use(upload({ useTempFiles: true }));
app.use(express.json());
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// connecting the db

mongoose
  .connect(dbURL)
  .then((result) => {
    app.listen(PORT);
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const web_link = "https://tonsocail.netlify.app/sign/";
const bot_link = "https://t.me/raffle_fairbot";

bot.start((ctx) => {
  const referrerId = ctx.startPayload;
  const userId = ctx.from.id; // Get referrer's user ID
  const referralLink = `${web_link}?referrerId=${referrerId}`; // Corrected referral link
  const username = ctx.from.username ? `@${ctx.from.username}` : "there";
  // Send the initial message with inline keyboard
  ctx.reply(
    `Hey ${username}! It's Gamefi! 🌟 Your go-to app for crypto trading - all the cool coins and tokens, right in your pocket!📱\n\nNow we're rolling out our Telegram mini app! Start farming points now, and who knows what cool stuff you'll snag with them soon! 🚀\n\nGot friends? Bring 'em in! The more, the merrier! 🌱\n\nRemember: Gamefi is where growth thrives and endless opportunities Gamefi!`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Launch Gamefi",
              web_app: { url: referralLink },
            },
          ],
          [
            {
              text: "Join Community",
              url: "https://t.me/earnthroughnews",
            },
          ], // Replace with the actual link to your community
        ],
      },
    }
  );
});


bot.launch();

// ROUTES
app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/post"));
app.use("/api/task", require("./routes/task"));
