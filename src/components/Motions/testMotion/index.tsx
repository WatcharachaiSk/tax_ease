"use client";

import { motion } from "framer-motion";
import React, { FC } from "react";

// interface TestMotionProps {}

const TestMotion: FC = ({}) => {
  return (
    <div className="">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 0.9, rotate: 10 }}
        // drag
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Drag Me
      </motion.button>
    </div>
  );
};

export default TestMotion;
