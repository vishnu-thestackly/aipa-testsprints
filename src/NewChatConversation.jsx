// =============================================================================
// New Chat Conversation
// =============================================================================
// Interactive blocks (calendar, pills, summary cards) render inside bot bubbles.
// Replace getNextResponse() with a backend API call when integrating FastAPI/AI.

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AiChat from "../../../assets/images/aichat.svg";
import Profile from "../../../assets/images/profile.png";
import FileUpload from "../../../assets/images/FileUpload.png";
import Audio from "../../../assets/images/Audio.png";
import EnterFrame from "../../../assets/images/EnterFrame.png";
import ChatSpeaker from "../../../assets/images/chat_speaker.png";
import ChatCopy from "../../../assets/images/chat_copy.png";
import ChatSave from "../../../assets/images/chat_save.png";
import ChatShare from "../../../assets/images/chat_share.png";
import ChatEdit from "../../../assets/images/chat_edit.svg";
import calendarIcon from "../../../assets/images/calender.svg";

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// Buttons offered in the greeting when the bot can't tell what the user wants.
// The labels double as intent triggers (see detectIntent).
const QUICK_ACTIONS = ["Schedule Meeting", "Draft Email", "Create a Task"];

// Selectable values for the "priority" step.
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

// 12-hour clock labels ["01".."12"] used by the time-picker hour dropdown.
const HOUR_OPTIONS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
// Minutes are limited to quarter-hour increments to keep the picker simple.
const MINUTE_OPTIONS = ["00", "15", "30", "45"];
const MERIDIEM_OPTIONS = ["AM", "PM"];

// Central state machine for a single task-creation conversation.
//   intent -> which task the user wants (set once detectIntent matches)
//   step   -> current question stage: start -> date -> time -> priority -> summary
//   fields -> data collected so far (date, time, priority, attendees, ...)
//   status -> lifecycle: collecting -> confirming -> executing -> done | error
const INITIAL_WORKFLOW = {
  intent: null,
  step: "start",
  fields: {},
  status: "collecting",
};

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------
// Timestamp shown under each bubble, e.g. "02:30 PM".
const getCurrentTime = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

// Unique-enough id (timestamp + random suffix) so React list keys never collide.
const createId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// ISO date ("2026-07-13") -> friendly "13 Jul 2026"; empty input stays empty.
const formatDisplayDate = (isoDate) =>
  isoDate ? dayjs(isoDate).format("DD MMM YYYY") : "";

// Factory for a bot bubble. contentType drives which interactive block renders
// (see BotMessageContent); payload carries the data that block needs.
const createBotMessage = (text, contentType = "text", payload = {}) => ({
  id: createId("bot"),
  type: "bot",
  text,
  contentType,
  payload,
  time: getCurrentTime(),
});

// Factory for a right-aligned user bubble.
const createUserMessage = (text) => ({
  id: createId("user"),
  type: "user",
  text,
  time: getCurrentTime(),
});

// Fake NLU: keyword-match the user's text to an intent, or null when nothing
// matches (which makes the caller fall back to showing the quick-action buttons).
// Note: the exact-match checks below are redundant with the includes() checks
// above but are kept as harmless documentation of the expected phrases.
const detectIntent = (text) => {
  const q = text.toLowerCase();
  if (q.includes("jira")) return "create_jira_task";
  if (q.includes("meeting") || q.includes("schedule"))
    return "schedule_meeting";
  if (q.includes("email") || q.includes("draft") || q.includes("mail"))
    return "draft_email";
  if (q.includes("task") || q.includes("trello")) return "create_task";
  if (q === "schedule meeting") return "schedule_meeting";
  if (q === "draft email") return "draft_email";
  if (q === "create a task") return "create_task";
  return null;
};

// Human-readable label for an intent code, used in summaries and success cards.
const taskTypeLabel = (intent) => {
  switch (intent) {
    case "create_jira_task":
      return "Jira task";
    case "schedule_meeting":
      return "Schedule Meeting";
    case "draft_email":
      return "Draft Email";
    case "create_task":
      return "Create a task";
    default:
      return "Task";
  }
};

// Turns the collected workflow fields into the rows shown in the summary card.
// Only fields that were actually captured get a row, so the summary stays tidy.
const buildSummaryFields = (workflow) => {
  const { intent, fields } = workflow;
  const rows = [{ label: "Task Type", value: taskTypeLabel(intent) }];

  if (fields.date) {
    rows.push({
      label: "Date",
      value: fields.dateDisplay || formatDisplayDate(fields.date),
    });
  }
  if (fields.time) {
    rows.push({ label: "Time", value: fields.time });
  }
  if (fields.priority) {
    rows.push({
      label: "Priority",
      value: fields.priorityDefault
        ? `${fields.priority} (Default)`
        : fields.priority,
    });
  }
  if (fields.platform) {
    rows.push({ label: "Platform", value: fields.platform });
  }
  if (intent === "schedule_meeting" && fields.attendees) {
    rows.push({ label: "Action", value: fields.attendees });
  }

  return rows;
};

