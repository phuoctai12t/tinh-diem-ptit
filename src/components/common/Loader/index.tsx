import { default as animationData } from 'assets/lottie/loader.json'
import React from 'react'
import Lottie from 'react-lottie'
import styles from './index.module.scss'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

export default function () {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  )
}
