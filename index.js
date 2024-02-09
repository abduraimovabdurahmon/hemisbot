const dotevn = require('dotenv');
dotevn.config();
const { Telegraf, session, Scenes: { Stage } } = require('telegraf');
const cron = require('node-cron');


const bot = new Telegraf(process.env.BOT_TOKEN);


const stage = new Stage(require("./stage"));

// session middleware
bot.use(session());
bot.use((ctx, next) => {
    ctx.session = ctx.session || {};
    next();
});
// stage middleware
bot.use(stage.middleware());


bot.command("set", async (ctx) => {
    try {
        ctx.scene.enter("set");
    } catch (error) {
        console.log(error);
    }
});


// bot.on("channel_post", async (ctx) => {
//     try {
//         console.log(ctx.chat.id);
//     }
//     catch (error) {
//         console.log(error);
//     }
// });


// -1002115515430


// bot.telegram.sendMessage(-1002115515430, "Hello world");

// 0 8 * * *



cron.schedule('* * * * *', async () => {
    try {

        const data = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'data.json'), 'utf-8'));


        const day = new Date().getDay();

        const { kun, fanlar } = data[day-1];

        if (!kun || !fanlar) {
            return;
        }

        const message = `<b>${kun}</b>\n\n${fanlar.map(fan => `<b>📒${fan?.nomi}</b>\n🏢<b>Xona:</b> ${fan?.xona}\n📚<b>Turi:</b> ${fan?.turi}\n👨‍🏫<b>Domla:</b> ${fan?.domla}\n🕒<b>Soat:</b> ${fan?.soat}\n------------------`).join("\n")}`
        await bot.telegram.sendMessage(-1002115515430, message, { parse_mode: "HTML" });
    }
    catch (error) {
        console.log(error);
    }
}, {
    scheduled: true,
    timezone: "Asia/Tashkent"
});


console.log("Bot is running");
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))


