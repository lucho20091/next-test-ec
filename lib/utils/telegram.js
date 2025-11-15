import TelegramBot from "node-telegram-bot-api";

const token = process.env.TELEGRAM_TOKEN;
const userId = process.env.TELEGRAM_ID;

if (!token) throw new Error("Missing TELEGRAM_TOKEN");

let bot;
if (!global.bot) {
  global.bot = new TelegramBot(token, { polling: false });
}
bot = global.bot;

export async function sendTelegramMessage(order) {
  if (!userId) return;

  const filtered = JSON.stringify(
    order,
    (key, value) => (key === "id" ? undefined : value),
    1
  );

  await bot.sendMessage(userId, filtered);
}
