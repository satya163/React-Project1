import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
export default function App() {
  let [data,updateData]=useState([])
  let [uname,updateUname]=useState();
  let [city,updateCity] = useState();
  let [id,updateId] = useState();
  let [btnTxt,updateBtnTxt]=useState("Add Record")
  let host="http://localhost:1000";
  function funGetData(){
    axios.get(`${host}/getData`).then(dt=>{
      updateData(dt.data.result)
    })
  }
  function funDel(rid){
    var obj={recId:rid}
    axios.post(`${host}/removeRecord`,obj).then(dt=>{
      alert(dt.data.result)
      funGetData();
    })
  }
  function funUpdate(rec){
   updateUname(rec.uname);
   updateCity(rec.city);
   updateId(rec._id);
   updateBtnTxt("SAVE")
  }
  function funInsertData(){
    if(btnTxt == "Add Record"){
    var obj={uname:uname,city:city}
    axios.post(`${host}/saveData`,obj).then(dt=>{
      alert(dt.data.result)
      funGetData();
      updateUname("");
      updateCity("");
    })
  }
  else{
    var obj={un:uname,ct:city,rid:id}
    
     axios.post(`${host}/updateData`,obj).then(dt=>{
      alert(dt.data.result)
      funGetData();
      updateUname("");
      updateCity("");
      updateBtnTxt("Add Record")
    })
  }
  }
  useEffect(()=>funGetData(),[])
  return (
    <div class="container">
      <br />
      <input type='text' placeholder='Username' class="form-control" value={uname}
      onChange={(e)=>updateUname(e.target.value)}/>
      <br />
      <input type='text' placeholder='City' class="form-control" value={city}
      onChange={(e)=>updateCity(e.target.value)}/>
      <br />
      <input type='button' value={btnTxt} class="btn btn-primary" onClick={funInsertData}/>
      <table className='table table-striped'>
        <thead>
          <th>Username</th>
          <th>City</th>
        </thead>
        <tbody>
        {data.map(oneRec=>
        <tr>
          <td>{oneRec._id}</td>
        <td>{oneRec.uname}</td>
        <td>{oneRec.city}</td>
        <td>
          <input type='button' value='Delete' style={{marginRight:'20px'}} class="btn btn-danger" 
          onClick={()=>funDel(oneRec._id)}/>
          <input type='button' value='Update' class="btn btn-warning" 
          onClick={()=>funUpdate(oneRec)}/>
        </td>
      </tr>)}
        </tbody>
      </table>
      
    </div>
  )
}
