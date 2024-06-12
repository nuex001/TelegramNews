const { Telegraf } = require("telegraf");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

const web_link = "https://b833-197-210-55-209.ngrok-free.app";
const bot_link = "https://t.me/raffle_fairbot";

bot.start((ctx) => {
  const referrerId = ctx.startPayload;
  const userId = ctx.from.id; // Get referrer's user ID
  const referralLink = `${web_link}?referrerId=${referrerId}`; // Corrected referral link
  const username = ctx.from.username ? `@${ctx.from.username}` : "there";
  // Send the initial message with inline keyboard
  ctx.reply(
    `Hey ${username}! It's Gamefi! 🌟 Your go-to app for crypto trading - all the cool coins and tokens, right in your pocket!📱\n\nNow we're rolling out our Telegram mini app! Start farming points now, and who knows what cool stuff you'll snag with them soon! 🚀\n\nGot friends? Bring 'em in! The more, the merrier! 🌱\n\nRemember: Gamefi is where growth thrives and endless opportunities Gamefi! 🌼\n\nShare this link with your friends: ${bot_link}?start=${userId}`,
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
              url: "https://t.me/InvigorateDAO_Official",
            },
          ], // Replace with the actual link to your community
        ],
      },
    }
  );
});

bot.launch();
