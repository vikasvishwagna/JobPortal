import React from "react";
import { Link } from "react-router-dom";

export default function AiSearchButton() {
   return (
    <Link to="/searchwithai" className="inline-block">
      <button
        className="cursor-pointer
          relative inline-flex items-center gap-2 rounded-full
    px-4 py-2 text-white font-semibold
    bg-[linear-gradient(90deg,#3b82f6,#6366f1,#14b8a6)]
    bg-200 animate-ai-gradient
    shadow-sm hover:shadow-md
    transition-all duration-200 hover:scale-[1.03]
        "
      >
        <svg className="w-4 h-4 opacity-90" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l2.6 6.6L21 9.2l-5 3.9L17.2 21 12 17.7 6.8 21 8 13.1 3 9.2l6.4-.6L12 2z" />
        </svg>

        <span className="text-sm tracking-wide">AI Job Search</span>

        <svg className="w-4 h-4 opacity-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="6" />
          <line x1="16" y1="16" x2="21" y2="21" />
        </svg>
      </button>
    </Link>
  );
}




//  return (
//     <Link to="/searchwithai" className="inline-block">
//       <button
//         className="
//           relative inline-flex items-center gap-2 rounded-full
//           px-4 py-2 text-white font-semibold
//           bg-[linear-gradient(90deg,#6366f1,#8b5cf6,#4f46e5)]
//           bg-200 animate-ai-gradient
//           shadow-sm hover:shadow-md
//           transition-all duration-200 hover:scale-[1.03]
//         "
//       >
//         {/* Star Icon */}
//         <svg
//           className="w-4 h-4 text-white opacity-90"
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M12 2l2.6 6.6L21 9.2l-5 3.9L17.2 21 12 17.7 6.8 21 8 13.1 3 9.2l6.4-.6L12 2z" />
//         </svg>

//         <span className="text-sm tracking-wide">Search Jobs with AI</span>

//         {/* Search Icon */}
//         <svg
//           className="w-4 h-4 text-white opacity-90"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//         >
//           <circle cx="11" cy="11" r="6" />
//           <line x1="16" y1="16" x2="21" y2="21" />
//         </svg>
//       </button>
//     </Link>
//   );