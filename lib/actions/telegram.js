"use server";

import { sendTelegramMessage } from "@/lib/utils/telegram";

export async function sendOrderToTelegram(order) {
  await sendTelegramMessage(order);
}
