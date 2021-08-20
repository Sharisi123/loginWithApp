import React from 'react'
import GoogleAuth from '../../components/GoogleAuth'
import GitHubAuth from '../../components/GitHubAuth'
import styles from './styles.module.scss'
import TwitterAuth from '../../components/TwitterAuth'
import FacebookAuth from '../../components/FacebookAuth'
// import { useAuth0 } from '@auth0/auth0-react'

const Login = () => {
  // const { loginWithRedirect } = useAuth0();

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
        {/* <button onClick={() => loginWithRedirect()}>Log in</button> */}
      </div>
    </div>
  )
}

export default Login