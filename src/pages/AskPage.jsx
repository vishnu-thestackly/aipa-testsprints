import { useState } from "react";

const AskPage = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = () => {
    // 🔁 Replace with API call later
    setResponse("This is a sample AI response for: " + question);
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        Ask Anything
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          className="w-full h-[120px] p-3 border rounded-lg outline-none"
        />

        <button
          onClick={handleAsk}
          className="mt-4 px-6 py-2 bg-[#4866F6] text-white rounded-lg"
        >
          Ask Now
        </button>

        {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskPage;