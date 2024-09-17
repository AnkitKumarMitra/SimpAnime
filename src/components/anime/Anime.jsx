import React from 'react'
import { useLocation } from 'react-router-dom';
import style from './Anime.module.css'

export default function Anime() {
  const { state } = useLocation();
  return (

    <div className={style.head}>Details: {state.title}</div>
  )
}
