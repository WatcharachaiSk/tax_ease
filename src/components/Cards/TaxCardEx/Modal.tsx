"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";
import { TbX } from "react-icons/tb";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ title, onClose, children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-white rounded-[20px] w-full max-w-[560px] max-h-[85vh] overflow-y-auto p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-[17px] font-medium">{title}</span>
        <button
          className="w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={onClose}
        >
          <TbX size={14} />
        </button>
      </div>
      {children}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          className="w-full p-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-600 hover:bg-gray-50 transition-colors"
          onClick={onClose}
        >
          ยกเลิก
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default Modal;
