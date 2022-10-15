import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import { openPort, serialConnect, checkCompatiability } from '../../methods/serial';
import Console from '../../components/console/Console';
import Graph from '../../components/graph/Graph';
import GraphData from '../../components/util/graphs/GraphData';
import useGoogleSheets from 'use-google-sheets';
import styles from './Home.module.css';

function Home() {

    const { data, loading, error, refetch } = useGoogleSheets({
        apiKey: process.env.REACT_APP_API_KEY,
        sheetId: process.env.REACT_APP_SPREADSHEET_ID,
        sheetsOptions: [{ id: 'Data' }],
    });
    const [serial, setSerial] = useState(undefined);
    const [isConnected, setIsConnected] = useState(serial);
    const [log, setLog] = useState('');
    const [isPlaying, setIsPlaying] = useState({ state: true });
    const [currentDisplay, setCurrentDisplay] = useState({ power: true, current: false, voltage: false });

    //done at parent level to reduce API calls
    useEffect(() => {
        if (!isPlaying.state) return;
        let delay;
        delay = setInterval(() => {
            refetch();
        }, 2000);
        return () => clearInterval(delay);
    });

    const connect = async () => {
        serialConnect()
            .then((port) => openPort(port, 9600)
                .then((serial) => {
                    setSerial(serial);
                    setIsConnected(true);
                    setLog(`Connected!`);
                })).catch(e => setLog(e.message));
    }

    const startReading = async () => {
        try {
            let output = '';
            while (true) {
                const { value, done } = await serial.reader.read();
                output += value;
                setLog(output);
                if (done) {
                    // Allow the serial port to be closed later.
                    serial.reader.releaseLock();
                    break;
                }
                // value is a string.
            }
        } catch (e) {
            setLog(e.message);
        }
    }
    const closeCurrent = async () => {
        await serial.close();
        setLog(log + "\n Closed");
        setIsConnected(false);
    }

    const switchView = (view) => {
        let temp = {};
        Object.keys(currentDisplay).forEach(key => {
            if (key === view.toLowerCase()) temp[key] = true;
            else temp[key] = false;
        })
        setCurrentDisplay(temp);
    }

    const graphs = [
        { yaxis: "Power (W)", columnName: "Power", scale: { min: 0, max: 8 }, display: currentDisplay.power },
        { yaxis: "Current(mA)", columnName: "Current", scale: { min: 0, max: 1000 }, display: currentDisplay.current },
        { yaxis: "Voltage(V)", columnName: "Voltage", scale: { min: 0, max: 20 }, display: currentDisplay.voltage }
    ]

    const graphControls = [
        { text: "Start", onClick: () => setIsPlaying({ ...isPlaying, state: true }) },
        { text: "Pause", onClick: () => setIsPlaying({ ...isPlaying, state: false }) },
    ]

    const terminalControls = [
        { text: "Connect", onClick: () => connect() },
        { text: "Open", onClick: () => startReading() },
        { text: "Close", onClick: () => closeCurrent(), },
        { text: "Clear", onClick: () => setLog("") }
    ]

    return (
        <>
            <div className='body-style'>
                <div className="section">

                    <Card
                        title={`Graphs - ${isPlaying.state ? `Refreshing` : `Paused`}`}
                        content={
                            <>
                                <div className={styles.graphviews}>
                                    {graphs.map((item, index) => {
                                        return <li
                                            className={item.display ? `${styles.selected}` : ``}
                                            key={index}
                                            onClick={() => switchView(item.columnName)}>{item.columnName}
                                        </li>
                                    })}
                                </div>
                                <div className={styles.graphcontainer}>
                                    {graphs.map((item, index) => {
                                        return <div
                                            key={index}
                                            className={item.display ? `` : `${styles.out}`}
                                            id={styles.graph}>
                                            <Graph
                                                scale={item.scale}
                                                error={error}
                                                range={20}

                                                data={GraphData({ data: data, yaxis: item.yaxis, columnName: item.columnName })} />
                                        </div>
                                    })}
                                </div>
                                <div className="button-group">
                                    {graphControls.map((item) => {
                                        return <Button
                                            key={item.text}
                                            text={item.text}
                                            width={item.width}
                                            onClick={item.onClick}
                                        />
                                    })}
                                </div>
                            </>
                        } />
                </div>
                <div className="section">
                    {checkCompatiability() && <Card title={`Terminal - ${isConnected ? `Connected` : `Not Connected`}`} content={
                        <>
                            <Console content={log} />
                            <div className='button-group'>
                                {terminalControls.map((item) => {
                                    return <Button
                                        key={item.text}
                                        text={item.text}
                                        width={item.width}
                                        onClick={item.onClick}
                                    />
                                })}
                            </div>
                        </>
                    } />}
                </div>
            </div>
        </>
    );
}
export default Home