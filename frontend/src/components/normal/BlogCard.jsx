import React from "react";

const BlogCard = ({
  image,
  title,
  description,
  date,
  authors = [],
}) => {
  return (
    <div className="max-w-sm overflow-hidden rounded-2xl bg-black border border-white/20 flex flex-col">

      {image && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {title}
        </h3>
        <p className="mt-4 text-[15px] text-zinc-400 font-medium leading-relaxed flex-1">
          {description}
        </p>

        {(authors.length > 0 || date) && (
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
            {authors.length > 0 && (
              <div className="flex -space-x-3">
                {authors.map((author, index) => (
                  <div key={index} className="group relative">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="h-8 w-8 rounded-full border-2 border-black"
                    />
                  </div>
                ))}
              </div>
            )}
            {date && (
              <span className="text-xs text-white/50 tracking-wider font-semibold">
                {date}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
