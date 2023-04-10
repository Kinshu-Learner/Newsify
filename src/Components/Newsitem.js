import React from 'react'

const Newsitem = (props)=> {
        let { title, description, urlToImage, author, publishedAt, source } = props
        return (
            <div>
                <div className="card my-3" style={{ width: "20rem", height: "31rem"}}>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{left: '85%', zIndex: 1}}>
                        {source}
                    </span>
                    <img src={urlToImage} className="card-img-top" alt="..." style={{height:"160px"}}/>
                    <div className="card-body text-center">
                        <h5 className="card-title">{title}<span style={{fontSize:"14px"}}>...</span></h5>
                        <p className="card-text">{description}<span style={{fontSize:"14px"}}>...</span></p>
                        <p className="card-text"><small>By <span style={{ color: "rgb(255, 102, 0)" }}>{author}</span> on {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={props.url} target='_blank' rel="noopener noreferrer" className="btn btn-danger btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default Newsitem;