import React from 'react'
import styles from "./Card.module.css"
export default function Card({ title, content }) {
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            {content}
        </div>
    )
}
