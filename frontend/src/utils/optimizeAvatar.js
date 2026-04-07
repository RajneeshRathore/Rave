export const optimizeAvatar = (url) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    if (url.includes("/upload/v")) {
      return url.replace("/upload/v", "/upload/c_fill,w_150,h_150,q_auto,f_auto/v");
    }
    return url;
  };
