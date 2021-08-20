import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import styles from './styles.module.scss'
import { GoogleOutlined } from '@ant-design/icons'

declare global {
  interface Window {
    gapi: any
  }
}

function Gauth() {
  let [name, setName] = useState<string>('')
  let [img, setImg] = useState<string>('')

  useEffect(() => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id:
            process.env.REACT_APP_GOOGLE_CLIENT_ID,
        })
    })
  }, [])

  const signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signIn().then((googleUser: any) => {
      const profile = googleUser.getBasicProfile()
      setName(profile.getName())
      setImg(profile.getImageUrl())
    })
  }
  const signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      setName('')
      setImg('')
    })
  }

  return (
    <div className={styles.gauth}>
      {name ? (
        <div className={styles.loadedUserContent}>
          <img src={img} alt="github-avatar" />
          <span>{name}</span>
          <button onClick={signOut}>X</button>
        </div>
      ) :
        <GoogleOutlined onClick={signIn} />
      }

    </div>
  );
}

export default Gauth;
