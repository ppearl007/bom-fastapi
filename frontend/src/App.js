import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import AddLine from './components/AddLine'
// import Uploader from './components/Uploader'
import { Table, Space, Modal, Input, Button } from 'antd';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

function App() {
  const [allItems, setAllItems] = useState([])
  const [isEditing, setisEditing] = useState(false)
  const [itemEditing, setItemEditing] = useState(null) //current item being edited

  const [filteredInfo, setFilteredInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'PN',
      dataIndex: 'PN',
      key: 'PN',
      ...getColumnSearchProps('PN'),
    },
    {
      title: 'Desc',
      dataIndex: 'Desc',
      key: 'Desc',
      ...getColumnSearchProps('Desc'),
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
  }, [allItems])

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

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    // setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    // setSortedInfo({});
  };

  return (
    <div className='App list-group container'>
      <div>
        <Table rowKey="id" dataSource={allItems} columns={columns} handleChange={handleChange} />
      </div>
      <AddLine />
      <Modal title="Edit Item" open={isEditing} onCancel={() => setisEditing(false)} onOk={updateItem}>
        <p>PN</p> <Input value={itemEditing?.PN} placeholder={itemEditing?.PN} onChange={e => setItemEditing(prev => {return {...prev, PN: e.target.value}})}/> 
        {/* <p>PN</p> <Input value={itemEditing?.PN} placeholder={itemEditing?.PN} onChange={e => setItemEditing( {PN: e.target.value)}/>  */}
        <p>Desc</p> <Input value={itemEditing?.Desc} placeholder={itemEditing?.Desc} onChange={e => setItemEditing(prev => {return {...prev, Desc: e.target.value}})}/> 
        <p>Qty</p> <Input value={itemEditing?.Qty} placeholder={itemEditing?.PN} onChange={e => setItemEditing(prev => {return {...prev, Qty: e.target.value}})}/> 
      </Modal>

      {/* <Uploader /> */}

    </div>
  );
}

export default App;