// -----------------------------------------------------------------------------
// MOCK AGENT — returns next bot message(s) and updated workflow
// -----------------------------------------------------------------------------
// Pure function (no side effects): given the user's text + the current workflow,
// it decides what the bot says next and what the new workflow state should be.
// It's structured as a step machine (start -> date -> time -> priority -> summary).
// >>> INTEGRATION POINT: swap this body for a FastAPI/LLM request in production. <<<
function getNextResponse(userInput, workflow) {
  const text = userInput.trim();
  const lower = text.toLowerCase();
  // Clone the workflow (including a fresh fields object) so we never mutate the
  // caller's state directly — React state must be replaced, not edited in place.
  let nextWorkflow = {
    ...workflow,
    fields: { ...workflow.fields },
  };

  // Restart flow after a completed or failed execution
  if (nextWorkflow.status === "done" || nextWorkflow.status === "error") {
    nextWorkflow = { ...INITIAL_WORKFLOW, fields: {} };
  }

  // --- SUMMARY: keep user on confirmation until they confirm or edit ---
  // Any free text typed while confirming just re-shows the summary; actual
  // confirm/edit go through the button handlers, not this function.
  if (nextWorkflow.step === "summary" || nextWorkflow.status === "confirming") {
    return {
      workflow: nextWorkflow,
      botMessages: [
        createBotMessage("Here's the Summary", "summary", {
          fields: buildSummaryFields(nextWorkflow),
        }),
      ],
    };
  }

  // --- START: detect intent or show quick actions ---
  if (nextWorkflow.step === "start") {
    const intent = detectIntent(text) || detectIntent(lower);
    // No recognizable intent -> greet with the quick-action buttons.
    if (!intent) {
      return {
        workflow: nextWorkflow,
        botMessages: [
          createBotMessage("What would you like to do?", "quick_actions", {
            options: QUICK_ACTIONS,
          }),
        ],
      };
    }

    // Lock in the intent and advance to collecting the date.
    nextWorkflow.intent = intent;
    nextWorkflow.step = "date";
    nextWorkflow.fields.taskType = taskTypeLabel(intent);

    // For meetings, try to pull attendee names out of phrases like
    // "meeting with John and Sara tomorrow" -> attendees = "John and Sara".
    if (intent === "schedule_meeting") {
      const attendeeMatch = text.match(
        /with\s+(.+?)(?:\s+tomorrow|\s+at|\s+on|$)/i,
      );
      if (attendeeMatch) {
        nextWorkflow.fields.attendees = attendeeMatch[1].trim();
      }
    }

    return {
      workflow: nextWorkflow,
      botMessages: [
        createBotMessage(
          "Great!! What date would you like to schedule it?",
          "date_picker",
          { placeholder: "Select Date" },
        ),
      ],
    };
  }

  // --- DATE step ---
  if (nextWorkflow.step === "date") {
    // "skip" -> apply the default deadline (tomorrow) and move on.
    if (lower === "skip") {
      const tomorrow = dayjs().add(1, "day");
      nextWorkflow.fields.date = tomorrow.format("YYYY-MM-DD");
      nextWorkflow.fields.dateDisplay = "Tomorrow";
      nextWorkflow.fields.dateSkipped = true;
      nextWorkflow.step = "time";

      return {
        workflow: nextWorkflow,
        botMessages: [
          createBotMessage(
            "No Problem, I'll set the default Deadline to tomorrow 5PM",
            "change_action",
            { actionId: "change_deadline", label: "Change Deadline" },
          ),
          createBotMessage(
            "Great!! What Time would you like to Schedule it?",
            "time_picker",
            {},
          ),
        ],
      };
    }

    // Accept either a calendar pick (already YYYY-MM-DD) or free-typed text
    // that dayjs can understand; normalize both to an ISO date string.
    let isoDate = null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
      isoDate = text;
    } else {
      const parsed = dayjs(text);
      if (parsed.isValid()) isoDate = parsed.format("YYYY-MM-DD");
    }

    // Couldn't parse a date -> re-prompt with the calendar.
    if (!isoDate) {
      return {
        workflow: nextWorkflow,
        botMessages: [
          createBotMessage(
            "Please select a date from the calendar or type a valid date.",
            "date_picker",
            { placeholder: "Select Date" },
          ),
        ],
      };
    }

    nextWorkflow.fields.date = isoDate;
    nextWorkflow.fields.dateDisplay = formatDisplayDate(isoDate);
    nextWorkflow.step = "time";

    return {
      workflow: nextWorkflow,
      botMessages: [
        createBotMessage(
          "Great!! What Time would you like to Schedule it?",
          "time_picker",
          {},
        ),
      ],
    };
  }

  // --- TIME step ---
  if (nextWorkflow.step === "time") {
    // "skip" -> default to 5:00 PM.
    if (lower === "skip") {
      nextWorkflow.fields.time = "5:00 PM";
      nextWorkflow.step = "priority";
      return {
        workflow: nextWorkflow,
        botMessages: [
          createBotMessage("What Is the Meeting Priority?", "options", {
            options: PRIORITY_OPTIONS,
          }),
        ],
      };
    }

    // Parse free-typed times like "3", "3:30", "3pm", "15:30".
    // Groups: [1]=hour, [2]=optional minutes, [3]=optional am/pm.
    const timeMatch = text.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?/i);
    if (timeMatch) {
      let hour = parseInt(timeMatch[1], 10);
      const minute = timeMatch[2] ? timeMatch[2] : "00";
      // Assume AM/PM from the number when the user didn't type it.
      const meridiem =
        timeMatch[3]?.toUpperCase() || (hour >= 12 ? "PM" : "AM");
      // Normalize to 24h internally so the display hour is computed correctly.
      if (!timeMatch[3] && hour > 12) {
        // already 24h style
      } else if (meridiem === "PM" && hour < 12) hour += 12;
      else if (meridiem === "AM" && hour === 12) hour = 0;
      const displayHour = hour % 12 || 12; // 0/24 -> 12 for display
      nextWorkflow.fields.time = `${displayHour}:${minute} ${meridiem}`;
    } else {
      // Unparseable -> store the raw text as-is.
      nextWorkflow.fields.time = text;
    }

    nextWorkflow.step = "priority";
    return {
      workflow: nextWorkflow,
      botMessages: [
        createBotMessage("What Is the Meeting Priority?", "options", {
          options: PRIORITY_OPTIONS,
        }),
      ],
    };
  }

  // --- PRIORITY step ---
  if (nextWorkflow.step === "priority") {
    // "skip" -> default to Medium (flagged so the summary shows "(Default)").
    if (lower === "skip") {
      nextWorkflow.fields.priority = "Medium";
      nextWorkflow.fields.priorityDefault = true;
      nextWorkflow.step = "summary";
      nextWorkflow.status = "confirming";

      return {
        workflow: nextWorkflow,
        botMessages: [
          createBotMessage(
            "Priority automatically set to 'Medium'",
            "change_action",
            { actionId: "change_priority", label: "Change Priority" },
          ),
          createBotMessage("Here's the Summary", "summary", {
            fields: buildSummaryFields(nextWorkflow),
          }),
        ],
      };
    }

    // Match the typed/clicked value against the allowed options.
    const priority = PRIORITY_OPTIONS.find((p) => p.toLowerCase() === lower);
    // Not one of Low/Medium/High -> ask again.
    if (!priority) {
      return {
        workflow: nextWorkflow,
        botMessages: [
          createBotMessage("What Is the Meeting Priority?", "options", {
            options: PRIORITY_OPTIONS,
          }),
        ],
      };
    }

    nextWorkflow.fields.priority = priority;
    nextWorkflow.step = "summary";
    nextWorkflow.status = "confirming";

    return {
      workflow: nextWorkflow,
      botMessages: [
        createBotMessage("Here's the Summary", "summary", {
          fields: buildSummaryFields(nextWorkflow),
        }),
      ],
    };
  }

  // --- Clarification for online/offline (natural meeting flow) ---
  // Optional branch: capture the meeting platform/mode before summarizing.
  if (nextWorkflow.step === "meeting_mode") {
    nextWorkflow.fields.platform = text;
    nextWorkflow.fields.meetingMode = lower.includes("offline")
      ? "Offline"
      : "Online";
    nextWorkflow.step = "summary";
    nextWorkflow.status = "confirming";

    return {
      workflow: nextWorkflow,
      botMessages: [
        createBotMessage(
          "Here's the final summary before execution",
          "summary",
          { fields: buildSummaryFields(nextWorkflow) },
        ),
      ],
    };
  }

  // Fallback: unknown step -> show the quick actions again.
  return {
    workflow: nextWorkflow,
    botMessages: [
      createBotMessage("What would you like to do?", "quick_actions", {
        options: QUICK_ACTIONS,
      }),
    ],
  };
}

