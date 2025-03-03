import "./Home.css";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:470px)");
  const isSmallScreen2 = useMediaQuery("(min-width:611px)");

  return (
    <div className="App min-h-screen flex flex-col bg-[#011A29] text-white overflow-hidden">
      <div className="absolute left-1/4 top-1/4 h-[500px] w-[400px] -rotate-100 rounded-[150px] bg-blue-500 opacity-15 blur-[150px] z-0"></div>
      <div className="absolute left-[-15%] top-1/6 h-[450px] w-[350px] -rotate-15 rounded-[120px] bg-blue-500 opacity-10 blur-[130px] z-0"></div>
      <div className="absolute right-[-10%] bottom-1/4 h-[550px] w-[450px] rotate-40 rounded-[130px] bg-blue-500 opacity-10 blur-[140px] z-0"></div>
      <header className="header">
        <div className="logo-container" onClick={() => navigate("/")}>
          <img
            src="/assets/markbytealt.png"
            alt="MarkByte Logo"
            className="page-logo-2"
          />
          {!isSmallScreen && (
            <span className="text-3xl font-bold">arkByte</span>
          )}
        </div>
        <div className="flex gap-6 items-center">
          <a
            href="/about"
            className="text-white font-semibold rounded text-lg transition-all duration-300 relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <button
            className="text-white font-semibold rounded flex items-center justify-center text-lg transition-all duration-300 relative group"
            onClick={() => navigate("/auth?tab=login")}
          >
            Login <CiLogin className="ml-1 text-lg " />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            className="bg-white hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded min-w-[100px] transition-all duration-300 ease-in-out"
            onClick={() => navigate("/auth?tab=signup")}
          >
            Sign Up
          </button>
        </div>
      </header>
      <main className="flex-grow relative z-10">
        <section className="text-white py-32 mt-32 z-20">
          <div className="container mx-auto px-4 z-20">
            <div className="max-w-3xl mx-auto text-center z-10">
              <div className="relative">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
                  Welcome to MarkByte.
                </h1>
                {isSmallScreen2 && (
                  <img
                    src="/assets/pen.png"
                    alt="Pen"
                    className="absolute -top-[200%] left-[46%] transform -translate-x-1/2 z-20 w-40 h-40"
                  />
                )}
              </div>
              <p className="tagline text-xl md:text-2xl mb-8 text-blue-100 font-light">
                The future of blogging is written in Markdown
              </p>
              <div className="flex justify-center gap-6">
                <a
                  href="/auth?tab=signup"
                  className="flex items-center bg-blue-700 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl cursor-pointer group"
                >
                  <span>Upload Your First Blog</span>{" "}
                </a>
                <a
                  href="/about"
                  className="flex items-center cursor-pointer group"
                >
                  <span>Learn More</span>{" "}
                  <FaArrowRight size={13} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-4 text-center">
        <p className="text-gray-400 text-sm">
          Group 1 - Rishab Pangal, Anish Laddha, Shrijan Swaminathan
        </p>
      </footer>
    </div>
  );
}
export default Home;
