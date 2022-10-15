import React from 'react';
import styles from './Graph.module.css';
import { Chart } from 'react-google-charts';



export default function Graph({ data, range, error, scale }) {
    let maxX = data[0].xAxisMax;
    let minX = maxX - range;
    return (

        <div className={styles.container}>
            {!error ? <Chart
                options={{
                    colors: ["#e96d7d"],
                    legend: { position: "bottom" },
                    hAxis: {
                        viewWindow: { min: minX <= 0 ? 0 : minX, max: maxX },
                        textPosition: 'none'
                    },
                    vAxis: {
                        viewWindow: scale,
                    },
                    tooltip: { isHtml: true }
                }}

                chartType="AreaChart"
                data={data[0].data}
                width="100%"
                height="100%"
            /> : <h1>Error...</h1>}
        </div>
    )
}