// -----------------------------------------------------------------------------
// NewChatConversation — conversation page wrapper
// -----------------------------------------------------------------------------
export default function NewChatConversation({ languageOpen }) {
  const location = useLocation();
  // Message the user typed on the previous screen (NewChat) and navigated with.
  const firstMessage = location.state?.firstMessage || "";
  const inputRef = useRef(null); // text input, so we can focus it when editing
  const bottomRef = useRef(null); // scroll anchor at the end of the list
  const messagesContainerRef = useRef(null); // scroll container for auto-scroll
  const firstMessageProcessed = useRef(false); // guard: handle firstMessage once
  const activeTurnRef = useRef(0); // synchronous mirror of activeTurn (see bumpTurn)

  const [input, setInput] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null); // id being edited, or null
  const [workflow, setWorkflow] = useState(INITIAL_WORKFLOW);
  const [activeTurn, setActiveTurn] = useState(0);
  // Lazy initializer: seed the conversation. With a firstMessage we show the
  // user's bubble + a plain greeting; otherwise we show the quick-action greeting.
  const [messages, setMessages] = useState(() => {
    const starterBot = createBotMessage(
      firstMessage
        ? "What would you like to do today?"
        : "What would you like to do?",
      firstMessage ? "text" : "quick_actions",
      firstMessage ? {} : { options: QUICK_ACTIONS },
    );
    starterBot.turn = 0;

    return [
      ...(firstMessage
        ? [
            {
              id: "first-user-message",
              type: "user",
              text: firstMessage,
              time: getCurrentTime(),
              turn: 0,
            },
          ]
        : []),
      starterBot,
    ];
  });

  // Advance to a new conversation turn. Only the newest turn's buttons stay
  // clickable (see isBotMessageInteractive), preventing users from re-triggering
  // past steps. The ref is updated synchronously so callers get the new value now.
  const bumpTurn = () => {
    activeTurnRef.current += 1;
    const turn = activeTurnRef.current;
    setActiveTurn(turn);
    return turn;
  };

  // A bot message's interactive widgets are live only if: it's a bot message,
  // we're not mid-execution, it actually has interactive content, and it belongs
  // to the current (latest) turn.
  const isBotMessageInteractive = (message) => {
    if (message.type !== "bot") return false;
    if (workflow.status === "executing") return false;
    if (!message.contentType || message.contentType === "text") return false;
    if (message.contentType === "processing") return false;
    return message.turn === activeTurn;
  };

  // Keep the newest message in view whenever the list changes.
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages]);

  // Process first message from NewChat navigation
  useEffect(() => {
    if (!firstMessage || firstMessageProcessed.current) return;
    firstMessageProcessed.current = true;

    // Run the seed message through the agent, then tag the seeded user bubble
    // with this turn and replace the placeholder greeting (slice(0,-1)) with the
    // agent's real reply.
    const { workflow: nextWorkflow, botMessages } = getNextResponse(
      firstMessage,
      INITIAL_WORKFLOW,
    );
    const turn = bumpTurn();
    setWorkflow(nextWorkflow);
    if (botMessages.length > 0) {
      setMessages((prev) => [
        ...prev
          .map((message) =>
            message.id === "first-user-message"
              ? { ...message, turn }
              : message,
          )
          .slice(0, -1),
        ...botMessages.map((message) => ({ ...message, turn })),
      ]);
    }
  }, [firstMessage]);

  // Core update: start a new turn, save the new workflow, and append the user's
  // bubble followed by the bot reply/replies (all stamped with the same turn).
  const appendConversation = (userText, botMessages, nextWorkflow) => {
    const turn = bumpTurn();
    setWorkflow(nextWorkflow);
    setMessages((prev) => [
      ...prev,
      { ...createUserMessage(userText), turn },
      ...botMessages.map((message) => ({ ...message, turn })),
    ]);
    return turn;
  };

  // Feed a piece of user input (typed text or a clicked option) to the agent
  // and render the result.
  const processUserInput = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const { workflow: nextWorkflow, botMessages } = getNextResponse(
      trimmed,
      workflow,
    );
    appendConversation(trimmed, botMessages, nextWorkflow);
  };

  // Fake the backend "execute task" step: show a processing card, then after a
  // short delay swap it for either a success or an error card.
  //   simulateError    -> force the error branch (triggered by typing "fail")
  //   workflowSnapshot -> workflow captured at trigger time (state may change)
  //   turn             -> turn the result messages belong to
  const runMockExecution = (
    simulateError = false,
    workflowSnapshot = workflow,
    turn = bumpTurn(),
  ) => {
    const processingMsg = {
      ...createBotMessage("Executing your request.........", "processing", {
        steps: [
          "Processing......",
          "Connecting to outlook....",
          "Creating meeting event...",
        ],
      }),
      turn,
    };

    setMessages((prev) => [...prev, processingMsg]);
    setWorkflow((prev) => ({ ...prev, status: "executing" }));

    // Simulated network/latency delay before the result arrives.
    setTimeout(() => {
      setMessages((prev) => {
        // Remove the transient "processing" bubble before adding the result.
        const withoutProcessing = prev.filter((m) => m.id !== processingMsg.id);

        if (simulateError) {
          return [
            ...withoutProcessing,
            {
              ...createBotMessage("Executing your request.........", "error", {
                title: "Unable to Execute Task",
                description:
                  "Outlook Connection Failed. Please try again or reconnect your account",
                actions: [
                  { id: "retry", label: "Retry" },
                  { id: "edit_details", label: "Edit details" },
                ],
              }),
              turn,
            },
          ];
        }

        // Choose the destination system based on what was being created.
        const { intent, fields } = workflowSnapshot;
        const platform =
          intent === "create_jira_task"
            ? "Jira"
            : intent === "draft_email"
              ? "Exchange"
              : "Outlook";

        return [
          ...withoutProcessing,
          {
            ...createBotMessage("Executing your request.........", "success", {
              title: "Task Executed Successfully!!",
              details: [
                {
                  label:
                    intent === "schedule_meeting"
                      ? "Meeting Schedule via Outlook"
                      : `${taskTypeLabel(intent)} created`,
                  value: "",
                },
                {
                  label: "Date",
                  value: fields.dateDisplay || formatDisplayDate(fields.date),
                },
                {
                  label: "Time",
                  value: fields.time || "12:00 PM",
                },
              ],
              platform,
              actions: [
                { id: "view_task", label: "View Task" },
                { id: "create_new", label: "Create New task" },
              ],
            }),
            turn,
          },
        ];
      });

      // Mark the lifecycle finished; next user input restarts the flow.
      setWorkflow((prev) => ({
        ...prev,
        status: simulateError ? "error" : "done",
      }));
    }, 2200);
  };

  // Send/commit the composer. Handles three cases: editing an existing message,
  // confirming from the summary via text, or a normal new message.
  const handleSend = () => {
    const message = input.trim();
    if (!message) return;

    // Case 1: we're editing an existing user bubble — update it in place.
    if (editingMessageId) {
      setMessages((prevMessages) =>
        prevMessages.map((prevMessage) =>
          prevMessage.id === editingMessageId
            ? { ...prevMessage, text: message, time: getCurrentTime() }
            : prevMessage,
        ),
      );
      setEditingMessageId(null);
      setInput("");
      return;
    }

    // Case 2: at the summary, typing "confirm"/"execute" kicks off execution.
    // (Typing something containing "fail" forces the simulated error path.)
    const lower = message.toLowerCase();
    if (
      workflow.status === "confirming" &&
      (lower.includes("confirm") ||
        lower.includes("execute task") ||
        lower === "execute")
    ) {
      const turn = appendConversation(message, [], {
        ...workflow,
        status: "executing",
      });
      setInput("");
      runMockExecution(lower.includes("fail"), workflow, turn);
      return;
    }

    // Case 3: normal message — let the agent decide the next step.
    processUserInput(message);
    setInput("");
  };

  // Clicking a quick-action / option pill behaves like typing that label.
  const handleOptionSelect = (option) => {
    if (workflow.status === "executing") return;
    processUserInput(option);
  };

  // Calendar pick -> submit the chosen date as a formatted string.
  const handleDateSelect = (isoDate) => {
    if (workflow.status === "executing") return;
    processUserInput(dayjs(isoDate).format("DD MMM YYYY"));
  };

  // Time-picker "Set Time" -> submit the chosen time label.
  const handleTimeSelect = (timeLabel) => {
    if (workflow.status === "executing") return;
    processUserInput(timeLabel);
  };

  // Buttons on the summary card: Confirm (execute) or Edit (rewind to date).
  const handleSummaryAction = (actionId) => {
    if (actionId === "confirm") {
      const turn = appendConversation("Confirm the Task", [], {
        ...workflow,
        status: "executing",
      });
      runMockExecution(false, workflow, turn);
      return;
    }

    if (actionId === "edit") {
      const nextWorkflow = { ...workflow, step: "date", status: "collecting" };
      appendConversation(
        "Edit",
        [
          createBotMessage(
            "Great!! What date would you like to schedule it?",
            "date_picker",
            { placeholder: "Select Date" },
          ),
        ],
        nextWorkflow,
      );
    }
  };

  // "Change Deadline"/"Change Priority" pills shown after a skip — rewind the
  // flow to the relevant step so the user can supply a real value.
  const handleChangeAction = (actionId) => {
    if (actionId === "change_deadline") {
      const nextWorkflow = { ...workflow, step: "date", status: "collecting" };
      appendConversation(
        "Change Deadline",
        [
          createBotMessage(
            "Great!! What date would you like to schedule it?",
            "date_picker",
            { placeholder: "Select Date" },
          ),
        ],
        nextWorkflow,
      );
    }

    if (actionId === "change_priority") {
      const nextWorkflow = {
        ...workflow,
        step: "priority",
        status: "collecting",
      };
      appendConversation(
        "Change Priority",
        [
          createBotMessage("What Is the Meeting Priority?", "options", {
            options: PRIORITY_OPTIONS,
          }),
        ],
        nextWorkflow,
      );
    }
  };

  // Buttons on the success/error cards.
  const handleStatusAction = (actionId) => {
    if (actionId === "retry") {
      // Re-run execution after a failure.
      const turn = bumpTurn();
      runMockExecution(false, workflow, turn);
    }
    if (actionId === "edit_details") {
      // Same as summary "edit": rewind to the date step.
      handleSummaryAction("edit");
    }
    if (actionId === "create_new") {
      // Full reset back to a fresh conversation with the quick-action greeting.
      activeTurnRef.current = 0;
      setActiveTurn(0);
      setWorkflow(INITIAL_WORKFLOW);
      const turn = bumpTurn();
      setMessages((prev) => [
        ...prev,
        { ...createUserMessage("Create New task"), turn },
        {
          ...createBotMessage("What would you like to do?", "quick_actions", {
            options: QUICK_ACTIONS,
          }),
          turn,
        },
      ]);
    }
    if (actionId === "view_task") {
      // Placeholder until the real backend can hand back a task link.
      appendConversation(
        "View Task",
        [
          createBotMessage(
            "Your task details are ready. Integration with Jira/Outlook will open the task link when the backend is connected.",
            "text",
          ),
        ],
        workflow,
      );
    }
  };

  // Clicking a user bubble's edit icon: enter edit mode and load its text.
  const handleEditMessage = (message) => {
    setEditingMessageId(message.id);
    setInput(message.text);
    inputRef.current?.focus();
  };

  // Leave edit mode without saving (e.g. Escape key).
  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setInput("");
  };

  return (
    <div
      className={`h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-4 scrollbar-hide transition-all duration-300 ${
        languageOpen ? "mt-[60px] md:mt-[70px] lg:mt-[80px]" : "mt-0"
      }`}
    >
      {/* Main card */}
      <div className="relative flex min-h-[calc(100vh-150px)] flex-1 flex-col rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white p-[12px] md:p-6 pb-6 lg:pb-8 shadow-[0px_0px_4px_0px_#00000014]">
        {/* Conversation messages */}
        <div
          ref={messagesContainerRef}
          className="min-h-0 flex-1 overflow-y-auto px-2 pb-4 pt-4 sm:px-4 md:px-6 md:pt-6 lg:px-8"
        >
          <div className="flex flex-col gap-8 lg:gap-3">
            {/* Render each message as a bot or user bubble; only the latest
                turn's bot widgets stay interactive (isBotMessageInteractive). */}
            {messages.map((message) =>
              message.type === "bot" ? (
                <BotMessage
                  key={message.id}
                  message={message}
                  isActive={isBotMessageInteractive(message)}
                  onOptionSelect={handleOptionSelect}
                  onDateSelect={handleDateSelect}
                  onTimeSelect={handleTimeSelect}
                  onSummaryAction={handleSummaryAction}
                  onChangeAction={handleChangeAction}
                  onStatusAction={handleStatusAction}
                />
              ) : (
                <UserMessage
                  key={message.id}
                  message={message}
                  onEdit={handleEditMessage}
                />
              ),
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Message composer */}
        <div className="shrink-0 px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            {/* File upload button */}
            <button
              type="button"
              className="flex h-13 w-13 shrink-0 items-center justify-center rounded-lg border border-[#4866F6] bg-[#EEF2FF] cursor-pointer"
              aria-label="Upload file"
            >
              <img src={FileUpload} alt="" className="h-6 w-6" />
            </button>

            {/* Input box */}
            <div className="flex h-13 min-w-0 flex-1 items-center rounded-lg border border-[#4866F6] bg-[#EEF2FF] px-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  // Enter sends; Escape cancels an in-progress edit.
                  if (event.key === "Enter") {
                    handleSend();
                  }
                  if (event.key === "Escape" && editingMessageId) {
                    handleCancelEdit();
                  }
                }}
                placeholder={
                  editingMessageId
                    ? "Edit your message here...."
                    : "Type your message here...."
                }
                className="min-w-0 flex-1 bg-transparent text-[12px] sm:text-[14px] text-[#2D2D2D] outline-none placeholder:text-[#2D2D2D]"
              />
              <button
                type="button"
                className="flex md:hidden shrink-0 items-center justify-center cursor-pointer ml-2"
                aria-label="Record audio"
              >
                <img src={Audio} alt="" className="h-6.5 w-6.5" />
              </button>
            </div>

            {/* Audio button — tablet & desktop only */}
            <button
              type="button"
              className="hidden md:flex h-13 w-13 shrink-0 items-center justify-center rounded-lg border border-[#4866F6] bg-[#EEF2FF] cursor-pointer"
              aria-label="Record audio"
            >
              <img src={Audio} alt="" className="h-6.5 w-6.5" />
            </button>

            {/* Send button */}
            <button
              type="button"
              onClick={handleSend}
              className="flex h-13 w-13 shrink-0 items-center justify-center rounded-lg bg-[#4866F6] cursor-pointer"
              aria-label={editingMessageId ? "Update message" : "Send message"}
            >
              <img src={EnterFrame} alt="" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// BotMessage — left aligned assistant message with action buttons
