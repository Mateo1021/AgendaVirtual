import React from 'react'

export const generalFunctions = () => {
    const parseDate =(seconds:number)=>{
        const result = new Date(seconds*1000);
        let mounthAdd = result.getMonth().toString().length > 1 ? (result.getMonth() + 1) : '0' + (result.getMonth() + 1)
        const dateResult = result.getFullYear()+'-'+mounthAdd+'-'+result.getUTCDate()
            return dateResult;
    }
  return {parseDate}
}
