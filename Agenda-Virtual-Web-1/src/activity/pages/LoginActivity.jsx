import React from 'react'
import { useParams } from 'react-router-dom';

export const LoginActivity = () => {
    const { codC, codA } = useParams();

  return (
    <div>LoginActivity vienes del curso {codC} y la actividad {codA}</div>
  )
}
