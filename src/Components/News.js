import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {

    const capitalize=(word)=>{
      let lower=word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    // document.title = `DailyNews - ${capitalize(props.category)}`;

    const [articles, setArticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const updateNews=async()=>{
      props.setProgress(20)
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
      setLoading(true);
      let data= await fetch(url);
      props.setProgress(40);
      let parsedData= await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100)
    }

    useEffect(() => {
      document.title = `DailyNews - ${capitalize(props.category)}`; 
      updateNews(); 
      // eslint-disable-next-line
    },[])
    
    // handlePrevClick=async ()=>{
    //   setPage(page-1);
    //   updateNews();
    // }

    // const handleNextClick=async ()=>{
    //   setPage(page+1);
    //   updateNews();
    // }

    const fetchMoreData=async()=>{
      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1); 
      let data= await fetch(url);
      let parsedData= await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    }

    return (
      <>
        <h1 className="text-center " style={{marginTop:"80px"}}>DailyNews - Top {capitalize(props.category)} Headlines</h1>
            {loading && <Spinner/>}
            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={articles.length !== totalResults}
              loader={<Spinner/>}
            >
              <div className="container">
                <div className="row">
                    {articles.map((element)=>{
                        return(
                            <div className="col-md-4" key={element.url}>
                                <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                        )
                    })}

                    {/* {!loading && <div className="container d-flex justify-content-between">
                      <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                      <button disabled={page+1 > Math.ceil(totalResults/props.pageSize)}
                      type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                    </div>} */}
                </div>
              </div>
            </InfiniteScroll>            
      </>
    )
}

News.defaultProps={
  pageSize : 6,
  country : "in",
  category : "general"
  
}
News.propTypes={
  pageSize : PropTypes.number,
  country : PropTypes.string,
  category : PropTypes.string
}

export default News;