import securityDashboardIcon from "../../../assets/images/security_dashboard.svg";
import riskIcon from "../../../assets/images/risk.png";
import requestIcon from "../../../assets/images/request.png";
import activeUserIcon from "../../../assets/images/active_user.png";
import apiSecurityIcon from "../../../assets/images/apisecurity.svg";
import secureEncryptionIcon from "../../../assets/images/secure_encryption.svg";

const SUMMARY_CARDS = [
  {
    id: "score",
    label: "Security Score",
    value: "98%",
    image: securityDashboardIcon,
  },
  {
    id: "critical",
    label: "Critical Issue",
    value: "3",
    image: riskIcon,
  },
  {
    id: "vulns",
    label: "Open Vulns",
    value: "3",
    image: requestIcon,
  },
  {
    id: "sessions",
    label: "Active Sessions",
    value: "150",
    image: activeUserIcon,
  },
  {
    id: "api",
    label: "API Security",
    value: "Secure",
    image: apiSecurityIcon,
    showStatusDot: true,
  },
  {
    id: "encryption",
    label: "Encryption",
    value: "Secure",
    image: secureEncryptionIcon,
    showStatusDot: true,
  },
];

const COMPLIANCE_ITEMS = [
  { label: "Penetration Testing", status: "Passed", variant: "success" },
  { label: "Vulnerability Scan", status: "Warning", variant: "warning" },
  { label: "Session Security", status: "Secure", variant: "success" },
  { label: "Authentication", status: "Secure", variant: "success" },
  { label: "Data Encryption", status: "Secure", variant: "success" },
  { label: "GDPR Compliance", status: "Compliant", variant: "danger" },
  { label: "API Security", status: "Secure", variant: "success" },
];

const RECENT_EVENTS = [
  { id: 1, title: "Failed Login", meta: "User001", time: "10:30" },
  { id: 2, title: "Token Revoked", meta: "Admin", time: "10:31" },
  { id: 3, title: "Vulnerability", meta: "API", time: "10:40" },
];

const STATUS_STYLES = {
  success: "bg-[#33B46926] text-[#33B469]",
  warning: "bg-[#F59E0B26] text-[#F59E0B]",
  danger: "bg-[#FF3B3026] text-[#FF3B30]",
};

export default function SecurityDashboard() {
  return (
    <div className="h-[100%] overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="w-full flex flex-col bg-white rounded-[20px] md:rounded-[25px] border border-[#E2E2E2] shadow-[0px_1px_4px_0px_#00000040]">
        {/* Header */}
        <div className="mx-4 md:mx-5 lg:mx-7 py-4 md:py-5 border-b border-[#CFCFCF]">
          <h2 className="text-[18px] font-medium text-[#3D3D3D]">
            Security Dashboard
          </h2>
        </div>

        {/* Summary Cards */}
        <div className="mx-4 md:mx-5 lg:mx-7 py-5 md:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SUMMARY_CARDS.map((card) => {
              return (
                <div
                  key={card.id}
                  className="bg-white border border-[#E2E2E2] rounded-[18px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[55px] h-[55px] rounded-full bg-[#E6EBFF] flex items-center justify-center shrink-0">
                      <img
                        src={card.image}
                        alt={card.label}
                        className="w-6 h-6 object-contain"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {card.showStatusDot && (
                          <span className="w-2 h-2 rounded-full bg-[#33B469] shrink-0" />
                        )}
                        <h3 className="text-[22px] font-semibold text-[#3D3D3D] leading-tight truncate">
                          {card.value}
                        </h3>
                      </div>
                      <p className="text-[14px] text-[#586D93] mt-0.5 truncate">
                        {card.label}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="mx-4 md:mx-5 lg:mx-7 border-t border-[#CFCFCF] py-5 md:py-6">
          <h3 className="text-[18px] font-medium text-[#3D3D3D] mb-4">
            Security & Compliance
          </h3>

          <div className="mt-3 mb-3 border-b border-[#CFCFCF]" />

          <div className="flex flex-col gap-3">
            {COMPLIANCE_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 py-1"
              >
                <p className="text-[16px] font-medium text-[#3D3D3D]">
                  {item.label}
                </p>
                <span
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-[12px] font-semibold min-w-[84px] ${
                    STATUS_STYLES[item.variant]
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Security Events */}
        <div className="mx-4 md:mx-5 lg:mx-7 border-t border-[#CFCFCF] py-5 md:py-5">
          <h3 className="text-[18px] font-medium text-[#3D3D3D] mb-3">
            Recent Security Events
          </h3>

          <div className="mt-3 mb-6 border-b border-[#CFCFCF]" />

          <div className="flex flex-col gap-3">
            {RECENT_EVENTS.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between gap-3 rounded-[12px] border border-[#4866F6] bg-[#F3F5FF] px-4 py-3"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#4866F6] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-[#3D3D3D] truncate">
                      {event.title}
                    </p>
                    <p className="text-[13px] text-[#586D93] mt-0.5 truncate">
                      {event.meta}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#586D93]" />
                  <span className="text-[13px] text-[#586D93]">
                    {event.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
