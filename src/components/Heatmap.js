import React, { Component } from 'react';
const Heatmap =(props) => {
  
  
    
    return (
        <div className='graph'>
            <ul className="months">
                <li>Jan</li><li>Feb</li><li>Mar</li><li>Apr</li><li>May</li><li>Jun</li><li>Jul</li><li>Aug</li>
                <li>Sep</li><li>Oct</li><li>Nov</li><li>Dec</li>
            </ul>
            <ul className="days">
                <li>Sun</li><li>Mon</li><li>Tue</li><li>Wed</li><li>Thu</li><li>Fri</li><li>Sat</li>
            </ul>
            <ul className="squares">
            {
                props.result.map((data,index)=>{
                    return <li key={index} style={{backgroundColor: data.heatColor}}></li>
                })
            }
            </ul>
        </div>
    );
  
}
export default Heatmap;
