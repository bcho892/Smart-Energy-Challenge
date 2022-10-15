import { useState, useEffect } from 'react'
export default function GraphData({ yaxis, data, columnName }) {

    const [graphState, setGraphState] = useState({ data: [["Time", yaxis]], xAxisMax: [0] });
    useEffect(() => {
        let delay;
        delay = setInterval(() => {
            let toAdd = [];
            data[0].data.map((item, index) => {
                toAdd.push([index, parseInt(item[columnName])]);
            })
            setGraphState({ xAxisMax: graphState.data.length, data: [["Time", yaxis], ...toAdd] });
        }, 2000);
        return () => clearInterval(delay);
    });

    return [graphState, setGraphState];

}
