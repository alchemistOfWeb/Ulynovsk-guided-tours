import React from "react"
import Report from "./Report"

export default function ReportList({data}) {
    
    return (
        <>
            <ul className="list-group comment-list">
                {
                    data.map((rep, ind) => <Report data={rep} key={ind}/>)
                }
            </ul>
        </>
    )
}