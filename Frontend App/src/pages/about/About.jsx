import React from 'react';
import Card from '../../components/card/Card';
function About() {
    return (
        <div className='body-style'>
            <div className="section">
                <Card
                    title={`About`}
                    content={
                        <>
                            <p>
                                In addition to the energy monitor being able to display power and the related measurements of a load in a given instance,
                                a data logging system has been put into place for further analysis of the power consumption of a device overtime through the use of
                                Python.
                            </p>
                        </>}
                />
                <Card
                    title={`How was this done`}
                    content={
                        <>
                            <p>
                                We made use of the following APIs to create this logging system:
                                <ul>
                                    <li>PySerial</li>
                                    <li>Google Drive API</li>
                                    <li>Google Sheets API</li>
                                </ul>
                                This is combined with the analog circuitry and embedded firmware written for our Smart Energy Monitor to be able to display logged data over time
                            </p>
                        </>
                    }
                />
                <Card
                    title={`Extra Reading`}
                    content={
                        <>
                            <div>
                                <p>To find out more, visit:</p>
                                <a href="https://uoa-ece209.github.io/" rel="noreferrer" target="_blank"><h2>uoa-ece209.github.io</h2></a>
                            </div>
                        </>
                    }
                />

            </div>
        </div>
    );
}
export default About