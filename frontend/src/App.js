import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import LineItem from './components/LineItem'
import ListView from './components/ListView'
import AddLine from './components/AddLine'

function App() {
  const [allItems, setAllItems] = useState([])
  // const [fieldRate, setFieldRate] = useState('')
  // const [fieldTotal, setFieldTotal] = useState('')

  
  // Read all Line Items. pull db data for display

  useEffect(() => {
    axios.get('http://localhost:8000/api/items')
    .then(res => {
      setAllItems(res.data)
    })
  })

  return (
    <div className='App list-group container'>
      <div>
        <div className='grid grid-cols-5 gap-1' >
          {allItems.map(item => <LineItem
            key={item.id}
            id={item.id}
            PN={item.PN}
            Des={item.Desc}
            Qty={item.Qty}
          />)}
        </div>
      </div>

      <AddLine />
    </div>
  );
}

export default App;
