"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig,
  );
  return (
    <div
      ref={ref}
      className="h-[200vh] sm:h-[300vh] py-20 sm:py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 sm:space-x-20 mb-8 sm:mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-8 sm:mb-20 space-x-8 sm:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 sm:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-10 sm:py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-xl sm:text-2xl md:text-7xl font-bold dark:text-white">
        Modern Digital <br /> Experiences & Business Systems
      </h1>

      <p className="max-w-2xl text-sm sm:text-base md:text-xl mt-4 sm:mt-8 dark:text-neutral-200">
        From logistics platforms and tourism systems to billing applications and
        enterprise tools, I design and develop high-performance web solutions
        that solve real-world business challenges.
      </p>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  const hasLink =
    product.link && product.link !== "None" && product.link.trim() !== "";
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product relative w-80 md:w-[30rem] aspect-video shrink-0"
    >
      <a
        href={hasLink ? product.link : undefined}
        target={hasLink ? "_blank" : undefined}
        rel={hasLink ? "noopener noreferrer" : undefined}
        onClick={!hasLink ? (e) => e.preventDefault() : undefined}
        className={`relative block w-full h-full overflow-hidden rounded-lg ${
          !hasLink ? "cursor-default" : "group-hover/product:shadow-2xl"
        }`}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/product:scale-105"
        />

        <div className="absolute inset-0 bg-black/0 transition-opacity duration-300 group-hover/product:bg-black/50" />

        <h2 className="absolute bottom-4 left-4 text-white opacity-0 transition-opacity duration-300 group-hover/product:opacity-100">
          {product.title}
        </h2>
      </a>
    </motion.div>
  );
};
