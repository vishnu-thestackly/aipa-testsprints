import dayjs from "dayjs";

export const askAI = (question) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const q = question.trim().toLowerCase();

      if (!q) return reject("Empty question");

      const time = dayjs().format("hh:mm A"); // single source
      const timestamp = dayjs().toISOString(); // better for storage

      let response = {
        answer: "",
        data: { type: "", items: [] },
        confidence: "Low",

      };

      if (q.includes("task")) {
        response = {
          answer:
            "A task is a specific unit of work that needs to be completed to achieve a goal.",
          data: {
            type: "task",
            items: [
              "A clearly defined activity",
              "Has a goal or expected outcome",
              "Can be assigned, tracked, and completed",
            ],
          },
          confidence: "High",
        };
      } else if (q.includes("schedule")) {
        response = {
          answer: "A schedule defines when tasks or events occur.",
          data: {
            type: "schedule",
            items: [
              "Sat 10:00 AM - Review weekend sales",
              "Mon 11:30 AM - Plan discount strategy",
            ],
          },
          confidence: "High",
        };
      } else if (q.includes("meeting")) {
        response = {
          answer:
            "A meeting is a discussion to align on topics and decisions.",
          data: {
            type: "meeting",
            items: [
              "Communication",
              "Decision-making",
              "Problem-solving",
              "Status updates",
            ],
          },
          confidence: "High",
        };
      } else if (q.includes("user")) {
        response = {
          answer: "A user is an entity that interacts with a system, application, or service",
          data: {
            type: "insight",
            items: [
              "Someone who uses a product",
              "Provides input and receives output",
              "Can be human or sometimes another system (API client)",
            ],
          },
          confidence: "Medium",
        };
      } else if (/\b(hi|hello)\b/.test(q)) {
        response = {
          answer: "Hello! How can I help you?",
          data: {
            type: "insight",
            items: ["Ask about tasks", "Check schedules", "Meeting", "User"],
          },
          confidence: "High",
        };
      } else {
        response = {
          answer: `No data found for "${question}"`,
          data: {
            type: "insight",
            items: ["Try: task, schedule, meeting, user"],
          },
          confidence: "Low",
        };
      }

      resolve({
        question,
        ...response,
        time,        // formatted for UI
        timestamp,   // ISO for storage
      });
    }, 1500);
  });
};