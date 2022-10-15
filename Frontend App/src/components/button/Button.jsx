import React from 'react'
import styles from './Button.module.css'
export default function Button({ text, onClick }) {
    return (
        <button className={styles.container} onClick={onClick}>
            <h2>{text}</h2>
        </button>
    )
}
