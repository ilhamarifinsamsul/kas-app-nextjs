// use client
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      {/* spinner */}
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      {/* animated text */}
      <div className="flex items-center text-lg text-muted-foreground">
        <span>Loading</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={dots}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="ml-2"
          >
            {dots}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
