import { FacebookFilled } from '@ant-design/icons'
import React, { useState } from 'react'
import styles from './styles.module.scss'

declare global {
  interface Window {
    FB: any
  }
}

const FacebookAuth = () => {
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [img, setImg] = useState('')
  let id = 0
  let token = ''

  const singUp = () => {
    try {
      const logStatus = Promise.resolve(window.FB.getLoginStatus())
      const loginFunc = Promise.resolve(window.FB.login((response: any) => {
        id = response.authResponse.userID
        token = response.authResponse.accessToken
      }))
      Promise.all([logStatus, loginFunc]).then(() => {
        window.FB.api(`/${id}?fields=id,name,email,picture&access_token=${token}`, (response: any) => {
          setName(response.name)
          setEmail(response.email.length > 13 ? response.email.replace('@', ' @') : response.email)
          setImg(response.picture.data.url)
        })
      })
    } catch (e) {
      console.error(e)
    }
  }
  const signOut = () => {
    id = 0
    token = ''
    setName('')
    setEmail('')
    setImg('')
  }

  return (
    <div>
      {name ? (
        <div className={styles.loadedUserContent}>
          <img src={img} alt="github-avatar" />
          <span>{email}</span>
          <span>{name}</span>
          <button onClick={signOut}>X</button>
        </div>
      ) :
        <FacebookFilled onClick={singUp} />
      }
    </div>
  )
}

export default FacebookAuth