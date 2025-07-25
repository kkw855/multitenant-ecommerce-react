import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { api } from '@/lib/api-client'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const [data, setData] = useState()

  useEffect(() => {
    api.get('/auth/welcome').then((res) => {
      console.log('About', res)
      setData(res.data)
    })
  }, [])

  return (
    <div className="p-2">
      <h3>About: {data}</h3>
    </div>
  )
}
