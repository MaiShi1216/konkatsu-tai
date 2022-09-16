import React from 'react'
import classes from '@/components/home/Home.css'

type ResJson = {
  name: string
}

export const ProfileCard = () => {
  const [profile, setProfile] = React.useState('hello')

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.API_ENDPOINT}/sample`, {
        method: 'GET',
      })
      const resJson: ResJson = await response.json()
      return resJson
    }
    fetchData().then(resJson => setProfile(resJson.name)).catch(console.error)
  }, [profile])

  return <div className={classes.card}>{profile}</div>
}
