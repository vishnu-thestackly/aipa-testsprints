// Footer.jsx

import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();

  return (
    <footer
      className="
        w-full
        pt-[20px]
        pb-[20px]
        shrink-0
      "
    >

      <div className="w-full">

        <div
          className="
            flex
            items-center
            justify-between

            md:grid
            md:grid-cols-3

            gap-3
            sm:gap-6
            xl:gap-8

            w-full
          "
        >

          {/* LEFT */}
          <p
            className="
              text-[#8D97A9]

              text-[12px]
              min-[375px]:text-[13px]
              sm:text-[18px]

              font-bold

              whitespace-nowrap
            "
          >
            © All Rights Reserved
          </p>

          {/* CENTER SPACE */}
          <div className="hidden md:block"></div>

          {/* RIGHT */}
          <div
            className="
              flex
              items-center

              md:justify-self-end

              gap-2
              sm:gap-3

              text-[#8D97A9]

              text-[12px]
              min-[375px]:text-[13px]
              sm:text-[18px]

              font-bold

              whitespace-nowrap
            "
          >

            {/* HELP */}
            <button
              onClick={() => navigate("/help")}
              className="
                cursor-pointer
                hover:underline
                transition
              "
            >
              Help
            </button>

            <span>|</span>

            {/* FAQ */}
            <button
              onClick={() => navigate("/faq")}
              className="
                cursor-pointer
                hover:underline
                transition
              "
            >
              FAQ
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;