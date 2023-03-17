import React from 'react'

export const generalFunctions = () => {
    const parseDate =(seconds:number)=>{
        const result = new Date(seconds * 1000);
        const dateResult = result.getFullYear()+'-'+result.getMonth()+'-'+result.getUTCDate()
            return dateResult;
    }
  return {parseDate}
}
