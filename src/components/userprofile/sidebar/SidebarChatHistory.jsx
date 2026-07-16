import React, { useState, useRef, useLayoutEffect } from "react";

const CHAT_ITEM_HEIGHT = 36;
const CHAT_ITEM_GAP = 10;
const MIN_VISIBLE = 2;
const MAX_VISIBLE = 5;

const CONVERSATIONS = [
  "What's on my schedule today?",
  "Set a reminder for the client call.",
  "Draft an email to my manager.",
  "Create a task for UI audit review.",
  "Show my pending tasks.",
  "Summarize yesterday's meeting notes.",
  "Plan tasks for next sprint.",
  "Review Q3 budget proposal.",
  "Schedule team standup for Monday.",
  "Find documents from last workshop.",
  "Prepare slides for client demo.",
  "Follow up on support ticket #4821.",
];

function getScrollParent(element) {
  let node = element?.parentElement;
  while (node) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

function getListMetrics(availableHeight, itemCount) {
  const slotHeight = CHAT_ITEM_HEIGHT + CHAT_ITEM_GAP;
  const slotsFromSpace = Math.floor((availableHeight + CHAT_ITEM_GAP) / slotHeight);
  const visibleSlots = Math.min(
    MAX_VISIBLE,
    Math.max(MIN_VISIBLE, slotsFromSpace || MIN_VISIBLE)
  );
  const renderedSlots = Math.min(visibleSlots, itemCount);
  const listHeight =
    renderedSlots * CHAT_ITEM_HEIGHT +
    Math.max(0, renderedSlots - 1) * CHAT_ITEM_GAP;

  return { listHeight, needsScroll: itemCount > visibleSlots };
}

export default function SidebarChatHistory() {
  const [activeChat, setActiveChat] = useState(null);
  const [listHeight, setListHeight] = useState(
    MIN_VISIBLE * CHAT_ITEM_HEIGHT + (MIN_VISIBLE - 1) * CHAT_ITEM_GAP
  );

  const rootRef = useRef(null);
  const listRef = useRef(null);

  useLayoutEffect(() => {
    const updateListHeight = () => {
      const scrollParent = getScrollParent(rootRef.current);
      if (!scrollParent || !listRef.current) return;

      const parentRect = scrollParent.getBoundingClientRect();
      const listRect = listRef.current.getBoundingClientRect();
      const availableHeight = parentRect.bottom - listRect.top - 8;

      const { listHeight: nextHeight } = getListMetrics(
        availableHeight,
        CONVERSATIONS.length
      );
      setListHeight(nextHeight);
    };

    updateListHeight();

    const scrollParent = getScrollParent(rootRef.current);
    const resizeObserver = new ResizeObserver(updateListHeight);

    if (scrollParent) resizeObserver.observe(scrollParent);
    if (rootRef.current?.parentElement) {
      resizeObserver.observe(rootRef.current.parentElement);
    }

    scrollParent?.addEventListener("scroll", updateListHeight, { passive: true });
    window.addEventListener("resize", updateListHeight);

    return () => {
      resizeObserver.disconnect();
      scrollParent?.removeEventListener("scroll", updateListHeight);
      window.removeEventListener("resize", updateListHeight);
    };
  }, []);

  return (
    <div ref={rootRef} className="w-full flex flex-col min-h-0 select-none">
      {/* Divider */}
      <div className="w-full border-t border-[#E5E7EB] my-4 lg:my-5" />

      {/* Header */}
      <div className="flex items-center justify-between px-1 mb-[14px]">
        <span className="text-[14px] font-semibold text-[#586D93]">
          Chat History
        </span>
        <button className="text-[#586D93] hover:text-[#4866F6] transition-colors duration-200 focus:outline-none cursor-pointer">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[18px] h-[18px] cursor-pointer"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {/* Scrollable list — 2 to 5 visible items based on sidebar space */}
      <div
        ref={listRef}
        className="flex flex-col gap-[10px] overflow-y-auto no-scrollbar shrink-0"
        style={{ height: listHeight, minHeight: listHeight, maxHeight: listHeight }}
      >
        {CONVERSATIONS.map((chat, index) => {
          const isActive = activeChat === index;
          return (
            <div
              key={index}
              onClick={() => setActiveChat(index)}
              style={{ height: CHAT_ITEM_HEIGHT, minHeight: CHAT_ITEM_HEIGHT }}
              className={`w-full flex items-center text-left text-[14px] leading-none cursor-pointer rounded-lg px-[10px] transition-all duration-200 truncate shrink-0 ${
                isActive
                  ? "bg-[#4866F6] text-white font-medium"
                  : "text-[#586D93] hover:bg-[#4866F6] hover:text-white"
              }`}
              title={chat}
            >
              {chat}
            </div>
          );
        })}
      </div>
    </div>
  );
}
