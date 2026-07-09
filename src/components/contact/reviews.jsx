"use client";
import React from "react";
import { fetchReviews } from "@/data/reviews";
import { useState, useEffect } from "react";
import ReviewCard from "../cards/ReviewCard";

export default function reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews()
      .then((data) => setReviews(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mb-10 sm:mb-16 mt-16 sm:mt-30">
      <div
        data-aos="fade-up"
        className="flex items-end justify-between mb-8 sm:mb-12"
      >
        <div>
          <h2 className="font-headline-sm text-headline-sm-xs sm:text-headline-sm text-text-primary">
            Client Reviews
          </h2>
          <p className="text-text-muted mt-1 sm:mt-2 text-sm sm:text-base">
            High-performance engineering validated by industry leaders and
            visionaries.
          </p>
        </div>
        <div className="h-px grow mx-8 bg-border-hairline mb-4 hidden md:block" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map((data, index) => (
          <ReviewCard key={index} data={data} index={index} />
        ))}
      </div>
    </section>
  );
}
