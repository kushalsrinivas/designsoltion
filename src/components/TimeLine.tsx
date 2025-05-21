"use client";

import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  type MotionValue,
} from "framer-motion";

const timelineEvents = [
  {
    year: 2019,
    title: "Paper Products Launch",
    description:
      "Introduced our first comprehensive line of high-quality paper products.",
    details:
      "Our initial product catalog featured premium stationery, custom printing solutions, and eco-friendly paper alternatives that quickly gained popularity among small businesses.",
  },
  {
    year: 2020,
    title: "Expansion to Laser Printers",
    description:
      "Diversified our product range with cutting-edge laser printing technology.",
    details:
      "In response to growing demand, we expanded our offerings to include a selection of laser printers designed for businesses of all sizes, with a focus on efficiency and reliability.",
  },
  {
    year: 2021,
    title: "Electronic Goods Department",
    description:
      "Further expanded our catalog with essential electronic business solutions.",
    details:
      "The launch of our electronics department brought a curated selection of business-focused gadgets, from document scanners to digital organization tools designed to enhance workplace productivity.",
  },
  {
    year: 2022,
    title: "National Distribution Network",
    description:
      "Established a nationwide distribution system for faster delivery.",
    details:
      "Our expanded logistics network enabled same-day delivery in major cities and 2-day shipping nationwide, significantly improving our service capabilities.",
  },
  {
    year: 2023,
    title: "E-commerce Platform Launch",
    description:
      "Revolutionized our customer experience with a comprehensive online store.",
    details:
      "Our new digital platform features advanced product filtering, business account management, and specialized procurement solutions for enterprise clients.",
  },
];

const FlowerIcon = ({
  progress,
}: {
  progress: MotionValue<number> | number;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    style={{ transform: `scale(${progress})` }}
    aria-labelledby="productIconTitle"
  >
    <title id="productIconTitle">Product Icon</title>
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 8C12 8 14 10 14 12C14 14 12 16 12 16C12 16 10 14 10 12C10 10 12 8 12 8Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export default function Timeline() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Our Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The evolution of Flowers & Saints through the years
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20"
            style={{ scaleY: scaleX }}
          />

          {/* Flower icon */}
          <motion.div
            className="sticky top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-primary"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          >
            <FlowerIcon
              progress={useTransform(scrollYProgress, [0, 1], [0.5, 1])}
            />
          </motion.div>

          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.year}
              event={event}
              index={index}
              isExpanded={expandedEvent === index}
              onToggle={() =>
                setExpandedEvent(expandedEvent === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEvent({
  event,
  index,
  isExpanded,
  onToggle,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={`mb-8 flex justify-between items-center w-full ${
        index % 2 === 0 ? "flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="w-5/12" />
      <div className="z-20">
        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
          <div className="w-3 h-3 bg-background rounded-full" />
        </div>
      </div>
      <motion.div
        className="w-5/12 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
      >
        <div className="p-4 bg-background rounded-lg shadow-md border border-primary/10">
          <span className="font-bold text-primary">{event.year}</span>
          <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
          <p className="text-muted-foreground">{event.description}</p>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-sm text-muted-foreground">
              {event.details}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
