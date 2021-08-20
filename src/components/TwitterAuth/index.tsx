import { TwitterOutlined } from '@ant-design/icons'
import axios from 'axios'
import React from 'react'
import styles from './styles.module.scss'

const TwitterAuth = () => {
  const singIn = async () => {
    const response = await axios.post('https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth/request_token', {}, {
      params: {
        oauth_callback: 'https://localhost:3000/',
      }
    })
    console.log(response)
  }

  return (
    <div>
      <TwitterOutlined onClick={singIn} />
    </div>
  )
}

export default TwitterAuth