import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReddit = async () => {
      try {
        const res = await axios.get(
          "https://www.reddit.com/r/technology.json"
        );

        const formatted = res.data.data.children
          .map((p) => p.data)
          .slice(0, 12);

        setPosts(formatted);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReddit();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-white">
        <p className="text-lg animate-pulse">Loading tech news...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black text-white p-6 overflow-y-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Tech News (Reddit)
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {posts.map((post) => (
          <a
            key={post.id}
            href={`https://reddit.com${post.permalink}`}
            target="_blank"
            rel="noreferrer"
            className="border border-gray-700 hover:border-white rounded-xl overflow-hidden shadow-md transition"
          >

            {post.preview?.images?.[0]?.source?.url && (
              <img
                src={post.preview.images[0].source.url.replace(/&amp;/g, "&")}
                alt="news"
                className="w-full h-44 object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="font-semibold mb-3 line-clamp-2">
                {post.title}
              </h2>
            </div>

          </a>
        ))}

      </div>

    </div>
  );
};

export default Home;