import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import AddLine from './components/AddLine'
import { Table, Space, Modal, Input } from 'antd';
import { FaTrash, FaEdit } from 'react-icons/fa';

function App() {
  const [allItems, setAllItems] = useState([])
  const [isEditing, setisEditing] = useState(false)
  const [itemEditing, setItemEditing] = useState(null) //current item being edited

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
          <a><FaEdit onClick={() => {editHandler(item)}} /> </a>
          <FaTrash onClick={() => { delItem(item) }} />
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
  }, [])

  const delItem = (item) => {
    // console.log(item)
    axios.delete(`http://localhost:8000/api/items/${item.id}`)
      .then(res => console.log(res.data)
      )
  }

  const editHandler = (item) =>  {
    setisEditing(true)
    setItemEditing(item)
  }

  const updateItem = () => {
    console.log (itemEditing)
    axios.put(`http://localhost:8000/api/items/${itemEditing.id}`, itemEditing)
      .then(res => console.log(res.data)
      )
    setisEditing(false)
  }

  if (!allItems) return null;

  return (
    <div className='App list-group container'>
      <div>
        <Table rowKey="id" dataSource={allItems} columns={columns} onDoubleClickCapture={() => console.log("double")} />
      </div>
      <AddLine />
      <Modal title="Edit Item" open={isEditing} onCancel={() => setisEditing(false)} onOk={updateItem}>
        <p>PN</p> <Input value={itemEditing?.PN} placeholder={itemEditing?.PN} onChange={e => setItemEditing(prev => {return {...prev, PN: e.target.value}})}/> 
        {/* <p>PN</p> <Input value={itemEditing?.PN} placeholder={itemEditing?.PN} onChange={e => setItemEditing( {PN: e.target.value)}/>  */}
        <p>Desc</p> <Input value={itemEditing?.Desc} placeholder={itemEditing?.Desc} onChange={e => setItemEditing(prev => {return {...prev, Desc: e.target.value}})}/> 
        <p>Qty</p> <Input value={itemEditing?.Qty} placeholder={itemEditing?.PN} onChange={e => setItemEditing(prev => {return {...prev, Qty: e.target.value}})}/> 
      </Modal>
    </div>
  );
}

export default App;