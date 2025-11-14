import axios from "axios";

const API_KEY = "51208503-78ffbe163c45f95200a93f547";
const API_URL = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params: any) => {
  // {query: params.query, page: params.page, per_page: params.per_page, image_type: params.image_type, orientation: params.orientation, safesearch: params.safesearch}

  let url = API_URL + "&per_page=25&safesearch=true&editors_choice=true";
  if (!params) {
    return url;
  }

  let urlParams = Object.keys(params);
  urlParams.map((key) => {
    let value = key == "q" ? encodeURI(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  console.log(url);
  return url;
};

export const apicall = async (params: object) => {
  try {
    const response = axios.get(formatUrl(params));
    return response;
  } catch (error) {
    console.log("Got error ", error);
  }
};
