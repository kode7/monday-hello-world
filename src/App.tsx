import React, { useEffect, useState } from 'react'
import mondaySdk from 'monday-sdk-js'

const monday = mondaySdk()

const App: React.FC = () => {
  const [name, setName] = useState<string>('')

  useEffect(() => {
    // Get the user's name when the component mounts
    monday.api(`query { me { name } }`).then((res: any) => {
      setName(res.data.me.name)
    })
  }, [])

  return (
    <div className="App">
      <h1>Hello, {name || 'World'}!</h1>
      <p>Welcome to your Monday.com app.</p>
    </div>
  )
}

export default App