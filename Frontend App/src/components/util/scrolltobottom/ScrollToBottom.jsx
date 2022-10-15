import { useEffect, useRef } from 'react'
//deprecated
export default function ScrollToBottom() {
    const ref = useRef(null);
    useEffect(() => ref.current.scrollIntoView());
    return (<div ref={ref} />)
}
