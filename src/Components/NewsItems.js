import React from 'react'

const NewsItems =(props)=>{
    // let {title,description,imageUrl,newsUrl} = props; [using this syntax we can directly use the props element without using "props"]
  return (
    <div>
      <div className="card my-3" style={{boxShadow:"2px 2px 10px rgb(59, 57, 57)",}}>
        <div style={{display:'flex', justifyContent:'flex-end', position:'absolute', right:"0" }}>
          <span className="badge rounded-pill text-bg-danger">{props.source}</span>
        </div>
          <img src={props.imageUrl?props.imageUrl:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"} className="card-img-top" alt="..."/>
          <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
              <p className="card-text">{props.description}</p>
              <p className="card-text my-1"><small className="text-muted">Published : {new Date(props.date).toGMTString()}</small></p>
              <p className="card-text"><small className="text-muted">By {props.author===null?"Unknown":props.author}</small></p>
              <a href={props.newsUrl} target="_blank" rel="noreferrer"className="btn btn-sm btn-dark" style={{boxShadow:"2px 2px 8px rgb(59, 57, 57)",}}>Read more</a>
          </div>
      </div>
    </div>
  )
}

export default NewsItems;
