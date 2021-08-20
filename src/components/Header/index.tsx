import React from 'react'
import styles from './styles.module.scss'

interface IProps {
  name: string,
  signOut: () => void
}

const Header = ({ name, signOut }: IProps) => {
  return (
    <div className={styles.header}>
      <span>{name}</span>
      <button onClick={signOut}></button>
    </div>
  )
}

export default Header