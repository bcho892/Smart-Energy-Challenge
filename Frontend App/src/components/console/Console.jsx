import React from 'react'
import styles from './Console.module.css'
export default function Console({ content }) {
    const contentRef = React.useRef(null);
    React.useEffect(() => {
        let maxScroll = contentRef.current.scrollHeight - contentRef.current.clientHeight;
        contentRef.current.scrollTo(0, maxScroll);
    })
    return (
        <div className={styles.container}>
            <div ref={contentRef} className={styles.inner} >
                <p >
                    {content}
                </p>
            </div>
        </div>
    )
}
