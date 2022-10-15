import React from 'react';
import Card from '../../components/card/Card';
import styles from './Members.module.css'
const members = [
    { name: `Benson`, description: `` },
    { name: `Owen`, description: `` },
    { name: `Jerome`, description: `` },
    { name: `Wentao`, description: `` },
]

function Members() {
    return (
        <div className='body-style'>
            <div className="section">
                <div className={styles.membergrid}>
                    {members.map((item) => {
                        return <Card
                            key={item.name}
                            title={item.name}
                            content={
                                <>
                                    <p>{item.description}</p>
                                </>
                            }
                        />
                    })}
                </div>
            </div>
        </div>
    );
}
export default Members