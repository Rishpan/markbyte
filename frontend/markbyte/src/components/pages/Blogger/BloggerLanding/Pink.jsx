/* Pink Flower Landing Page Component */
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  Eye,
  User2,
  CalendarIcon,
  Home,
  ArrowRight,
  Heart,
  Leaf,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";

function PinkLandingPage({ username, blogList, profilepicture, fetchPosts }) {
  const nposts = 6;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [npages, setNPages] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (blogList === null || blogList.length === 0) {
      fetchPosts();
    }
  }, [username, fetchPosts]);

  useEffect(() => {
    setNPages(Math.ceil((blogList?.length || 0) / nposts));
  }, [blogList, nposts]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Date Unknown" : date.toLocaleDateString();
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * nposts < blogList.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fff8f9] overflow-x-hidden flex flex-col">
      <div className="w-full bg-gradient-to-r from-[#ff9eb3] to-[#ff7f9e] py-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-20 h-20 grid grid-cols-5 gap-2 opacity-60 mt-6 ml-6">
          {[...Array(25)].map((_, i) => (
            <Heart
              className="w-3 h-3 text-pink-600 fill-pink-600 opacity-50 animate-pulse"
              key={i}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left mb-10 ml-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
          >
            <div className="flex items-center gap-5">
              <Avatar className="h-32 w-32 border-2 border-white/20 shadow-lg">
                <AvatarImage
                  src={profilepicture || "/placeholder.svg"}
                  alt={username}
                  className="object-cover w-full h-full"
                />
                <AvatarFallback className="bg-[#ff7f9e] text-white">
                  {username?.charAt(0).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white tracking-tight leading-tight">
                  {username}'s Blog
                </h1>
                <div className="flex items-center">
                  <p className="text-xl md:text-2xl max-w-2xl text-white">
                    Explore {username}'s blog posts and articles.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center gap-4">
              <button
                className="bg-[#ff9eb3] hover:bg-[#ff7f9e] rounded-full p-2 shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center"
                onClick={() => {
                  navigate("/");
                }}
              >
                <Home className="h-8 w-8 text-white" />
              </button>
              <button
                className="px-6 py-3 text-lg font-medium text-white bg-[#ff9eb3] hover:bg-[#ff7f9e] rounded-lg shadow-lg transition-all duration-300 ease-in-out flex items-center"
                onClick={() => {
                  navigate(`/${username}/about`);
                }}
              >
                <User2 className="mr-2" /> About
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <main className="container mx-auto mt-16 mb-24 relative flex-grow">
        {/* Pink border with dashes container */}
        <div className="relative p-8 rounded-lg border-[18px] border-pink-100 mx-4">
          {/* Dotted line inside border */}
          <div className="absolute inset-0 border border-dashed border-pink-300 rounded-md pointer-events-none"></div>

          <div className="relative z-10 pt-4 px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-bold text-[#ff7f9e] flex items-center">
                <Leaf className="h-8 w-8 mr-3 text-green-500 fill-green-500" />
                <span>Table of Contents</span>
              </h2>
              <div className="flex items-center text-sm text-[#ff7f9e]">
                <Bookmark className="h-4 w-4 mr-2" />
                {blogList?.length || 0} Posts
              </div>
            </div>
            <div className="space-y-10">
              {blogList?.length === 0 && (
                <Card className="w-full py-20 bg-gradient-to-br from-[#fff0f3] to-white border-0">
                  <CardContent className="text-center">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-[#fff0f3] p-8 mb-6">
                        <Bookmark className="h-14 w-14 text-[#ffc0cb]" />
                      </div>
                      <h3 className="text-2xl font-medium text-[#ff7f9e] mb-3">
                        No posts yet
                      </h3>
                      <div className="flex items-center">
                        <p className="text-[#ff9eb3] max-w-md text-lg">
                          {username} hasn't published any blog posts yet. Check
                          back later!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {blogList && blogList.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, staggerChildren: 0.1 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {blogList
                    .slice(currentPage * nposts, (currentPage + 1) * nposts)
                    .map((post, index) => (
                      <motion.div
                        key={
                          post.post.user + post.post.title + post.date_uploaded
                        }
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card
                          className="bg-white text-black border border-[#ffd1dc] shadow hover:shadow-lg transition-all duration-300 group cursor-pointer"
                          onClick={() => {
                            if (post.post.link.includes("static")) {
                              window.open(post.post.link, "_blank");
                            } else {
                              window.open(post.post.direct_link, "_blank");
                            }
                          }}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4 text-sm text-[#ff9eb3]">
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                {formatDate(post.post.date_uploaded)}
                              </div>
                              <div className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                <span>{post.views.length} views</span>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center mb-3">
                                  <h3 className="text-xl font-bold group-hover:text-[#ff7f9e] transition-colors duration-300">
                                    {post.post.title}
                                  </h3>
                                </div>
                                <div className="flex items-center font-medium group-hover:text-[#ff7f9e] transition-colors duration-300">
                                  Read more{" "}
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </motion.div>
              )}
            </div>
            {blogList && blogList.length > 0 && npages > 1 && (
              <div className="mt-16 flex justify-center">
                <Pagination>
                  <PaginationContent className="flex items-center gap-2">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={handlePrevPage}
                        className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                          currentPage === 0
                            ? "pointer-events-none opacity-50"
                            : "hover:bg-[#fff0f3]"
                        }`}
                      />
                    </PaginationItem>

                    <div className="font-medium">
                      Page {currentPage + 1} of {npages}
                    </div>

                    <PaginationItem>
                      <PaginationNext
                        onClick={handleNextPage}
                        className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                          currentPage >= npages - 1
                            ? "pointer-events-none opacity-50"
                            : "hover:bg-[#fff0f3]"
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="py-3 text-center z-20">
        <p className="text-gray-400 text-sm">
          Made with ❤️ by
          <a
            href="/about"
            className="text-blue-400 hover:text-blue-300 transition duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            MarkByte's Developers
          </a>
        </p>
      </footer>
    </div>
  );
}

export default PinkLandingPage;
