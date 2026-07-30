import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

export const initialOnboardingState = {
  avatarFileName: "",
  avatarFile: "",
  avatarUrl: "", 
  avatarPreview: "",
  fullName: "",
  mobile: "",
  AlterMobile: "",
  countryCode: "+91",
  meetingTimes: [],
  emailTone: "Formal",
  taskPriority: "High",
  autoMarkUrgent: true,
  reminderFrequency: [],
  connectedIntegrations: {},
  emailAlerts: true,
  reminders: true,
  Location: "",
};

const OnboardingContext = createContext(null);

export const getMeetingTimesDisplay = (meetingTimes) =>
  meetingTimes.length > 0 ? meetingTimes.join(", ") : "—";

export const getReminderFrequencyDisplay = (reminderFrequency) =>
  reminderFrequency.length > 0 ? reminderFrequency.join(", ") : "—";

export const getEmailIntegrationStatus = (connectedIntegrations) =>
  connectedIntegrations.Gmail || connectedIntegrations.Exchange
    ? "Connected"
    : "Not connected";

export const getCalendarIntegrationStatus = (connectedIntegrations) =>
  connectedIntegrations["Google Calendar"] || connectedIntegrations.Outlook
    ? "Connected"
    : "Not connected";

export function OnboardingProvider({ children }) {
  const [data, setData] = useState(() => {
  const savedData = localStorage.getItem("onboardingData");

  return savedData
    ? JSON.parse(savedData)
    : initialOnboardingState;
});


useEffect(() => {
  localStorage.setItem("onboardingData", JSON.stringify(data));
}, [data]);

  const updateOnboarding = useCallback((partial) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

 const toggleMeetingTime = useCallback(
  (item) => {
    let updated = [...data.meetingTimes];

    if (item === "All") {
      // Toggle All
      if (updated.includes("All")) {
        updated = [];
      } else {
        updated = ["All"];
      }
    } else {
      // Remove All first
      updated = updated.filter((time) => time !== "All");

      if (updated.includes(item)) {
        updated = updated.filter((time) => time !== item);
      } else {
        updated.push(item);
      }

      // If all three are selected, replace them with All
      const allSelected =
        updated.includes("Morning") &&
        updated.includes("Afternoon") &&
        updated.includes("Evening");

      if (allSelected) {
        updated = ["All"];
      }
    }

    updateOnboarding({
      meetingTimes: updated,
    });
  },
  [data.meetingTimes, updateOnboarding]
);

  const toggleReminderFrequency = useCallback((frequency) => {
  setData((prev) => {
    // Don't allow deselecting the only selected option
    if (prev.reminderFrequency.includes(frequency)) {
      return prev;
    }

    // Only one selection allowed
    return {
      ...prev,
      reminderFrequency: [frequency],
    };
  });
}, []);

  const toggleIntegration = useCallback((name) => {
    setData((prev) => ({
      ...prev,
      connectedIntegrations: {
        ...prev.connectedIntegrations,
        [name]: !prev.connectedIntegrations[name],
      },
    }));
  }, []);

  const value = useMemo(
    () => ({
      data,
      updateOnboarding,
      toggleMeetingTime,
      toggleReminderFrequency,
      toggleIntegration,
      meetingTimesDisplay: getMeetingTimesDisplay(data.meetingTimes),
      reminderFrequencyDisplay: getReminderFrequencyDisplay(
        data.reminderFrequency,
      ),
      emailStatus: getEmailIntegrationStatus(data.connectedIntegrations),
      calendarStatus: getCalendarIntegrationStatus(data.connectedIntegrations),
    }),
    [
      data,
      updateOnboarding,
      toggleMeetingTime,
      toggleReminderFrequency,
      toggleIntegration,
    ],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }

  return context;
}
