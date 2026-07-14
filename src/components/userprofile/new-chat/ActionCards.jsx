import React from "react";

export default function ActionCards({ cards }) {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="rounded-[10px] bg-[#F4F4F4] px-4 py-5"
          >
            {card.icon && (
              <img
                src={card.icon}
                alt=""
                className="h-6 w-6"
              />
            )}

            <h3 className="mt-3 text-[15px] font-semibold text-[#2D2D2D]">
              {card.title}
            </h3>

            <p className="mt-1 text-[14px] leading-7 text-[#586D93]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}