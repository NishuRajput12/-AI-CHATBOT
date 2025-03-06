import { useState } from "react";
import "./App.css";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { GoogleGenerativeAI } from "@google/generative-ai";
import BeatLoader from "react-spinners/BeatLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function App() {
  const apiKey = import.meta.env.VITE_API_GEMINI_KEY;

  //store  a data use state
  const [prompt, setPrompt] = useState("");

  //store a response  from the user and show on screen using usestate
  // const [response, setResponse] = useState(" ");
  const [response, setResponse] = useState([]);

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  async function ChatResponseFromGemini() {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    // setResponse(result.response.text());
    setResponse([
      ...response,
      { prompt: prompt, response: result.response.text() },
    ]);
     setPrompt(" ");
    setLoading(false);
  }

  return (
    <>
      <h1> Ai ChatBot</h1>
      <div className="chatbot-container">
        <div className=" chatbot-response-container">
          <p>What can I help with?</p>
          {/* <p>{response}</p> */}
          {response?.map((res, index) => (
            <div key={index} className="response">
              <p className="chatbot-prompt">{res.prompt}</p>
              <p className="chatbot-response">{res.response}</p>
            </div>
          ))}
         {loading && <BeatLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
         }
          
         
        </div>
        <div className=" input-chatbox">
          <input
            type="text"
            placeholder=" Message AI"
            className="input-text"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          ></input>
          <button type="button" onClick={ChatResponseFromGemini}>
            <ArrowUpwardIcon/>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
