import axios from "axios";
import config from "../config";

export default axios.create({
  baseURL: `https://api.covalenthq.com/v1/${config.NETWORK.ID}`,
  headers: { Accept: "application/json" },
});
