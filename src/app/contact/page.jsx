import React from "react";
import ContactSection from "@/components/contact/contactSection";
import Reviews from "@/components/contact/reviews";
export default function Contact() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-5 sm:px-6 md:px-margin-desktop pt-16 sm:pt-24 lg:pt-30 relative z-10">
        <ContactSection />
        <Reviews />
      </main>
    </>
  );
}
