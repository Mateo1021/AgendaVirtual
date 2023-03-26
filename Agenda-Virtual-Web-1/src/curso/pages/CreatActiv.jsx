import React from 'react'
import { useParams } from "react-router-dom";

export const CreatActiv = () => {
    const { idA} = useParams();
  return (
    <div><h1>Test{idA}</h1></div>
  )
}
