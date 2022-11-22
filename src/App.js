import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
import { Delete, Edit } from "@material-ui/icons";

function App() {
  const intitalValue = {
    Empno: "",
    Name: "",
    Role: "",
    Email: "",
    Mobile: "",
    Status: "",
  };

  const errMsgInit = {
    Empno: "",
    Name: "",
    Role: "",
    Email: "",
    Mobile: "",
    Status: "",
  };

  const [item, setitem] = useState(intitalValue);
  const [tabledata, setTabledata] = useState([]);
  const [isEmpExist, setIsEmpExist] = useState(false);
  const [isAddButton, setIsaddbutton] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [errMsg, setErrMsg] = useState(errMsgInit)
  

  //console.log("isEmpExist:", isEmpExist);

  //console.log("items :>> ", item);
  //console.log("tabledata :>> ", tabledata);

  const empnumber = useMemo(
    () => (Array.isArray(tabledata) ? tabledata.map((data) => data.Empno) : []),
    [tabledata]
  );

  const handlechange = (e) => {
    //const name = e.target.name;
    //const value = e.target.value;

    //destructing array ========>>>>  const { name, value } = e?.target;
    const { name, value } = e?.target;

    if(name === 'Mobile'){
     if(value.length < 11){
      console.log('value :>> ', value);
      setitem({ ...item, [name]: value });
      setErrMsg({...errMsg, Mobile: ""})

     }else {
      console.log(`Mobile number can't exist 10 digit`);
      setErrMsg({...errMsg, Mobile: "It's not a valid mobile number."})
     }
     
    }
    else{
      setitem({ ...item, [name]: value });
    }
    

    //console.log("name :>> ", name);
    //console.log("value", value);

    // Method - 1

    // Method - 2
    // setitem((intialVal)=> {
    //   return {...intialVal,[name] : value}
    // });
  };

  const submitted = (e) => {
    e.preventDefault();
    if (!isEmpExist && isAddButton) {
      setTabledata([...tabledata, item]);
      setitem(intitalValue);
    } else {
      let oldvalues = [...tabledata];
      oldvalues[editIndex] = item;
      setTabledata(oldvalues);
      setitem("");
      setIsaddbutton(true);
      setEditIndex(null);
      setitem(intitalValue);
    }
  };

  const deleted = (Empno) => {
    console.log("Empno:", Empno);
    let deletedvalues = tabledata.filter((value) => value?.Empno !== Empno);
    setTabledata(deletedvalues);
  };

  const handleEdit = (valuess) => {
    const { Empno } = valuess;
    const index = empnumber.indexOf(Empno);
    setEditIndex(index);
    setitem(valuess);
    setIsaddbutton(false);
  };

  useEffect(() => {
    if (empnumber.includes(item?.Empno) && isAddButton) {
      setIsEmpExist(true);
    } else {
      setIsEmpExist(false);
    }
  }, [item?.Empno, tabledata, empnumber, isAddButton]);

  return (
    <div className="myContainer">
      <h1>Register Form</h1>
      <div className="container py-5 w-50">
        <div className="card bg-white bg-gradient text-black p-3">
          <form onSubmit={submitted}>
            <div className="mb-3">
              <label className="form-label">Emp No:</label>
              <input
                type="number"
                className="form-control"
                name="Empno"
                value={item.Empno >= 0 ? item?.Empno : 0  }
                id="Empno"
                disabled={!isAddButton}
                required
                onChange={handlechange}
              />
            </div>

            {isEmpExist && (
              <p className="fw-bolder text-danger">This is alraedy exits</p>
            )}

            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                name="Name"
                value={item.Name}
                id="Name"
                required
                onChange={handlechange}
              />
            </div>

            <div className="mb-2"> Role: </div>
            <select
              className="form-select mb-3"
              name="Role"
              onChange={handlechange}
              value={item.Role}
            >
              <option value="">{"Select Role"}</option>
              <option value="FrontEnd">FrontEnd Developer</option>
              <option value="Bankend">BankEnd Developer</option>
              <option value="Fullstack">Fullstack Developer</option>
            </select>

            {/* <div className="mb-3">
              <label className="form-label">Role:</label>
              <input
                type="text"
                className="form-control"
                name="Role"
                value={item.Role}
                required
                onChange={handlechange}
              />
            </div>  */}

            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                name="Email"
                value={item.Email}
                required
                onChange={handlechange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile:</label>
              <input
                type="number"
                className="form-control"
                name="Mobile"
                value={item.Mobile}
                required
                onChange={handlechange}
              />
              {errMsg && <p className="text-danger">{errMsg?.Mobile}</p>}
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="Status"
                id="flexRadioDefault1"
                value="Fresher"
                checked={item.Status === "Fresher"}
                onChange={handlechange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Fresher
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="Status"
                id="flexRadioDefault2"
                value="Experience"
                checked={item.Status === "Experience"}
                onChange={handlechange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Experience
              </label>
            </div>

            <div className="d-grid gap-2 col-2 mx-auto">
              <button
                className={`btn text-white bg-gradient ${isAddButton ? "bg-success" : "bg-primary"}`}
                type="submit"
              >
                {isAddButton ? "ADD" : "Updata"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container w-75 py-5">
        {tabledata.length > 0 && (
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
              {tabledata.map((valuess, index) => (
                <tr key={index}>
                  <td>{valuess?.Empno}</td>
                  <td>{valuess?.Name}</td>
                  <td>{valuess?.Role}</td>
                  <td>{valuess?.Mobile}</td>
                  <td>{valuess?.Email}</td>
                  <td>{valuess?.Status}</td>
                  <td>
                    <div className="d-flex">
                      <div className="mx-2 pointer">
                        <Delete onClick={() => deleted(valuess?.Empno)} />
                      </div>
                      <div
                        className="mx-2 pointer"
                        onClick={() => handleEdit(valuess)}
                      >
                        <Edit />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
