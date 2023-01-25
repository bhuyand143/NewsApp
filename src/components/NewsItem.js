import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source, id } = this.props;

    //incase of not getting the image this function will be called
    const handleimage = (id) => {
      const getimg = document.getElementById(id);
      console.log(getimg);
      getimg.src = "https://im.indiatimes.in/content/2023/Jan/Facebook-Image-1_63ca933c2c729.jpg";
    }
    return (
      <div className='my-3' >
        {/* style={{width: "18rem"}} extracted from below */}
        <div className="card">
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
            <span className="badge rounded-pill bg-danger" style={{ zIndex: '1', left: '90%' }}>
              {source}
            </span>
          </div>
          <img src={imageUrl} id={id} style={{ height: "15rem" }} className="card-img-top" alt="..." onError={() => { handleimage(id) }} />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className='card-text'><small className='text-muted'>By {author ? author : "Unknown"} {new Date(date).toGMTString()} </small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn   btn-dark">Read More...</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem