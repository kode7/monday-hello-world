import React, { useEffect, useState } from 'react'
import mondaySdk from 'monday-sdk-js'

const monday = mondaySdk()

const App: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get the user's name when the component mounts
    monday.api(`query { me { name } }`)
      .then((res: any) => {
        console.log('API Response:', res)
        if (res.data && res.data.me && res.data.me.name) {
          setName(res.data.me.name)
        } else {
          console.log('Name not found in response')
          setError('Unable to fetch name')
        }
      })
      .catch((err: Error) => {
        console.error('API Error:', err)
        setError('Error fetching data')
      })

    // Log the current context to check if it's available
    monday.get('context').then((context: any) => {
      console.log('Monday.com Context:', context)
    })
  }, [])

  return (
    <div className="App">
      <h1>Hello, {name || 'World'}!</h1>
      <p>Welcome to your Monday.com app.</p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  )
}

export default App