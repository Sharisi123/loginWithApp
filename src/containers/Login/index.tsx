import React from 'react'
import GoogleAuth from '../../components/GoogleAuth'
import GitHubAuth from '../../components/GitHubAuth'
import styles from './styles.module.scss'
import TwitterAuth from '../../components/TwitterAuth'
import FacebookAuth from '../../components/FacebookAuth'

const Login = () => {

  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <span>Login with presentation</span>
        <div>
          <GoogleAuth />
          <GitHubAuth />
          <TwitterAuth />
          <FacebookAuth />
        </div>
      </div>
    </div>
  )
}

export default Login