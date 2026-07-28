

import ChatDatePickerField from "./actions/ChatDatePickerField";
import ChatTimePickerField from "./actions/ChatTimePickerField";
import PriorityButtons from "./actions/PriorityButtons";
import TaskSummary from "./actions/TaskSummary";

export default function BotMessageContent({
  message,
  onAction,
}) {
  if (message.needs_date_trigger) {
    return (
      <div className="mt-3">
        <ChatDatePickerField
          data={{ include_date: true }}
          onAction={onAction}
        />
      </div>
    );
  }

  if (message.needs_time_trigger) {
    return (
      <div className="mt-3">
        <ChatTimePickerField
          onAction={onAction}
        />
      </div>
    );
  }

  if (message.needs_priority_trigger) {
    return (
      <div className="mt-3">
        <PriorityButtons
          data={{ buttons: message.suggested_actions }}
          onAction={onAction}
        />
      </div>
    );
  }

  if (
  message.task_summary &&
  !message.requires_clarification
) {
  return (
    <div className="mt-3">
      <TaskSummary
        data={message.task_summary}
        actions={message.suggested_actions}
        onAction={onAction}
      />
    </div>
  );
}

  return null;
}