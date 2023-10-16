import { useState } from 'react'
import { Table, Button, Space } from 'antd'
import * as XLSX from 'xlsx'

const Uploader = () => {
    const [excelFile, setExcelFile] = useState(null)
    const [typeError, setTypeError] = useState(null)
    const [excelData, setExcelData] = useState([''])

    const colKey = Object.keys(Object.values(excelData)["0"])

    // console.log(colKey)

    // const extractor = () => Object.values(excelData).forEach((row) => {
    //     // console.log(Object.keys(row))
    //     const nkey = Object.keys(row)
    //     colKey.push(nkey)
    // })

    const columns = [
        {
          title: colKey[0],
          dataIndex: colKey[0],
          key: colKey[0],
        },
        {
          title: colKey[1],
          dataIndex: colKey[1],
          key: colKey[1],
        },
        {
          title: colKey[2],
          dataIndex: colKey[2],
          key: colKey[2],
        },
        {
          title: colKey[3],
          dataIndex: colKey[3],
          key: colKey[3],
        },
        {
          title: colKey[4],
          dataIndex: colKey[4],
          key: colKey[4],
        },
        {
          title: colKey[5],
          dataIndex: colKey[5],
          key: colKey[5],
        },
        {
          title: colKey[6],
          dataIndex: colKey[6],
          key: colKey[6],
        },
        {
          title: colKey[7],
          dataIndex: colKey[7],
          key: colKey[7],
        },
    ]

    // oncChange event
    const handleFile = (e) => {
        
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result);
                }
            }
            else {
                setTypeError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('Please select your file');
        }

    }

    // submit event
    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0, 10));
        }
        // console.log(excelData)
        // console.log(Object.keys(Object.values(excelData)["0"])[3]);

    }
    

    return (
        <div>
            {/* <ul>{excelData.map(row => <div>{row.Description}</div>)}</ul> */}
            <Space>
                <h4> Upload excel spreadsheet</h4>
            </Space>

            <form>
                <input type="file" onChange={handleFile} />
                <Button onClick={handleFileSubmit}> Upload </Button>
            </form>
            
            <div>
                <Table rowKey="Part Number" columns={columns} dataSource={excelData} />
            </div>

        </div>
    )
}

export default Uploader

