import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Cross, Mic, Search } from "lucide-react";
import { JOB_API_END_POINT } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setAiJobRestults } from "@/redux/jobSlice";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { X } from "lucide-react";

export default function SearchWithAi() {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const dispatch = useDispatch();
  const { aiJobResults } = useSelector((store) => store.job);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recog = new SpeechRecognition();
    recog.lang = "en-IN";
    recog.interimResults = false;

    recog.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInput(text);
    };

    recog.onend = () => setListening(false);

    recognitionRef.current = recog;
  }, []);

  const startListening = () => {
    if (!recognitionRef.current)
      return alert("Your browser doesn't support speech recognition");

    setListening(true);
    recognitionRef.current.start();
  };

  const handleSearch = async () => {
    if (!input.trim()) return alert("Please type or speak something");

    try {
      const res = await axios.post(`${JOB_API_END_POINT}/searchwithAI`, {
        input: input.trim(),
      });
      // dispatch results to redux
      dispatch(setAiJobRestults(res.data.jobs || []));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    dispatch(setAiJobRestults([]));
  };

  return (
    <div className="px-4 py-8">
      <Navbar />

      <div className="flex flex-row justify-around mt-2">
        <div className="w-full max-w-4xl mx-auto mt-5">
          <div className="bg-white border border-gray-200 shadow-sm rounded-full flex items-center gap-2 px-4 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or speak your query (e.g. full stack jobs in Hyderabad)"
              className="flex-1 bg-transparent outline-none text-sm"
              aria-label="job-search-input"
            />

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  listening ? recognitionRef.current?.stop() : startListening()
                }
                className="flex items-center gap-1 p-2 rounded-full bg-[linear-gradient(135deg,#4f46e5,#3b82f6)] hover:brightness-110 transition cursor-pointer shadow-sm hover:shadow-md "
                title={listening ? "Stop listening" : "Start voice input"}
                aria-pressed={listening}
              >
                <p className="text-white font-medium">AI</p>

                {/* Mic icon */}
                <Mic className="h-5 w-5 text-white" />
              </button>

              <button
                onClick={handleSearch}
                className="ml-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full text-sm font-medium shadow cursor-pointer"
                aria-label="search"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleClear}
          className=" border-2 rounded-full p-2 cursor-pointer"
        >
          <X />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-8">
        {Array.isArray(aiJobResults) && aiJobResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiJobResults.map((job) => (
              <div
                key={job._id || job.id}
                className="bg-white border border-gray-100 rounded-lg shadow-sm p-4"
              >
                <Job job={job} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p className="text-sm">
              No jobs found. Try searching for "frontend", "backend", or a city.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
