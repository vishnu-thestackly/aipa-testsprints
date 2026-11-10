import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAiIntelligence,
  updateAiIntelligence,
} from "../../../../src/api/authApi";
import { useTheme } from "../../../context/ThemeContext";

// Toggle Component
const ToggleSwitch = ({ enabled, setEnabled, isDark }) => (
  <button
    type="button"
    onClick={() => setEnabled(!enabled)}
    className={`${
      enabled
        ? "bg-[#4866F6]"
        : isDark
        ? "bg-[#34445E]"
        : "bg-[#D1D5DB]"
    } relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer mt-2 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
  >
    <span
      className={`${
        enabled ? "translate-x-5" : "translate-x-0"
      } pointer-events-none inline-block h-4 w-4 transform rounded-full ${
        isDark ? "bg-black" : "bg-white"
      } shadow-lg ring-0 transition duration-200 ease-in-out`}
    />
  </button>
);

// Checkbox Component
const Checkbox = ({ label, checked, onChange, isDark }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />

      <div
        className={`w-[20px] h-[20px] rounded border-2 ${
          checked
            ? "bg-[#4866F6] border-[#4866F6]"
            : isDark
            ? "bg-[#060D1B] border-[#4866F6]"
            : "bg-white border-[#4866F6]"
        } flex items-center justify-center`}
      >
        {checked && (
          <svg
            className={`w-3 h-3 ${
              isDark ? "text-black" : "text-white"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>

    <span
      className={`text-[15px] ml-3 ${
        isDark ? "text-[#586D93]" : "text-[#586D93]"
      }`}
    >
      {label}
    </span>
  </label>
);

export default function AIIntelligence() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [personalization, setPersonalization] = useState(true);
  const [defaultTone, setDefaultTone] = useState(true);
  const [responseLength, setResponseLength] = useState(true);
  const [memoryStorage, setMemoryStorage] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [autoAdapt, setAutoAdapt] = useState({
    userPreferences: true,
    receiptType: true,
    previousInteraction: true,
    communicationContext: true,
  });

  const [categories, setCategories] = useState({
    preferences: true,
    communicationStyle: true,
    meetingPattern: true,
    taskHistory: true,
    conversationHistory: false,
  });

  const [retention, setRetention] = useState({
    threeMonths: false,
    sixMonths: false,
    twelveMonths: true,
  });

  useEffect(() => {
    const fetchAiIntelligence = async () => {
      try {
        const response = await getAiIntelligence();

        console.log("AI Intelligence settings:", response);

        setPersonalization(response.personalization_enabled);
        setDefaultTone(response.default_tone_enabled);
        setResponseLength(response.response_length_adaptive);
        setMemoryStorage(response.memory_storage_enabled);

        setAutoAdapt({
          userPreferences: response.auto_adapt_based_on?.includes(
            "user_preferences"
          ),
          receiptType: response.auto_adapt_based_on?.includes(
            "receipt_type"
          ),
          previousInteraction: response.auto_adapt_based_on?.includes(
            "previous_interaction"
          ),
          communicationContext: response.auto_adapt_based_on?.includes(
            "communication_context"
          ),
        });

        setCategories({
          preferences: response.memory_categories?.includes(
            "preferences"
          ),
          communicationStyle: response.memory_categories?.includes(
            "communication_style"
          ),
          meetingPattern: response.memory_categories?.includes(
            "meeting_pattern"
          ),
          taskHistory: response.memory_categories?.includes(
            "task_history"
          ),
          conversationHistory: response.memory_categories?.includes(
            "conversation_history"
          ),
        });

        setRetention({
          threeMonths: response.retention_period
            ?.split(",")
            .includes("3_months"),
          sixMonths: response.retention_period
            ?.split(",")
            .includes("6_months"),
          twelveMonths: response.retention_period
            ?.split(",")
            .includes("12_months"),
        });
      } catch (error) {
        console.error(
          "Failed to fetch AI Intelligence settings:",
          error
        );
      }
    };

    fetchAiIntelligence();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const payload = {
        personalization_enabled: personalization,
        default_tone_enabled: defaultTone,
        response_length_adaptive: responseLength,

        auto_adapt_based_on: [
          ...(autoAdapt.userPreferences
            ? ["user_preferences"]
            : []),
          ...(autoAdapt.receiptType ? ["receipt_type"] : []),
          ...(autoAdapt.previousInteraction
            ? ["previous_interaction"]
            : []),
          ...(autoAdapt.communicationContext
            ? ["communication_context"]
            : []),
        ],

        memory_storage_enabled: memoryStorage,

        memory_categories: [
          ...(categories.preferences ? ["preferences"] : []),
          ...(categories.communicationStyle
            ? ["communication_style"]
            : []),
          ...(categories.meetingPattern
            ? ["meeting_pattern"]
            : []),
          ...(categories.taskHistory ? ["task_history"] : []),
          ...(categories.conversationHistory
            ? ["conversation_history"]
            : []),
        ],

        retention_period: [
          ...(retention.threeMonths ? ["3_months"] : []),
          ...(retention.sixMonths ? ["6_months"] : []),
          ...(retention.twelveMonths ? ["12_months"] : []),
        ].join(","),
      };

      console.log("Sending AI Intelligence payload:", payload);

      const response = await updateAiIntelligence(payload);

      console.log("AI Intelligence updated:", response);

      alert("AI Intelligence settings saved successfully!");
    } catch (error) {
      console.error("Failed to update AI Intelligence:", error);
      alert("Failed to save AI Intelligence settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10 scrollbar-hide ${ isDark ? "bg-[#010718]" : "  " }`}
    >
      <div className="w-full flex flex-col gap-5">
        <div
          className={`w-full rounded-[18px] md:rounded-[25px] border p-[12px] md:p-6 shadow-[0px_0px_4px_0px_#00000014] ${
            isDark
              ? "bg-[#060D1B] "
              : "border-[#DADADA] bg-white"
          }`}
        >
          {/* Header */}
          <h2
            className={`w-[220px] h-[21px] leading-[100%] tracking-[0%] font-[510] text-[18px] whitespace-nowrap ${
              isDark ? "text-[#FFFFFF]" : "text-[#3D3D3D]"
            }`}
          >
            AI Intelligence
          </h2>

          <div
            className={`border-b mt-4 mb-6 ${
              isDark ? "border-[#586D93]" : "border-[#CFCFCF]"
            }`}
          />

          {/* Content Box */}
          <div
            className={`border-0 sm:border rounded-2xl p-0 sm:p-6 shadow-none sm:shadow-sm ${
              isDark
                ? "sm:border-[#586D93]"
                : "sm:border-[#E5E7EB]"
            }`}
          >
            {/* Section 1 */}
            <h2
              className={`text-[18px] font-semibold mb-3 ${
                isDark ? "text-[#F5F7FA]" : "text-[#3D3D3D]"
              }`}
            >
              Adoptive Tone & Personalization
            </h2>

            <div
              className={`w-full h-[1px] mb-4 ${
                isDark ? "bg-[#586D93]" : "bg-[#E5E7EB]"
              }`}
            />

            {/* 3 Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:gap-4 mb-6 mt-5">
              <div>
                <p
                  className={`text-[15px] style-medium lg:mt-[10px] mb-2 ${
                    isDark ? "text-[#586D93]" : "text-[#586D93]"
                  }`}
                >
                  Personalization Status
                </p>

                <ToggleSwitch
                  enabled={personalization}
                  setEnabled={setPersonalization}
                  isDark={isDark}
                />
              </div>

              <div>
                <p
                  className={`text-[15px] lg:mt-[10px] mb-2 ${
                    isDark ? "text-[#586D93]" : "text-[#586D93]"
                  }`}
                >
                  Default Tone
                </p>

                <ToggleSwitch
                  enabled={defaultTone}
                  setEnabled={setDefaultTone}
                  isDark={isDark}
                />
              </div>

              <div>
                <p
                  className={`text-[15px] lg:mt-[10px] mb-2 ${
                    isDark ? "text-[#586D93]" : "text-[#586D93]"
                  }`}
                >
                  Response Length
                </p>

                <ToggleSwitch
                  enabled={responseLength}
                  setEnabled={setResponseLength}
                  isDark={isDark}
                />
              </div>
            </div>

            {/* Auto Adapt */}
            <h3
              className={`text-[18px] font-medium mb-3 ${
                isDark ? "text-[#F5F7FA]" : "text-[#3D3D3D]"
              }`}
            >
              Auto Adapt Tone Based
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-4 mb-6 mt-7">
              <Checkbox
                label="User Preferences"
                checked={autoAdapt.userPreferences}
                isDark={isDark}
                onChange={() =>
                  setAutoAdapt({
                    ...autoAdapt,
                    userPreferences: !autoAdapt.userPreferences,
                  })
                }
              />

              <Checkbox
                label="Receipt Type"
                checked={autoAdapt.receiptType}
                isDark={isDark}
                onChange={() =>
                  setAutoAdapt({
                    ...autoAdapt,
                    receiptType: !autoAdapt.receiptType,
                  })
                }
              />

              <Checkbox
                label="Previous Interaction"
                checked={autoAdapt.previousInteraction}
                isDark={isDark}
                onChange={() =>
                  setAutoAdapt({
                    ...autoAdapt,
                    previousInteraction:
                      !autoAdapt.previousInteraction,
                  })
                }
              />

              <Checkbox
                label="Communication Context"
                checked={autoAdapt.communicationContext}
                isDark={isDark}
                onChange={() =>
                  setAutoAdapt({
                    ...autoAdapt,
                    communicationContext:
                      !autoAdapt.communicationContext,
                  })
                }
              />
            </div>

            {/* Section 2 */}
            <h2
              className={`text-[18px] font-medium mb-3 mt-10 ${
                isDark ? "text-[#F5F7FA]" : "text-[#3D3D3D]"
              }`}
            >
              Long Term Memory Consent
            </h2>

            <div
              className={`w-full h-[1px] mb-4 ${
                isDark ? "bg-[#586D93]" : "bg-[#E5E7EB]"
              }`}
            />

            {/* Memory Storage */}
            <div className="mb-5">
              <p
                className={`text-[15px] mb-2 mt-6 ${
                  isDark ? "text-[#586D93]" : "text-[#586D93]"
                }`}
              >
                Memory Storage
              </p>

              <ToggleSwitch
                enabled={memoryStorage}
                setEnabled={setMemoryStorage}
                isDark={isDark}
              />
            </div>

            {/* Categories */}
            <h3
              className={`text-[18px] font-medium mb-3 mt-5 ${
                isDark ? "text-[#F5F7FA]" : "text-[#3D3D3D]"
              }`}
            >
              Categories
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-3 gap-x-4 mb-5 mt-6 lg:mt-[30px]">
              <Checkbox
                label="Preferences"
                checked={categories.preferences}
                isDark={isDark}
                onChange={() =>
                  setCategories({
                    ...categories,
                    preferences: !categories.preferences,
                  })
                }
              />

              <Checkbox
                label="Communication Style"
                checked={categories.communicationStyle}
                isDark={isDark}
                onChange={() =>
                  setCategories({
                    ...categories,
                    communicationStyle:
                      !categories.communicationStyle,
                  })
                }
              />

              <Checkbox
                label="Meeting Pattern"
                checked={categories.meetingPattern}
                isDark={isDark}
                onChange={() =>
                  setCategories({
                    ...categories,
                    meetingPattern: !categories.meetingPattern,
                  })
                }
              />

              <Checkbox
                label="Task History"
                checked={categories.taskHistory}
                isDark={isDark}
                onChange={() =>
                  setCategories({
                    ...categories,
                    taskHistory: !categories.taskHistory,
                  })
                }
              />

              <Checkbox
                label="Conversation History"
                checked={categories.conversationHistory}
                isDark={isDark}
                onChange={() =>
                  setCategories({
                    ...categories,
                    conversationHistory:
                      !categories.conversationHistory,
                  })
                }
              />
            </div>

            {/* Retention */}
            <h3
              className={`text-[18px] font-medium mb-3 lg:mt-[40px] mt-6 ${
                isDark ? "text-[#F5F7FA]" : "text-[#3D3D3D]"
              }`}
            >
              Retension Period
            </h3>

            <div className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-3 mb-6 mt-7">
              <Checkbox
                label="3 Months"
                checked={retention.threeMonths}
                isDark={isDark}
                onChange={() =>
                  setRetention({
                    ...retention,
                    threeMonths: !retention.threeMonths,
                  })
                }
              />

              <Checkbox
                label="6 Months"
                checked={retention.sixMonths}
                isDark={isDark}
                onChange={() =>
                  setRetention({
                    ...retention,
                    sixMonths: !retention.sixMonths,
                  })
                }
              />

              <Checkbox
                label="12 Months"
                checked={retention.twelveMonths}
                isDark={isDark}
                onChange={() =>
                  setRetention({
                    ...retention,
                    twelveMonths: !retention.twelveMonths,
                  })
                }
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-8 sm:mt-12">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="w-[102px] h-[44px] rounded-full bg-[#4866F6] text-white text-[14px] hover:opacity-90 active:scale-95 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





 