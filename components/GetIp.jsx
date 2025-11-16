"use client";
import { useEffect } from "react";
import { sendMessageToTelegram } from "@/lib/actions/telegram";
export default function GetIp() {
  const getIp = async () => {
    try {
      const ip = await fetch("/api/get-ip").then((r) => r.text());
      sendMessageToTelegram({ site: "ecommerce-techstore.vercel.app", ip });
    } catch (e) {
      sendMessageToTelegram({ message: "failed to get ip" });
    }
  };

  useEffect(() => {
    getIp();
  }, []);

  return null;
}
