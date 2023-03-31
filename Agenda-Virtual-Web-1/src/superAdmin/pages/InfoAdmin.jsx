import React from 'react'
import { useParams } from "react-router-dom";

export const InfoAdmin = () => {
    const { tipoU, idU } = useParams();
  return (
    <div>InfoAdmin {tipoU} {idU}</div>
  )
}
