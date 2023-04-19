import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import SupplierSideBar from "./SupplierSideBar";
import inv from "../assets/inv.jpg"
import { ToastContainer, toast } from 'react-toastify';

const moment = require('moment');

export default function StockRequests(){

    const [stockReq , setStockReq] = useState([]);
   
    useEffect(()=>{
  
          axios.get("http://localhost:8080/api/inventory/stockrequest/")
          .then((res) => {
            setStockReq(res.data)
          })
          .catch(err => alert(err))
  
    }, []) 

  return (
    //Main container
    <div className="flex scroll-smooth">
    <SupplierSideBar />


  {/*Right Side container start*/}
  <div className="bg-[#d9d9d9] flex-[85%]">

    {/*Header Part*/}
    <div className="bg-[#2E4960] h-100 w-full">
      <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">NEW STOCK REQUESTS</h1>

      <div className="flex">

          <div className=" flex p-5">


          </div>
        </div>
    </div>

    {/*Body Part*/}
    <div 
    style={{ backgroundImage: `url(${inv})` }}
      className="bg-cover bg-center h-screen w-full fixed" >
{/*White box*/}
<div className=" bg-white bg-opacity-90 w-[75%] h-[80%] absolute top-5 left-[80px] overflow-scroll">
                    {/*Table*/}
                    <table className="mx-auto my-10 w-[1000px]">

                    <thead className=" bg-[#FF9F00] text-white sticky top-0">
                        <tr>
                        <th className="p-3">date</th>
                        <th className="p-3">item_code</th>
                        <th className="p-3">item_name</th>
                        <th className="p-3">item_brand</th>
                        <th className="p-3">category</th>
                        <th className="p-3">qty</th>
                        <th className="p-3">total_amount</th>
                        <th className="p-3">status</th>
                        <th className="p-3">action</th>
                        </tr>
                    </thead>
                    
                    <tbody  className="bg-white text-center">

                    {stockReq.map((stockrequest) => {
                      if (stockrequest.status === "pending" ) {
                      return(

                        <TableDataRow 
                
                          id = {stockrequest._id}
                          itemCode={stockrequest.item_code}
                          itemName={stockrequest.item_name}
                          itemBrand={stockrequest.item_brand}
                          category={stockrequest.category}
                          qty={stockrequest.qty}
                          totalAmount={stockrequest.totalAmount}
                          date={stockrequest.date}
                          status={stockrequest.status}

                        />
                      )
                    }else{
                      return null;
                    }
                    })}
                  
                    </tbody>
                    </table>
                </div>

          </div>

  </div> {/*Right Side container end*/}
</div> //Main container end
  )
}



function TableDataRow(props){
 
  async function handleClick(id,total_amount){
    console.log(id)


    //const now = moment();
    //const formatted = now.format('YYYY-MM-DD, h:mm a'); // Returns a formatted date string like "2023-10-10, 4:28 pm"


    try{
      await axios.put(`http://localhost:8080/api/inventory/stockrequest/${id}`, 
      { 
        status: "ACCEPTED",
        total:total_amount,

    })
    toast.success("Status updated", {position: toast.POSITION.TOP_RIGHT,})
      

    }catch (err){
      console.error(err);
    }

 }
  
 const [totalAmount, setTotalAmount] = useState(""); // Use state to store the totalAmount value

 // Handle input change
 const handleChange = (value) => {
   setTotalAmount(value); // Update the totalAmount value in state
 };
    return (
      <>
        <tr>
        <td className="p-3">{props.date}</td>
          <td className="p-3">{props.itemCode}</td>
          <td className="p-3">{props.itemName}</td>
          <td className="p-3">{props.itemBrand}</td>
          <td className="p-3">{props.category}</td>
          <td className="p-3">{props.qty}</td>
          <td className="p-3">
          {props.status.toLowerCase() === "pending" ? 
          <input
            type="string"
            className="w-full p-1 border-gray-300 border rounded-lg"
            onChange={(e) => handleChange(e.target.value)} // Handle input change
          /> : null}
          </td>
          <td className="p-3">{props.status}</td>
          <td className="p-3">
            {props.status.toLowerCase() === "pending" ? 
            <button onClick={() =>handleClick( props.id,totalAmount )} className="px-3 py-1 mr-5 bg-green-300 hover:bg-[#ffc05a] rounded-lg ">✓ Accept</button> : null}
          </td>
        
        </tr>
      </>
    )

}