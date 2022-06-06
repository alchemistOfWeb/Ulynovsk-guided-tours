import React from "react";


export default function Report({data}){
    var profile_img = '';
    if (data.img) {
        profile_img = data.img;
    } else {
        profile_img = 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp';
    }

    return (
    <li className="list-group-item list-data-item rounded mb-2">
        <div className="card">
            <div className="card-body">
                <div className="d-flex flex-start align-items-center">
                    <img className="rounded-circle shadow-1-strong me-3"
                        src={profile_img} alt="avatar" width="60"
                        height="60" />
                    <div>
                        <h6 className="fw-bold text-primary mb-1">{data.author.full_name}</h6>
                        {/* <p className="text-muted small mb-0">
                        Shared publicly - Jan 2020
                        </p> */}
                    </div>
                </div>
    
                <p className="mt-3 mb-0 pb-2">
                    {data.content}
                </p>
    
                {/* <div className="small d-flex justify-content-start">
                    <a href="#!" className="d-flex align-items-center me-3 data-like">
                        <i className="far fa-thumbs-up me-2"></i>
                        <p className="mb-0">Like</p>
                    </a>
                    <a 
                        href="#!" 
                        className="d-flex align-items-center me-3 data-on-js"
                        // onClick={opendataHandler}
                    >
                        <i className="far fa-data-dots me-2"></i>
                        <p className="mb-0">data</p>
                    </a>
                </div> */}
            </div>
        </div>
    </li>
    )
}