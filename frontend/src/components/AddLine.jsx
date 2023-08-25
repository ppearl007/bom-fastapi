import axios from 'axios';
import React, { useState } from 'react';

export default function AddLine() {

    const [PN, setPN] = useState('')
    const [Des, setDes] = useState('')
    const [Qty, setQty] = useState('')
    
    // Post or add a line item
    const addItemHandler = () => {
        axios.post('http://localhost:8000/api/items', {
            "id": Math.floor(Math.random() * 10000),
            // "id": 1,
            "PN": PN,
            "Desc": Des,
            "Qty": Qty
        }).then(
            res => console.log(res)
        )
    }

    return (
        <div className='container'>
            <span className="card-text row">
                <input className="col" placeholder="PN" onChange={e => setPN(e.target.value)} />
                <input className="col" placeholder="Des" onChange={e => setDes(e.target.value)} />
                <input className="col" placeholder="Qty" onChange={e => setQty(e.target.value)} />
                <button className="col btn btn-outline-primary mx-2" onClick={addItemHandler} style={{ 'borderRadius': '10px', 'fontWeight': 'bold' }}> Add </button>
            </span>
        </div>
    )
}