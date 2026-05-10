"use client";

import React, { FC } from "react";
import { TbExternalLink } from "react-icons/tb";
import Modal from "./Modal";
import { IncomeType, UserIncome } from "./types";

interface IncomeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  allIncomes: IncomeType[];
  userIncomes: UserIncome[];
  onAdd: (id: string) => void;
}

const IncomeSelectorModal: FC<IncomeSelectorModalProps> = ({
  isOpen,
  onClose,
  allIncomes,
  userIncomes,
  onAdd,
}) => {
  if (!isOpen) return null;

  const availableIncomes = allIncomes.filter(
    (o) => !userIncomes.some((t) => t.id === o.id)
  );

  return (
    <Modal title="เพิ่มรายได้ประเภทอื่น" onClose={onClose}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {availableIncomes.length === 0 ? (
          <p className="text-xs text-gray-400 text-center col-span-full py-4">
            เพิ่มครบทุกประเภทแล้ว
          </p>
        ) : (
          availableIncomes.map((o) => (
            <button
              key={o.id}
              className="text-left border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-all"
              onClick={() => onAdd(o.id)}
            >
              <div className="text-xl text-gray-600 mb-1.5">{o.icon}</div>
              <span className="block text-[13px] font-medium">{o.title}</span>
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] mb-1.5 ${
                  o.tagColor === "green"
                    ? "bg-emerald-50 text-emerald-800"
                    : o.tagColor === "amber"
                    ? "bg-amber-50 text-amber-800"
                    : "bg-gray-50 text-gray-800"
                }`}
              >
                {o.tag}
              </span>
              <span className="block text-[11px] text-gray-400 leading-relaxed mb-1.5">
                {o.desc}
              </span>
              <span className="block text-[11px] text-gray-600 mb-1.5">
                ลดหย่อนได้: {o.maxLabel}
              </span>
              <a
                className="inline-flex items-center gap-1 text-[10px] text-gray-600 border border-gray-100 rounded-md px-1.5 py-0.5 hover:bg-white"
                href={o.ref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <TbExternalLink size={11} /> {o.refLabel}
              </a>
            </button>
          ))
        )}
      </div>
    </Modal>
  );
};

export default IncomeSelectorModal;
