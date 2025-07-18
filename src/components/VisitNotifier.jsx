import { useEffect } from "react";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1303151818834186301/ZsINLT_57jVsAISEBY7vhvRm-XgJ8P-wFAkBiQovhPgUQEhJWXbCh3hfN8NtNd91Lc4O";
const GEOLOCATION_API_URL = "https://ipapi.co/json/";

const getDeviceType = () => {
  if (navigator.userAgentData) {
    return navigator.userAgentData.mobile
      ? "📱 Mobile Device"
      : "💻 PC or Laptop";
  }

  const ua = navigator.userAgent;

  if (/iPad|iPhone|iPod/.test(ua)) return "🍎 iOS Device";
  if (/Android/.test(ua)) return "🤖 Android Device";
  if (/tablet|ipad/i.test(ua)) return "📱 Tablet";
  if (/mobile/i.test(ua)) return "📱 Phone";

  return "💻 PC or Laptop";
};

const VisitNotifier = () => {
  useEffect(() => {
    const sendNotification = async () => {
      try {
        const res = await fetch(GEOLOCATION_API_URL);
        const data = await res.json();

        const ip = data.query;
        const lastSentKey = `visit_sent_${ip}`;
        const lastSentTime = localStorage.getItem(lastSentKey);
        const now = Date.now();

        if (lastSentTime && now - parseInt(lastSentTime) < 3600000) {
          return;
        }

        const nowFormatted = new Date().toLocaleString("en-PH", {
          timeZone: "Asia/Manila",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        const deviceType = getDeviceType();

        const message = {
          content: `🟢 **New Visitor Alert**

**Date & Time:** ${nowFormatted}
**IP:** ${data.query}
**Country:** ${data.country}
**Region:** ${data.regionName}
**City:** ${data.city}
**ISP:** ${data.isp}
**Device:** ${deviceType}`,
        };

        await fetch(DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });

        localStorage.setItem(lastSentKey, now.toString());
      } catch (err) {}
    };

    sendNotification();
  }, []);

  return null;
};

export default VisitNotifier;
