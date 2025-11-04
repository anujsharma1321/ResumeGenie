import React from "react";
import { motion } from "framer-motion";

const FeedbackCard = ({ feedback }) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const suggestions = feedback?.suggestions || [];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="mt-6 p-4 sm:p-6 bg-white shadow-lg rounded-2xl w-full max-w-4xl mx-auto border border-gray-200 overflow-auto"
    >
      <motion.h2
        custom={0}
        variants={fadeUp}
        className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center"
      >
        AI Feedback
      </motion.h2>

      {["Presentation", "Grammar", "Skills", "ATS Score"].map((label, i) => (
        <motion.p
          key={label}
          custom={i + 1}
          variants={fadeUp}
          className="text-sm sm:text-base text-gray-700 mb-2"
        >
          <strong>{label}:</strong>{" "}
          {feedback[label.toLowerCase().replace(" ", "_")]}
        </motion.p>
      ))}

      <motion.h3
        custom={5}
        variants={fadeUp}
        className="mt-4 mb-2 text-base sm:text-lg font-semibold text-gray-800"
      >
        Suggestions:
      </motion.h3>

      <ul className="list-disc ml-4 sm:ml-6">
        {suggestions.map((s, i) => (
          <motion.li
            key={i}
            custom={6 + i}
            variants={fadeUp}
            className="text-sm sm:text-base text-gray-700 mb-1"
          >
            {s}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FeedbackCard;
