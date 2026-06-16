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
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3

            gap-4
            sm:gap-6
            xl:gap-8

            items-center
          "
        >

          {/* LEFT */}
          <p
            className="
              text-[#8D97A9]

              text-[16px]
              sm:text-[18px]

              font-bold

              justify-self-start
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
              justify-self-end

              gap-3

              text-[#8D97A9]

              text-[16px]
              sm:text-[18px]

              font-bold
            "
          >

            {/* HELP */}
            

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