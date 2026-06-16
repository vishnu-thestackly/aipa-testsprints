import BackGrounImage from "../assets/images/BackGrounImage.png";
import Arrow from "../assets/images/Arrow.png";
import Search from "../assets/images/Search.png";
import Frame from "../assets/images/Frame.png";
import { useNavigate } from "react-router-dom";
import Card from "../components/conversationpage/Card";
import Navbar from "../components/common/Navbar";
import { useState } from "react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState([]);
    const [showLangSpace, setShowLangSpace] = useState(false);
const navigate=useNavigate();

    const toggle = (i) => {
        setOpenIndex((prev) =>
            prev.includes(i)
                ? prev.filter((item) => item !== i)
                : [...prev, i]
        );
    };

    const faqData = [
        {
            question: "What can this AI Personal Assistant do ?",
            answer:
                "Helps you manage tasks and reminders effortlessly. Get instant answers whenever you need them.",
        },
        {
            question: "How do I start the new conversation ?",
            answer:
                "Tap on “Start New Conversation.” You’ll be ready to begin instantly.",
        },
        {
            question: "Is my data Secure ?",
            answer:
                "Yes — your conversations are kept private and are not shared with advertisers.",
        },
        {
            question: "How do I Contact Support team ?",
            answer:
                "You can contact our support team through the Help Center or by using the support/chat option available in the application.",
        },
        {
            question: "Can I change language setting ?",
            answer:
                "Yes, you can change the language anytime in the Top bar section of the application.",
        },
    ];

    return (
        <div className="relative w-full h-screen overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* BACKGROUND */}
            <img
                src={BackGrounImage}
                className="fixed inset-0 w-full h-full object-cover -z-10"
                alt=""
            />

            {/* MAIN */}
            <div
                className={`w-full mx-auto flex flex-col px-[clamp(12px,2vw,32px)] pt-[2vh] transition-all duration-300 ${showLangSpace ? "pb-[120px]" : ""
                    }`}
            >

                {/* NAVBAR */}
                <div className="flex justify-center mb-[2vh] shrink-0">
                    <Navbar onLanguageClick={setShowLangSpace} />
                </div>

                {/* CARD */}
               <div className={`relative w-full mx-auto h-[95%] h-auto transition-all duration-300 ${showLangSpace ? "md:mt-[8vh] lg:mt-[8vh]" : "md:mt-0 lg:mt-0"}`}>
                    
                    <Card className="w-full h-full bg-[#FFFFFF] border border-[#DCDCDC] rounded-[clamp(18px,2.5vw,40px)] overflow-visible relative flex flex-col">

                        {/* BACK BUTTON */}
                        <div className="relative h-[9vh] shrink-0">
                            <div className="absolute top-[2vh] left-[2vw] w-[clamp(40px,4vw,44px)] h-[clamp(40px,4vw,44px)] z-50">
<div onClick={()=>navigate(-1)} className="w-full h-full bg-[#4866F6] rounded-full flex items-center justify-center cursor-pointer">                                    <img
                                        className="w-[clamp(14px,1.2vw,18px)]"
                                        src={Arrow}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1 h-0 flex justify-center overflow-y-auto overflow-x-hidden px-[clamp(12px,3vw,40px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                            <div className="w-full sm:w-[clamp(650px,55vw,900px)] min-h-max shrink-0 px-[clamp(12px,2vw,24px)] sm:px-0">

                                {/* TITLE */}
                                <div className="flex flex-col items-center gap-[2vh] shrink-0">

                                    <h1 className="text-[clamp(32px,3vw,48px)] font-bold text-[#3D3D3D] text-center leading-tight">
                                        Frequently Asked Questions (FAQ’s)
                                    </h1>

                                    <p className="text-[clamp(15px,1.2vw,20px)] text-[#586D93] text-center leading-relaxed">
                                        Find quick answers to common questions
                                        about AI Personal Assistant
                                    </p>

                                    {/* SEARCH */}
                                    <div className="w-full max-w-[420px] h-[5vh] min-h-[46px] flex items-center gap-[12px] px-[clamp(12px,1.5vw,20px)] border border-[#4866F6] rounded-full overflow-hidden">

                                        <input
                                            type="text"
                                            placeholder="Search your questions here"
                                            className="flex-1 bg-transparent outline-none text-[clamp(14px,1vw,16px)] placeholder:text-[#3D3D3D] text-[#3D3D3D]"
                                        />

                                        <img
                                            className="w-[clamp(16px,1vw,20px)] h-[clamp(16px,1vw,20px)] shrink-0"
                                            src={Search}
                                            alt=""
                                        />
                                    </div>
                                </div>

                                {/* FAQ LIST */}
                                <div className="mt-[2vh] flex flex-col flex-1 min-h-0 gap-[2vh] pb-[4vh] max-h-[45vh] ">

                                    {faqData.map((faq, item) => (
                                        <div
                                            key={item}
                                            className="w-full bg-white border border-[#ECECEC] rounded-[clamp(12px,1.5vw,24px)] p-[clamp(14px,1vw,22px)] shadow-sm"
                                        >
                                            <button
                                                onClick={() => toggle(item)}
                                                className="w-full text-left"
                                            >
                                                <div className="flex items-center justify-between gap-[16px]">

                                                    <span className="font-[510] text-[clamp(16px,1.1vw,20px)] text-[#3D3D3D] leading-[150%]">
                                                        {faq.question}
                                                    </span>

                                                    <img
                                                        className={`w-[clamp(18px,1.5vw,24px)] h-[clamp(18px,1.5vw,24px)] shrink-0 transition-transform duration-300 ${openIndex.includes(item)
                                                                ? "rotate-180"
                                                                : ""
                                                            }`}
                                                        src={Frame}
                                                        alt=""
                                                    />
                                                </div>

                                                {openIndex.includes(item) && (
                                                    <div className="mt-[1.5vh] text-[clamp(15px,1vw,18px)] leading-[180%] text-[#586D93]">
                                                        {faq.answer}
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* FOOTER DESKTOP */}
                <div className="hidden sm:flex w-full items-center justify-between py-[2vh] shrink-0">

                    <p className="font-[700] text-[clamp(12px,1vw,16px)] text-[#8D97A9]">
                        © All Rights Reserved
                    </p>

                    <div className="flex items-center gap-[1vw]">
<p onClick={()=>navigate("/help")} className="font-[700] text-[clamp(12px,1vw,16px)] text-[#8D97A9] cursor-pointer">Help</p>                            
                        
                    </div>
                </div>

                {/* FOOTER MOBILE */}
                <div className="flex sm:hidden w-full items-center justify-between py-[2vh] shrink-0">

                    <p className="font-[700] text-[12px] text-[#8D97A9]">
                        © All Rights Reserved
                    </p>

                    <div className="flex items-center gap-[8px]">

<p onClick={()=>navigate("/help")} className="font-[700] text-[12px] text-[#8D97A9] cursor-pointer">Help</p>                            Help
                        

                        <div className="w-[10px] h-0 border border-[#8D97A9] rotate-90"></div>

                        <p className="font-[700] text-[12px] text-[#8D97A9]">
                            FAQ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;