import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import AddLine from './components/AddLine'
import { Table, Space } from 'antd';
import { FaTrash, FaEdit } from 'react-icons/fa';

function App() {
  const [allItems, setAllItems] = useState([])
  const columns = [
    {
      title: 'PN',
      dataIndex: 'PN',
      key: 'PN',
    },
    {
      title: 'Desc',
      dataIndex: 'Desc',
      key: 'Desc',
    },
    {
      title: 'Qty',
      dataIndex: 'Qty',
      key: 'Qty',
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (_, item) => (
        <Space size="middle"> 
          <a><FaEdit /> </a>
          <FaTrash onClick={()=>{delItem(item)}} />
        </Space>
      )
    }
  ]

  // const [error, setError] = useState(undefined)
  // const [fieldRate, setFieldRate] = useState('')
  // const [fieldTotal, setFieldTotal] = useState('')


  // Read all Line Items. pull db data for display

  useEffect(() => {
    axios.get('http://localhost:8000/api/items')
      .then(res => {
        setAllItems(res.data)
      }).catch(error =>
        console.log(error.toJSON())
      )
  })

  const delItem = (item) => {
    // console.log(item)
    axios.delete(`http://localhost:8000/api/items/${item.id}`)
    .then(res => console.log(res.data)
    )
  }

  if (!allItems) return null;

  return (
    <div className='App list-group container'>
      <div>
        <Table rowKey="id" dataSource={allItems} columns={columns} />
      </div>
      <AddLine />
    </div>
  );
}

export default App;