// -----------------------------------------------------------------------------
function BotMessage({
  message,
  isActive,
  onOptionSelect,
  onDateSelect,
  onTimeSelect,
  onSummaryAction,
  onChangeAction,
  onStatusAction,
}) {
  // Decorative action icons under every bot bubble (speaker/copy/save/share).
  // Currently visual only — no click handlers wired up.
  const actions = [ChatSpeaker, ChatCopy, ChatSave, ChatShare];
  const interactive = isActive;

  return (
    <div className="flex items-end gap-3">
      <div className="mb-9 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E9ECFF]">
        <img src={AiChat} alt="" className="h-6 w-6" />
      </div>

      <div className="w-fit max-w-[70%] min-w-0">
        <div className="max-w-full whitespace-pre-wrap wrap-anywhere rounded-[16px] rounded-bl-none rounded-tl-[30px] bg-[#F3F3F3] px-5 py-4 text-[14px] text-[#111111]">
          {message.text && <p className="mb-0">{message.text}</p>}

          <BotMessageContent
            message={message}
            interactive={interactive}
            onOptionSelect={onOptionSelect}
            onDateSelect={onDateSelect}
            onTimeSelect={onTimeSelect}
            onSummaryAction={onSummaryAction}
            onChangeAction={onChangeAction}
            onStatusAction={onStatusAction}
          />
        </div>

        <div className="mt-2 flex w-full items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            {actions.map((actionIcon, index) => (
              <button
                key={index}
                type="button"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#F4F4F4] text-[#111111] transition-all duration-200 hover:bg-[#e9ecff] hover:shadow-sm"
                aria-label="Message action"
              >
                <img src={actionIcon} alt="" className="w-3.5" />
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[#8D97A9]">{message.time}</p>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// BotMessageContent — interactive blocks inside the bot bubble
// -----------------------------------------------------------------------------
function BotMessageContent({
  message,
  interactive,
  onOptionSelect,
  onDateSelect,
  onTimeSelect,
  onSummaryAction,
  onChangeAction,
  onStatusAction,
}) {
  // Pick the interactive widget to render based on the message's contentType.
  // Plain "text" falls through to `return null` (the text is drawn by BotMessage).
  const { contentType = "text", payload = {} } = message;

  // Greeting buttons (Schedule Meeting / Draft Email / Create a Task).
  if (contentType === "quick_actions") {
    return (
      <div className={`flex flex-wrap gap-2 ${message.text ? "mt-3" : ""}`}>
        {payload.options?.map((option) => (
          <button
            key={option}
            type="button"
            disabled={!interactive}
            onClick={() => onOptionSelect(option)}
            className="cursor-pointer rounded-lg border border-[#4866F6] bg-white px-3 py-1.5 text-[14px] font-medium text-[#4866F6] transition-colors hover:bg-[#4866F6] hover:text-white disabled:cursor-default disabled:opacity-60"
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  // Calendar dropdown for the date step.
  if (contentType === "date_picker") {
    return (
      <div className={message.text ? "mt-3" : ""}>
        <ChatDatePickerField
          label={payload.placeholder || "Select Date"}
          disabled={!interactive}
          onChange={onDateSelect}
        />
      </div>
    );
  }

  // HH / MM / AM-PM selectors for the time step.
  if (contentType === "time_picker") {
    return (
      <div className={message.text ? "mt-3" : ""}>
        <ChatTimePickerRow disabled={!interactive} onSubmit={onTimeSelect} />
      </div>
    );
  }

  // Generic option pills (used for priority Low/Medium/High).
  if (contentType === "options") {
    return (
      <div className={`flex flex-wrap gap-2 ${message.text ? "mt-3" : ""}`}>
        {payload.options?.map((option) => (
          <button
            key={option}
            type="button"
            disabled={!interactive}
            onClick={() => onOptionSelect(option)}
            className="cursor-pointer  rounded-lg border border-[#4866F6] bg-[#EEF2FF] px-4 py-1.5 text-[14px] font-medium text-[#4866F6] transition-colors hover:bg-[#4866F6] hover:text-white disabled:cursor-default disabled:opacity-60"
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  // Single pill like "Change Deadline" / "Change Priority" after a skip.
  if (contentType === "change_action") {
    return (
      <div className={message.text ? "mt-3" : ""}>
        <button
          type="button"
          disabled={!interactive}
          onClick={() => onChangeAction(payload.actionId)}
          className="rounded-full border border-[#4866F6] bg-white px-4 py-1.5 text-[12px] font-medium text-[#4866F6] hover:bg-[#4866F6] hover:text-white disabled:cursor-default disabled:opacity-60"
        >
          {payload.label}
        </button>
      </div>
    );
  }

  // Summary card listing the collected fields, with Edit/Confirm when active.
  if (contentType === "summary") {
    return (
      <div className={message.text ? "mt-3" : ""}>
        <div className="rounded-lg border border-[#E0E0E0] bg-white px-4 py-3">
          {payload.fields?.map((row) => (
            <div key={row.label} className="mb-2 last:mb-0">
              <span className="font-medium text-[#111111]">{row.label}: </span>
              <span className="text-[#586D93]">{row.value}</span>
            </div>
          ))}
        </div>
        {interactive && (
          <div className="mt-3 flex flex-wrap justify-around gap-2">
            <button
              type="button"
              onClick={() => onSummaryAction("edit")}
              className="rounded-full border border-[#4866F6] bg-[#EEF2FF] px-10 py-2 text-[14px] font-medium text-[#4866F6] hover:bg-[#4866F6] hover:text-white cursor-pointer"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onSummaryAction("confirm")}
              className="rounded-full border border-[#4866F6] bg-[#EEF2FF] px-6.5 py-2 text-[14px] font-medium text-[#4866F6] hover:bg-[#4866F6] hover:text-white cursor-pointer"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    );
  }

  // Transient "Executing..." card shown while runMockExecution runs.
  if (contentType === "processing") {
    return (
      <div className={message.text ? "mt-3" : ""}>
        <div className="rounded-lg border border-[#B8C9FF] bg-[#F5F7FF] px-4 py-3">
          <p className="mb-2 text-[14px] font-medium text-[#4866F6]">
            Executing...
          </p>
          <ul className="space-y-1 text-[14px] text-[#586D93]">
            {payload.steps?.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Green result card after a successful execution, with follow-up actions.
  if (contentType === "success") {
    return (
      <div className={message.text ? "mt-3" : ""}>
        <div className="rounded-lg border border-[#33B469] bg-[#F0FDF4] px-4 py-3">
          <p className="mb-2 text-[14px] font-medium text-[#33B469]">
            {payload.title}
          </p>
          {payload.details?.map((row) => (
            <p key={row.label} className="mb-1 text-[14px] text-[#586D93]">
              {row.label === "Date" || row.label === "Time" ? (
                <>
                  <span className="font-medium text-[#111111]">
                    {row.label}
                  </span>
                  <span className="text-[#586D93]">
                    {row.value ? `: ${row.value}` : ""}
                  </span>
                </>
              ) : (
                <>
                  {row.label}
                  {row.value ? `: ${row.value}` : ""}
                </>
              )}
            </p>
          ))}
        </div>
        {interactive && payload.actions?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {payload.actions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => onStatusAction(action.id)}
                className="cursor-pointer rounded-full border border-[#4866F6] bg-[#EEF2FF] hover:bg-[#4866F6] hover:text-white px-4 py-2 text-[14px] font-medium text-[#4866F6]"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Red result card after a failed execution, with Retry / Edit details.
  if (contentType === "error") {
    return (
      <div className={message.text ? "mt-3" : ""}>
        <div className="rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3">
          <p className="mb-1 text-[13px] font-semibold text-[#B91C1C]">
            {payload.title}
          </p>
          <p className="text-[12px] text-[#586D93]">{payload.description}</p>
        </div>
        {interactive && payload.actions?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {payload.actions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => onStatusAction(action.id)}
                className="rounded-full border border-[#4866F6] bg-white px-4 py-2 text-[12px] font-medium text-[#4866F6]"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Plain text messages have no extra widget.
  return null;
}

// -----------------------------------------------------------------------------
// ChatDatePickerField — calendar from Payment Report pattern (inlined for demo)
// -----------------------------------------------------------------------------
// Trigger button + portalled calendar popup. Uses a portal so the popup can
// escape any parent overflow/clipping and be positioned freely on screen.
function ChatDatePickerField({ label, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [panelStyle, setPanelStyle] = useState({
    top: 0,
    left: 0,
    width: 260,
  });
  const containerRef = useRef(null); // the trigger button wrapper
  const panelRef = useRef(null); // the popup, for outside-click detection

  const displayText = value ? dayjs(value).format("DD MMM YYYY") : label;

  // Measure the trigger and place the popup just below it (fixed-position coords).
  const updatePanelPosition = () => {
    const trigger = containerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    setPanelStyle({
      top: rect.bottom + 8,
      left: rect.left,
      width: Math.max(rect.width, 260),
    });
  };

  // While the popup is open, wire up dismiss + reposition listeners and tear
  // them down on close (or when `open` changes).
  useEffect(() => {
    if (!open) return;

    updatePanelPosition();

    // Close when clicking anywhere outside the trigger or the popup.
    const handlePointerDown = (event) => {
      if (
        containerRef.current?.contains(event.target) ||
        panelRef.current?.contains(event.target)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    // Keep the popup glued to the trigger as the page resizes/scrolls.
    const handleReposition = () => updatePanelPosition();

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open]);

  const handleSelect = (dateValue) => {
    setValue(dateValue);
    setOpen(false);
    if (dateValue) onChange(dateValue);
  };

  const toggleOpen = () => {
    if (disabled) return;
    if (!open) updatePanelPosition();
    setOpen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`relative min-w-[220px] ${open ? "mb-75" : ""}`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={toggleOpen}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-[#CFCFCF] bg-white py-2.5 pl-3 pr-3 text-left text-sm disabled:cursor-default disabled:opacity-60"
      >
        <span
          className={`min-w-0 flex-1 truncate ${value ? "text-slate-700" : "text-[#8D97A9]"}`}
        >
          {displayText}
        </span>
        <img src={calendarIcon} alt="" className="h-5 w-5 shrink-0" />
      </button>

      {/* Render the panel into document.body so it isn't clipped by ancestors. */}
      {open &&
        !disabled &&
        createPortal(
          <div
            ref={panelRef}
            style={{
              position: "fixed",
              top: panelStyle.top,
              left: panelStyle.left,
              width: panelStyle.width,
              zIndex: 9999,
            }}
          >
            <ChatDatePickerPanel
              label={label}
              value={value}
              onSelect={handleSelect}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}

// The month grid itself: header with prev/next arrows + a 7-column day grid.
function ChatDatePickerPanel({ label, value, onSelect }) {
  // Which month is currently displayed (defaults to the selected/current month).
  const [viewDate, setViewDate] = useState(() =>
    dayjs(value || undefined).startOf("month"),
  );

  const daysInMonth = viewDate.daysInMonth();
  const firstWeekday = viewDate.startOf("month").day(); // 0=Sun blank-cell offset
  const selectedDate = value ? dayjs(value) : null;
  const today = dayjs().startOf("day");
  const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Build the grid: leading nulls pad the days before the 1st, then 1..N.
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);

  const handleDaySelect = (day) => {
    onSelect(viewDate.date(day).format("YYYY-MM-DD"));
  };

  return (
    <div
      role="dialog"
      aria-label={`${label} calendar`}
      className="w-full h-full rounded-xl border border-[#CFCFCF] bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
    >
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewDate((prev) => prev.subtract(1, "month"))}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#586D93] hover:bg-slate-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-medium text-[#3D3D3D]">
          {viewDate.format("MMMM YYYY")}
        </p>
        <button
          type="button"
          onClick={() => setViewDate((prev) => prev.add(1, "month"))}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#586D93] hover:bg-slate-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdayLabels.map((weekday) => (
          <span
            key={weekday}
            className="py-1 text-center text-xs font-medium text-[#8D97A9]"
          >
            {weekday}
          </span>
        ))}
        {cells.map((day, index) => {
          // Padding cell before the 1st of the month.
          if (day === null) {
            return <span key={`empty-${index}`} aria-hidden="true" />;
          }

          // Highlight the selected day (solid) and today (tinted).
          const cellDate = viewDate.date(day).startOf("day");
          const isSelected = selectedDate?.isSame(cellDate, "day");
          const isToday = today.isSame(cellDate, "day");

          return (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => handleDaySelect(day)}
              className={`flex h-7 w-full cursor-pointer items-center justify-center rounded-lg text-sm transition-colors ${
                isSelected
                  ? "bg-[#4866F6] font-medium text-white"
                  : isToday
                    ? "bg-[#E4E8FE] text-[#4866F6] hover:bg-[#d8ddfd]"
                    : "text-[#586D93] hover:bg-slate-50"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// ChatTimePickerRow — HH / MM / AM-PM selectors
// -----------------------------------------------------------------------------
// Three dropdowns (hour / minute / AM-PM) plus a "Set Time" button.
function ChatTimePickerRow({ onSubmit, disabled }) {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [meridiem, setMeridiem] = useState("PM");

  // Emit the combined label, e.g. "12:00 PM".
  const handleApply = () => {
    onSubmit(`${hour}:${minute} ${meridiem}`);
  };

  const selectClass =
    "rounded-lg border border-[#CFCFCF] bg-white px-2 py-2 text-[14px] text-[#586D93] outline-none disabled:opacity-60";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={hour}
        disabled={disabled}
        onChange={(e) => setHour(e.target.value)}
        className={selectClass}
        aria-label="Hour"
      >
        {HOUR_OPTIONS.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <select
        value={minute}
        disabled={disabled}
        onChange={(e) => setMinute(e.target.value)}
        className={selectClass}
        aria-label="Minute"
      >
        {MINUTE_OPTIONS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        value={meridiem}
        disabled={disabled}
        onChange={(e) => setMeridiem(e.target.value)}
        className={selectClass}
        aria-label="AM or PM"
      >
        {MERIDIEM_OPTIONS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={disabled}
        onClick={handleApply}
        className="cursor-pointer rounded-lg border border-[#4866F6] bg-[#4866F6] px-3 py-1.5 text-[14px] font-medium text-white disabled:opacity-60"
      >
        Set Time
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// UserMessage — right aligned user message with edit action
// -----------------------------------------------------------------------------
// Right-aligned user bubble with an edit button and timestamp.
function UserMessage({ message, onEdit }) {
  return (
    <div className="flex justify-end">
      <div className="flex w-full min-w-0 items-end justify-end gap-3">
        <div className="flex w-fit max-w-[70%] md:max-w-[80%] lg:max-w-[70%] min-w-0 flex-col items-end">
          <div className="max-w-full min-w-[80px] whitespace-pre-wrap wrap-anywhere rounded-[16px] rounded-br-none rounded-tr-[30px] bg-[#4866F6] px-5 py-4 text-[14px] text-white">
            {message.text}
          </div>

          <div className="mt-2 flex w-full items-center justify-between gap-1">
            <button
              type="button"
              onClick={() => onEdit(message)}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#F4F4F4] text-[#111111] transition-all duration-200 hover:bg-[#e9ecff] hover:shadow-sm"
              aria-label="Edit message"
            >
              <img src={ChatEdit} alt="" className="h-3.5 w-3.5" />
            </button>
            <p className="text-[11px] text-[#8D97A9]">{message.time}</p>
          </div>
        </div>

        <img
          src={Profile}
          alt=""
          className="mb-9 h-10 w-10 shrink-0 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
