"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-out",
      once: false,
      offset: 20,
      delay: 0,
      mirror: false,
      anchorPlacement: "top-bottom",
    });

    AOS.refresh();
  }, []);

  return null;
}
