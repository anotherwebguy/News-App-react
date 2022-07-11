import React from "react";
import { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, sesetTotalResults] = useState(0);

  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${page}&pageSize=20`;
    setLoading(false);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    sesetTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    updateNews();
  },)

  const handlePrevClick = async () => {
    await setPage(page - 1);
    updateNews();
  };

  const handleNextClick = async () => {
    await setPage(page + 1);
    updateNews();
  };

  return (
    <div className="container my-3">
      <h1 className="text-center ">Atankwadi News - Aapko rakho piche</h1>
      {loading && <Spinner />}
      <div className="row">
        {!loading &&
          articles.map((element) => {
            return (
              <div key={element.url} className="col-md-4">
                <Newsitem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageurl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://i-invdn-com.investing.com/news/world_news_2_69x52._800x533_L_1419494365.jpg"
                  }
                  newsurl={
                    element.url
                      ? element.url
                      : "https://www.investing.com/news/world-news/nasa-to-showcase-webb-space-telescopes-first-fullcolor-images-2845684"
                  }
                />
              </div>
            );
          })}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          type="button"
          disabled={page <= 1}
          onClick={handlePrevClick}
          className="btn btn-dark"
        >
          &larr; Previous
        </button>
        <button
          type="button"
          disabled={page + 1 > Math.ceil(totalResults / 20)}
          onClick={handleNextClick}
          className="btn btn-dark"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
