import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { api } from '@/lib/api-client'

export const Route = createFileRoute('/_protected/welcome')({
  component: Welcome,
})

function Welcome() {
  const [data, setData] = useState()

  useEffect(() => {
    api.get('/auth/welcome').then((res) => {
      console.log('welcome', res)
      setData(res.data)
    })
  }, [])

  console.log('/welcome page')

  return (
    <div className="p-2">
      <h3>Auth Welcome Page: {data}</h3>
    </div>
  )
}
