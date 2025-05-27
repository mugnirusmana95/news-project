const ENV = {
  MODE: process.env.REACT_APP_MODE,
  BASE_URL: process.env.REACT_APP_BASE_URL,
  API: `${process.env.REACT_APP_BASE_URL_API}/api`,
  NEWS_URL: process.env.REACT_APP_NEWS_API_URL,
  NEWS_KEY: process.env.REACT_APP_NEWS_API_KEY,
}

export default ENV