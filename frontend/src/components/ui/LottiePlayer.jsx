import { useEffect, useState } from 'react'
import * as LottieModule from 'lottie-react'

// lottie-react's "browser" build field resolves under Vite's dep optimizer to a
// UMD wrapper, so the default export sometimes arrives double-nested.
const Lottie = LottieModule.default?.default ?? LottieModule.default

const cache = new Map()

export default function LottiePlayer({ src, className, loop = false, fallback = null }) {
  const [data, setData] = useState(cache.get(src) ?? null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (cache.has(src)) return
    let cancelled = false
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error('bad response')
        return res.json()
      })
      .then((json) => {
        if (cancelled) return
        cache.set(src, json)
        setData(json)
      })
      .catch(() => !cancelled && setFailed(true))
    return () => {
      cancelled = true
    }
  }, [src])

  if (failed) return fallback
  if (!data) return <div className={className} />
  return <Lottie animationData={data} loop={loop} className={className} />
}
