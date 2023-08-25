import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

export default function LineItem(item, delItem) {
  
  function delItem() {
    // console.log(item.id)
    axios.delete(`http://localhost:8000/api/items/${item.id}`)
    .then(res => console.log(res.data)
    )
  }

  return (
    <div>
        <div className="container">
          {/* <p>{item.id}</p> */}
          <div className="row">
            <div className="col-sm">
              <p>{item.PN}</p>
            </div>
            <div className="col-sm">
              <p>{item.Des}</p>
            </div>
            <div className="col-sm">
              <p>{item.Qty}</p>
            </div>
            <div className="col-sm">
              <button className='btn btn-outline-danger border-0' onClick={()=>delItem(item)}> <FaTrash /> </button>
            </div>
          </div>
        </div>
    </div>
  )
}
