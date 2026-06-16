const HelpForm = () => {
  return (
    <div
      className="
        w-full
        max-w-[480px]

        bg-[#F7F7F7]

        border
        border-[#DDDDDD]

        rounded-[32px]

        px-5
        py-6

        sm:px-7
        sm:py-8
      "
    >
      {/* TITLE */}
      <h2
        className="
          text-[#4D5FFF]
          font-bold

          text-[2rem]

          mb-6
        "
      >
        Let’s talk
      </h2>

      {/* FORM */}
      <form className="space-y-5">

        <Input
          label="First Name"
          placeholder="First Name"
        />

        <Input
          label="Last Name"
          placeholder="Last Name"
        />

        <Input
          label="Email Address"
          placeholder="Enter Email Address"
        />

        <Input
          label="Mobile Number"
          placeholder="Enter Mobile Number"
        />

        {/* TEXTAREA */}
        <div>
          <label className="text-[#333] text-sm">
            Message here
          </label>

          <textarea
            rows="5"
            placeholder="Enter message here"
            className="
              w-full
              mt-2

              rounded-[14px]

              border
              border-[#D9D9D9]

              px-4
              py-3

              outline-none
              resize-none

              text-sm
            "
          />
        </div>

        {/* BUTTON */}
        <button
          className="
            w-full
            h-[52px]

            rounded-full

            bg-[#4D5FFF]
            text-white

            font-medium

            hover:bg-[#3248ff]

            transition
          "
        >
          Send Message
        </button>

      </form>
    </div>
  );
};

const Input = ({ label, placeholder }) => {
  return (
    <div>
      <label className="text-[#333] text-sm">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="
          w-full
          h-[50px]

          mt-2

          rounded-[12px]

          border
          border-[#D9D9D9]

          px-4

          outline-none

          text-sm
        "
      />
    </div>
  );
};

export default HelpForm;