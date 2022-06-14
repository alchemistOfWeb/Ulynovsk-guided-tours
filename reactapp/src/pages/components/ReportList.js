import React from "react"
import Report from "./Report"

export default function ReportList({reports}) {
    
    return (
        <>
            <ul className="list-group comment-list">
                {
                    reports.map((el, ind) => <Report report={el} key={ind}/>)
                }
            </ul>
        </>
    )
}