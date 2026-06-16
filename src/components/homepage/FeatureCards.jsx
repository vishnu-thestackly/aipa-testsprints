// FeatureCards.jsx

import FeatureCard from "./FeatureCard";

import askImg from "../../assets/images/card-ask.svg";
import taskImg from "../../assets/images/card-task.svg";
import summaryImg from "../../assets/images/card-summary.svg";

const FeatureCards = () => {
 // FeatureCards.jsx

const data = [
  {
    title: "Ask anything",
    desc: (
      <>
        Get instant answers and insights for
        <br className="md:hidden" />
        {" "}anything you need.
      </>
    ),
    image: askImg,
    path: "/ask",
  },

  {
    title: "Create a task",
    desc: (
      <>
        Easily create and manage tasks to stay
        <br className="md:hidden" />
        {" "}organized.
      </>
    ),
    image: taskImg,
    path: "/task",
  },

  {
    title: "Summarize content",
    desc: (
      <>
        Quickly turn long content into short,
        <br className="md:hidden" />
        {" "}clear summaries.
      </>
    ),
    image: summaryImg,
    path: "/summary",
  },
];

  return (
    <section
      className="
        mt-4
        sm:mt-5

        pb-3
      "
    >
      <div
        className="
          grid

          grid-cols-1
          lg:grid-cols-3

          gap-4
          md:gap-5
          lg:gap-5
        "
      >
        {data.map((item, i) => (
          <FeatureCard
            key={i}
            {...item}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;