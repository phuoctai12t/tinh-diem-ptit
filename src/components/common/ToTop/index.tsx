import React, { useEffect, useState } from 'react'

export default function () {
  const [isTop, setIsTop] = useState(true)

  const toTop = () => {
    window.scrollTo(0, 0)
  }

  const handleScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    setIsTop(winScroll <= 0)
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)

    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  return <div style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: 'red' }}></div>
}
