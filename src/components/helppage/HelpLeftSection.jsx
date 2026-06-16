// HelpLeftSection.jsx

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import mailIcon from "../../assets/images/Mail.png";

const HelpLeftSection = () => {

  const navigate = useNavigate();

  return (
    <div
      className="
        relative

        w-full
        h-full

        flex
        flex-col

        pt-2
        lg:pt-4
      "
    >

      {/* BACK BUTTON */}
      
      <button
  onClick={() => navigate("/")}

  className="
    absolute

    top-0
    left-0

    w-[30px]
    h-[30px]

    min-[360px]:w-[32px]
    min-[360px]:h-[32px]

    min-[375px]:w-[34px]
    min-[375px]:h-[34px]

    min-[425px]:w-[35px]
    min-[425px]:h-[35px]

    md:w-[40px]
    md:h-[40px]

    lg:w-[40px]
    lg:h-[40px]

    xl:w-[46px]
    xl:h-[46px]

    rounded-full

    bg-[#4D5FFF]

    flex
    items-center
    justify-center

    shrink-0

    cursor-pointer

    hover:bg-[#3248ff]

    transition
  "
>
  <ArrowLeft
    className="
      w-[14px]
      h-[14px]

      min-[360px]:w-[15px]
      min-[360px]:h-[15px]

      min-[375px]:w-[16px]
      min-[375px]:h-[16px]

      min-[425px]:w-[16px]
      min-[425px]:h-[16px]

      md:w-[18px]
      md:h-[18px]

      lg:w-[18px]
      lg:h-[18px]

      xl:w-[20px]
      xl:h-[20px]
    "
    color="white"
  />
</button>
      {/* CONTENT WRAPPER */}
      <div
        className="
          w-full 

          flex
          flex-col

          items-center
          justify-center

          text-center

          flex-1

          lg:items-start
          lg:text-left

          lg:justify-center

          lg:pl-8
          xl:pl-12

          lg:mt-10
        "
      >

        {/* TITLE */}
        <h1
  className="
    text-[#3A3A3A]
    font-bold

    leading-[1.05]

    text-[1.3rem]

    min-[360px]:text-[1.5rem]

    min-[375px]:text-[1.7rem]

    min-[425px]:text-[2rem]

    md:text-center
    md:mt-6

    lg:text-left

    lg:text-[3rem]

    xl:text-[4rem]

    2xl:text-[4.5rem]

    whitespace-nowrap
  "
>
  We’re here to help
</h1>

        {/* DESCRIPTION */}
        <p
  className="
    mt-6

    max-w-[550px]

    text-[#5C74A4]

    text-[14px]
    md:text-[15px]
    lg:text-[16px]

    leading-[28px]

    text-center
    lg:text-left
  "
>
  Need support or have a question? We are here to help. Email, Call or
  complete the form to learn how AI PA can solve your problem.
</p>

        {/* EMAIL SECTION */}
        <div
          className="
            mt-10

            flex
            flex-col

            items-center

            gap-4

            md:flex-row

md:justify-center

            lg:flex-row
            lg:items-center

            lg:justify-start
          "
        >

          {/* ICON */}
          <div
            className="
              w-[36px]
              h-[36px]

              min-[375px]:w-[40px]
              min-[375px]:h-[40px]

              min-[425px]:w-[42px]
              min-[425px]:h-[42px]

              lg:w-[42px]
              lg:h-[42px]

              rounded-full

              bg-[#4D5FFF]

              flex
              items-center
              justify-center

              shrink-0
            "
          >
            <img
              src={mailIcon}
              alt="mail"
              className="
                w-[14px]

                min-[425px]:w-[16px]

                lg:w-[16px]

                object-contain
              "
            />
          </div>

          {/* EMAIL TEXT */}
          <div
            className="
              flex
              flex-col

              gap-3
              min-[425px]:gap-4

              text-[#5C74A4]

              text-[0.82rem]

              min-[360px]:text-[0.9rem]

              min-[375px]:text-[0.95rem]

              min-[425px]:text-[0.98rem]

              lg:text-[1.08rem]

              xl:text-[1.12rem]

              leading-relaxed

              text-center

              lg:text-left
            "
          >
            <span>
              SupportmailAIPA@gmail.com
            </span>

            <span>
              mailsupportAIPA@gmail.com
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default HelpLeftSection;