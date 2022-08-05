import axios from "axios";

const getBaseUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case "production":
      url = "http://13.209.48.74:5000/api";
      break;
    case "development":
    default:
      url = "http://localhost:5000/api";
  }

  return url;
};

export default axios.create({
  baseURL: "http://localhost:5000/api",
});
