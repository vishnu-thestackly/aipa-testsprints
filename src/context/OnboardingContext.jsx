import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export const initialOnboardingState = {
  avatarFileName: "",
  avatarFile: null,
  avatarUrl: "", 
  fullName: "",
  mobile: "",
  AlterMobile: "",
  countryCode: "+91",
  meetingTimes: ["All"],
  emailTone: "Formal",
  taskPriority: "High",
  autoMarkUrgent: true,
  reminderFrequency: ["Daily"],
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
  const [data, setData] = useState(initialOnboardingState);

  const updateOnboarding = useCallback((partial) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const toggleMeetingTime = useCallback((time) => {
    setData((prev) => {
      const exists = prev.meetingTimes.includes(time);
      return {
        ...prev,
        meetingTimes: exists
          ? prev.meetingTimes.filter((t) => t !== time)
          : [...prev.meetingTimes, time],
      };
    });
  }, []);

  const toggleReminderFrequency = useCallback((frequency) => {
    setData((prev) => {
      const exists = prev.reminderFrequency.includes(frequency);
      return {
        ...prev,
        reminderFrequency: exists
          ? prev.reminderFrequency.filter((item) => item !== frequency)
          : [...prev.reminderFrequency, frequency],
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
