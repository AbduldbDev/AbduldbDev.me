"use client";
import { useEffect } from "react";
import { db } from "@/firebase";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";

const DISCORD_WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

const getDeviceType = () => {
  if (typeof window === "undefined") return "Unknown";

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

const getBrowserInfo = () => {
  if (typeof window === "undefined") return "Unknown";

  const ua = navigator.userAgent;
  let browser = "Unknown";

  if (ua.includes("Firefox")) browser = "🦊 Firefox";
  else if (ua.includes("Edg")) browser = "🌐 Edge";
  else if (ua.includes("Chrome")) browser = "🌐 Chrome";
  else if (ua.includes("Safari")) browser = "🧭 Safari";
  else if (ua.includes("Opera")) browser = "🎭 Opera";

  return browser;
};

const VisitNotifier = () => {
  useEffect(() => {
    const sendNotification = async () => {
      try {
        let data = null;
        let source = "";

        // Try multiple geolocation services for best accuracy
        // 1. Try ipinfo.io (most accurate, 50k requests/month free)
        try {
          const res1 = await fetch("https://ipinfo.io/json");
          if (res1.ok) {
            const ipinfoData = await res1.json();
            // Convert ipinfo.io format to standard format
            const [lat, lng] = (ipinfoData.loc || "0,0").split(",");
            data = {
              ip: ipinfoData.ip,
              city: ipinfoData.city,
              region: ipinfoData.region,
              country_name: ipinfoData.country,
              country_code: ipinfoData.country,
              latitude: parseFloat(lat),
              longitude: parseFloat(lng),
              org: ipinfoData.org,
              postal: ipinfoData.postal,
              timezone: ipinfoData.timezone,
            };
            source = "ipinfo.io (High Accuracy)";
          }
        } catch (e) {}

        // 2. Fallback to ipapi.co
        if (!data) {
          try {
            const res2 = await fetch("https://ipapi.co/json/", {
              headers: { Accept: "application/json" },
            });
            if (res2.ok) {
              data = await res2.json();
              source = "ipapi.co (Medium Accuracy)";
            }
          } catch (e) {}
        }

        // 3. Final fallback to ip-api.com
        if (!data) {
          const res3 = await fetch("http://ip-api.com/json/");
          if (res3.ok) {
            const ipapiData = await res3.json();
            data = {
              ip: ipapiData.query,
              city: ipapiData.city,
              region: ipapiData.regionName,
              country_name: ipapiData.country,
              country_code: ipapiData.countryCode,
              latitude: ipapiData.lat,
              longitude: ipapiData.lon,
              org: ipapiData.isp,
              timezone: ipapiData.timezone,
            };
            source = "ip-api.com (Basic Accuracy)";
          }
        }

        if (!data) {
          throw new Error("All geolocation services failed");
        }

        const ip = data.ip;
        const lastSentKey = `visit_sent_${ip}`;
        const lastSentTime = localStorage.getItem(lastSentKey);
        const now = Date.now();

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
        const browser = getBrowserInfo();

        const message = {
          content: `🟢 **New Portfolio Visitor**`,
          embeds: [
            {
              color: 0xadc6ff,
              fields: [
                {
                  name: "⏰ Date & Time",
                  value: nowFormatted,
                  inline: false,
                },
                {
                  name: "🌍 Location",
                  value: `${data.city}, ${data.region}, ${data.country_name} (${data.country_code})${data.postal ? ` • ${data.postal}` : ""}`,
                  inline: false,
                },
                {
                  name: "🌐 Network",
                  value: `**IP:** ${data.ip}\n**ISP:** ${data.org || "Unknown"}`,
                  inline: false,
                },
                {
                  name: "💻 Device Info",
                  value: `${deviceType}\n${browser}`,
                  inline: true,
                },
                {
                  name: "🗺️ Coordinates",
                  value: `[${data.latitude}, ${data.longitude}](https://www.google.com/maps?q=${data.latitude},${data.longitude})`,
                  inline: true,
                },
              ],
              footer: {
                text: `${source} • Click coordinates to view on map`,
                icon_url:
                  "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              },
              timestamp: new Date().toISOString(),
            },
          ],
        };

        // Send Discord notification
        if (DISCORD_WEBHOOK_URL) {
          await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
          });
        }

        // Increment visit count in Firestore
        const analyticsRef = doc(db, "analytics", "visits");
        const analyticsDoc = await getDoc(analyticsRef);

        if (analyticsDoc.exists()) {
          // Document exists, increment the count
          await setDoc(
            analyticsRef,
            {
              count: increment(1),
              lastVisit: new Date().toISOString(),
              lastVisitorInfo: {
                ip: data.ip,
                city: data.city,
                country: data.country_name,
                timestamp: new Date().toISOString(),
              },
            },
            { merge: true },
          );
        } else {
          // Document doesn't exist, create it with initial count
          await setDoc(analyticsRef, {
            count: 1,
            createdAt: new Date().toISOString(),
            lastVisit: new Date().toISOString(),
            lastVisitorInfo: {
              ip: data.ip,
              city: data.city,
              country: data.country_name,
              timestamp: new Date().toISOString(),
            },
          });
        }
      } catch (err) {}
    };

    // Send notification after a short delay to ensure page is loaded
    const timer = setTimeout(() => {
      sendNotification();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default VisitNotifier;
