import { GithubOutlined } from '@ant-design/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import qs from 'qs'

import styles from './styles.module.scss'

const GitHubAuth = () => {
  let [login, setLogin] = useState<string>('')
  let [name, setName] = useState<string>('')
  let [img, setImg] = useState<string>('')
  let code = ''

  useEffect(() => {
    const parsedQs = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    if (parsedQs) {
      code = qs.stringify(parsedQs).replace('code=', '');
    }
    if (code) {
      signIn()
    }
  }, [])

  const signIn = async () => {
    try {
      const parsedQs = qs.parse(window.location.search, { ignoreQueryPrefix: true })
      if (!parsedQs.hasOwnProperty('code')) {
        document.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
      }

      const { data } = await axios.post(`https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token`, {}, {
        params: {
          client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
          client_secret: process.env.REACT_APP_GITHUB_SECRETS,
          code,
        }
      })
      let token = data.replace('access_token=', '').split('&')[0]

      const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.github.com/user`, {
        headers: {
          Authorization: `token ${token}`
        }
      })
      const { login, name, avatar_url } = response.data
      setLogin(login)
      setName(name)
      setImg(avatar_url)
    } catch (e) {
      console.error(e)
    }
  }
  // console.log(location.origin)
  const signOut = () => {
    window.history.pushState({}, document.title, '/')
    setLogin('')
    setName('')
    setImg('')
    code = ''

  }

  return (
    <div>
      {name ? (
        <div className={styles.loadedUserContent}>
          <img src={img} alt="github-avatar" />
          <span>{login}</span>
          <span>{name}</span>
          <button onClick={signOut}>X</button>
        </div>
      ) : <GithubOutlined onClick={signIn} />
      }
    </div>
  )
}

export default GitHubAuth