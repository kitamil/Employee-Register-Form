import React, { useState,useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Delete, Edit } from "@material-ui/icons";


const Form= () => {

    const initialvalues = {
       Stdno: "",
       Name: "",
       Role: "",
       Email: "",
       Mobile: "",
       Status: "",

    };

    
    

    const reducer = (stdDetails, action) => {
        // console.log("action",action)
        // console.log("state",action)
    
        const { type, payload } = action;
        switch (type) {
          case 'Stdno':
            return { ...stdDetails, Stdno: payload };
          case "Name":
            return { ...stdDetails, Name: payload };
          case "Role":
            return { ...stdDetails, Role: payload };
          case "Email":
            return { ...stdDetails, Email: payload };
          case "Mobile":
           return { ...stdDetails, Mobile: payload };
          case "Status1":
                return { ...stdDetails, Status: payload };
          case "Status2":
            return { ...stdDetails, Status: payload };
        
          default:
            return { ...stdDetails };
        }
      };


      const [stdDetails, setStddetails] = useReducer(reducer,initialvalues)
    //const [stdDetails, setStddetails] = useState (initialvalues);
    const [tableData, setTabledata] = useState ([]);
   
    //console.log('stdDetails :>> ', stdDetails);
    //console.log('tableData :>> ', tableData);

    const stdnumber = tableData.map((data)  => data.Stdno);

    console.log("stdnumber",stdnumber)

   


    const handlechange=(name,value) =>{  
          
    setStddetails({ type: name, payload: value });
    
}

   const handlesumbit=(e) => {  
    e.preventDefault(); 
    setTabledata([...tableData,stdDetails])
    setStddetails(initialvalues)

   }

   const handledeleted= (data) => {
    console.log('data', data)
    
   let deleted= tableData.filter(values => values?.Stdno !== data)

   setTabledata(deleted)
   }

  const HandleEdit = (values) => {
    console.log("values",values)

    const index = stdnumber.indexOf(values);

   let oldvalues = [...tableData]
   
   oldvalues[index] = stdDetails
   console.log('oldvalues :>> ', oldvalues);    

  }

   


 
   return(
        <div className="myContainer bg-primary"> 
        <div className="container py-5 w-50">
        <div className="card bg-white bg-gradient text-black p-3 wx-2">
            <h1>Student Register Form</h1>
            <form onSubmit={handlesumbit}> 
                <div className="Mb-3">
                <label className="form-label">Student No: </label>
                <input className="form-Control"  name="Stdno"   value={stdDetails.Stdno} type="number" onChange={(e) => handlechange ('Stdno', e.target.value)}/>
                </div>

               <div className="mb-3">
                <label className="form-label">Name:</label>
                <input className="form-Control" name="Name" value={stdDetails.Name}  type ="text" onChange={(e) => handlechange ("Name", e.target.value)} />
                </div>

                <div className="mb-3">
                <label >Role:</label>
                <select className="form-select mb-3"  name="Role" value={stdDetails.Role} onChange={(e) => handlechange ("Role", e.target.value)}>
                    <option value="">SeleCt the option</option>
                    <option value="school">school</option>
                    <option value="college">college</option>
                </select>
                </div>
                

                <div className="mb-3">
                <label className="form-label">email:</label>
                <input className="form-Control" name="Email" value={stdDetails.Email} type="email" onChange={(e) => handlechange ("Email", e.target.value)}/>
                </div>
          

                <div className="mb-3">
                <label className="form-label">mobile:</label>
                <input className="form-Control" name="Mobile" type="number" value={stdDetails.Mobile} onChange={(e) => handlechange ("Mobile", e.target.value)}/>
                </div>

               <div className="form-check">
                <input className="form-check-input" id="flexRadioDefault2" name="Status" value="Hostel" type="radio" onChange={(e) => handlechange ("Status1", e.target.value)}/>               
               <label >Hostel</label>
               </div>

               <div className="form-check ">
                <input className="form-check-input" id="flexRadioDefault2" name="Status" value="Home"  type="radio" onChange={(e) => handlechange ("Status2", e.target.value)}/>               
               <label>Home</label>
               </div>

               <div className="d-grid gap-2 col-2 mx-auto">
              <button
                className={`btn text-white bg-success`}
                type="submit"
              >
                Submit
              </button>
            </div>
            </form>
        </div>
        </div>
        

        <div className="container w-75 py-5">
        
          <table className="table table-bordered table-striped bg-white">
            <thead className="table-primary">
              <tr>
                <th scope="col">Emp No</th>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile No</th>
                <th scope="col">Experience Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {
                tableData.map((data) => (
                    
                    <tr>
                  <td>{data?.Stdno}</td>
                  <td>{data?.Name}</td>
                  <td>{data?.Role}</td>
                  <td>{data?.Mobile}</td>
                  <td>{data?.Email}</td>
                  <td>{data?.Status}</td>
                  <td>
                  <div className="d-flex">
                      <div className="mx-2 pointer">
                        <Delete onClick={()=> handledeleted(data?.Stdno)} />
                      </div>
                      <div className="mx-2 pointer">
                        <Edit onClick={() => HandleEdit(data?.Stdno)}/>
                      </div>
                    </div>
                    
                    
                    
                    </td>                 

                  
                </tr>

                )
                
                )
            }
                
            
            </tbody>
          </table>
        
      </div>
        
        </div>
    )
}

export default Form