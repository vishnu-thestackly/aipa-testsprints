import { useState } from "react";
import { Eye, EyeOff} from "lucide-react";
import VectorImg from "../../assets/images/VectorImg.png"
import  Calendar from "../../assets/images/Calendar.png"

export default function PaymentMethod({ onClose }) {
  const [selectedOption, setSelectedOption] = useState("card");
  const [saveCard, setSaveCard] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false); 

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const paymentOptions = [
    { id: "card", title: "Credit Card / Debit card", desc: "Secure transfer using your bank account" },
    { id: "upi", title: "UPI", desc: "Secure transfer using your UPI account" },
    { id: "netbanking", title: "Netbanking", desc: "Secure transfer using your Netbanking account" },
    { id: "wallet", title: "Wallets", desc: "Secure transfer using your Wallets" }
  ];

  const planData = {
    plan: "Free plan",
    planDesc: "Best plan for the fresher individuals",
    totalAmount: "₹0",
    taxes: "₹0",
    discount: "₹0",
    grandTotal: "₹0"
  };

  const handleCVVChange = (e) => {
    setCvv(e.target.value.replace(/\D/g, '').slice(0, 3));
  };

  const handleCardNumber = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    val = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(val);
  };

  // Date picker functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for(let i = 0; i < firstDay; i++) days.push(null);
    for(let i = 1; i <= daysInMonth; i++) days.push(i);

    return days;
  };

  const selectDate = (day) => {
    if(!day) return;
    const month = currentMonth.getMonth() + 1;
    const year = currentMonth.getFullYear();
    const formattedMonth = month.toString().padStart(2, '0');
    setExpiry(`${formattedMonth} / ${year}`);
    setShowDatePicker(false);
  };

  const changeMonth = (dir) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + dir));
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('en', { month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="relative w-full max-w-[1000px] lg:h-[650px] bg-[#F5F7FA] rounded-2xl p-5 sm:p-6 lg:p-8 shadow-2xl flex-col">

        <img src={VectorImg} alt="close" onClick={onClose} className="absolute top-3 right-3 lg:top-4 lg:right-4 w-5 h-5 lg:w-6 lg:h-6 cursor-pointer hover:opacity-80"/>

        <div className="text-center mb-5 lg:mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold font-['SF_Pro'] text-[#4866F6] mb-1">Payment Method</h2>
          <p className="text-base font-['SF_Pro'] text-[#8D97A9]">Choose a payment option and fill in the requested information</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 rounded-2xl bg-[#FFFFFF] lg:gap-6 h-[calc(100%-100px)] flex-1 overflow-hidden">

          {/* Left */}
          <div className="flex-1 lg:w-[58%] overflow-y-auto scrollbar-hide lg:pr-3">
            <h3 className="text-xl font-semibold font-['SF_Pro'] text-[#3D3D3D] lg:mt-2 lg:ml-7 mt-2 ml-5 mb-4">Payment Options</h3>

            <div className="border-t border-[#E5E7EB] pt-3 flex-shrink-0 lg:ml-7"></div>
            <div className="space-y-3 lg:ml-7">
              {paymentOptions.map((option) => (
                <div key={option.id} className={`border rounded-lg transition-all ${selectedOption === option.id? 'border-[#F3F3F3] bg-[#F3F3F3]' : 'border-[#E5E7EB] bg-[#F3F3F3]'}`}>
                  <div className="p-3.5 cursor-pointer" onClick={() => setSelectedOption(option.id)}>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[#3B82F6] flex items-center justify-center flex-shrink-0 bg-white">
                        {selectedOption === option.id && <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></div>}
                      </div>
                      <input type="radio" id={option.id} checked={selectedOption === option.id} onChange={() => setSelectedOption(option.id)} className="hidden" />
                      <div className="flex-1">
                        <label htmlFor={option.id} className="text-base font-medium font-['SF_Pro'] text-[#4866F6] cursor-pointer block">{option.title}</label>
                        <p className="text-sm text-[#8D97A9] mt-0.5">{option.desc}</p>
                      </div>
                    </div>
                  </div>

                  {selectedOption === "card" && option.id === "card" && (
                    <div className="px-3.5 pb-3.5">
                      <div className="pt-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="text-sm font-medium text-[#3D3D3D] mb-1.5 block">Name</label>
                            <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Name on the card" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-[#1F2937] placeholder-[#9CA3AF] bg-white focus:outline-none focus:ring-2 focus:ring-[#CFCFCF] focus:border-[#CFCFCF]"/>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-[#3D3D3D] mb-1.5 block">Card number</label>
                            <input type="text" value={cardNumber} onChange={handleCardNumber} placeholder=".... .... ...." maxLength="19" inputMode="numeric" className="w-full px-3 py-2  border border-gray-300 rounded-md text-sm tracking-widest font-mono  text-[#1F2937] placeholder-[#9CA3AF] bg-white focus:outline-none focus:ring-2 focus:ring-[#CFCFCF] focus:border-[#CFCFCF]"/>
                          </div>
                        </div>

                        {/* Expiry + CVV */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                          <div className="relative">
                            <label className="text-sm font-medium text-[#3D3D3D] mb-1.5 block">Expiry Date</label>
                            <div className="relative">
                              <input type="text" value={expiry} readOnly placeholder="MM / YYYY" className="w-full px-3 py-2 pr-9 border border-gray-300 rounded-md text-sm text-[#1F2937] placeholder-[#9CA3AF] bg-white focus:outline-none focus:ring-2 focus:ring-[#CFCFCF] cursor-pointer"/>
                              <button type="button" onClick={() => setShowDatePicker(!showDatePicker)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer">
                               <img src= {Calendar} alt="" className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Date Table Popup */}
                            {showDatePicker && (
                              <div className="absolute z-50 mt-2 bg-white border-gray-300 rounded-lg shadow-lg p-4 w-64">
                                <div className="flex justify-between items-center mb-3">
                                  <button onClick={() => changeMonth(-1)} className="text-[#4866F6] hover:bg-gray-100 p-1 rounded">‹</button>
                                  <span className="text-sm font-semibold text-[#3D3D3D]">{monthName}</span>
                                  <button onClick={() => changeMonth(1)} className="text-[#4866F6] hover:bg-gray-100 p-1 rounded">›</button>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-xs text-center text-[#8D97A9] mb-2">
                                  {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-sm text-center">
                                  {days.map((day, idx) => (
                                    <button key={idx} onClick={() => selectDate(day)} disabled={!day} className={`p-1 rounded ${day? 'hover:bg-[#4866F6] hover:text-white text-[#3D3D3D]' : 'text-gray-300 cursor-default'}`}>
                                      {day}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-[#3D3D3D] mb-1.5 block">CVV</label>
                            <div className="relative">
                              <input type={showCVV? "text" : "password"} value={cvv} onChange={handleCVVChange} placeholder="..." inputMode="numeric" maxLength="3" className="w-full px-3 py-2 pr-9 border border-gray-300 rounded-md text-sm tracking-widest font-mono text-[#1F2937] placeholder-[#9CA3AF] bg-white focus:outline-none focus:ring-2 focus:ring-[#CFCFCF] focus:border-[#CFCFCF]"/>
                              <button type="button" onClick={() => setShowCVV(!showCVV)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer z-10">
                                {showCVV? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-2">
                <input type="checkbox" id="saveCard" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} className="w-4 h-4 rounded border-[#4866FA] cursor-pointer" style={{ accentColor: '#3B82F6' }}/>
                <label htmlFor="saveCard" className="text-sm text-[#586D93] cursor-pointer">Save this payment method for future use</label>
              </div>
            </div>
          </div>

          {/* Right - Payment Details */}
          <div className="lg:w-[42%] flex-shrink-0">
            <div className="bg-[#176BCC] rounded-2xl p-5 sm:p-6 h-full flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold lg:ml-20 font-['SF_Pro'] text-white">Payment Details</h3>
              </div>
              <div className="mb-5">
                <button className="bg-[#FFFFFF] text-[#2563EB] ml-[100px] lg:ml-[230px] md:ml-[500px] px-3.5 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition cursor-pointer hover:opacity-80">Change plan</button>
                <p className="text-[#FFFFFF] font-semibold mb-0.5 lg:mt-[-25px] text-base mt-[-25px]">{planData.plan}</p>
                <p className="text-[#FFFFFF] text-sm lg:mt-2">{planData.planDesc}</p>
              </div>
              <div className="border-t border-dashed border-[#CFCF] my-4" />
              <div className="flex-1 space-y-3 mb-6">
                <p className="text-[#FFFFFF] font-medium mb-3">Payment Details</p>
                <div className="flex justify-between text-sm"><span className="text-[#FFFFFF]">Total Plan Amount :</span><span className="text-white font-medium">{planData.totalAmount}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#FFFFFF]">Taxes :</span><span className="text-white font-medium">{planData.taxes}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#FFFFFF]">Discount% :</span><span className="text-[#FFFFFF] font-medium">{planData.discount}</span></div>
                <div className="border-t border-dashed border-[#CFCF] my-4" />
                <div className="flex justify-between text-sm"><span className="text-[#FFFFFF] lg:ml-[200px] ml- md:ml-[400px]">Total Amount :</span><span className="text-[#FFFFFF] font-semibold">{planData.grandTotal}</span></div>
              </div>
              <button className="w-full h-10 bg-white lg:mt-7 lg:w-[340px] text-blue-600 rounded-full text-sm font-semibold hover:bg-gray-100 cursor-pointer hover:opacity-80">Pay Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

