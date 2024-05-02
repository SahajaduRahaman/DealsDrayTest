import React from 'react'

const Month = ["Jan", "Feb", "March", "Aprl", "May", "June", "Jully", "Aug", "Sep", "Oct", "Nov", "Dec"]

const DateAndTime = ({dot}) => {
    const DOT = new Date(dot)

    const day = DOT.getDate();
    const month = DOT.getMonth();
    const year = DOT.getFullYear();

    return (
      <>
        <span>{day ? day : "00"} {Month[month] ? Month[month] : "00"} {year ? year.toString().substring(2,4) : "00"}</span>
      </>
    )
}

export default DateAndTime 