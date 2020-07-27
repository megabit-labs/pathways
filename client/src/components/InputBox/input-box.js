import React, { useState } from 'react'

const style = {
    border: '1px solid black',
    padding: '5px 10px',
    fontSize: '17px',
    borderRadius: '3px',
    backgroundColor: '#fafafa',
    marginTop: '20px',
    marginLeft: '18px',
    width: '40%',
    transition: '0.2s ease',
}

export default function InputBox() {
    const [id, setId] = useState('')
    return (
        <div>
            <input
                style={style}
                placeholder='Enter ID of relevant component'
                onChange={(e) => setId(e.target.value)}
                value={id}
            />
        </div>
    )
}
