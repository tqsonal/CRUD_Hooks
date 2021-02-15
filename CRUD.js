import React, { Component } from "react";

export class CRUD extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name:"",
      pass: "",
      flag: true,
      empList: [],
      index: "",
      nameError:''
    };
  }

  handleData = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  ValidForm = () => {
    var isValid=true;
      if(this.state.name.length==0 || this.state.name=="" || this.state.name==null){
      this.setState({
        nameError:"name field can not be empty"
            })
            isValid=false;
    }
    else if(this.state.name.length>6){
      this.setState({
        nameError:"name length should not be greater than 6"
            })
            isValid=false;
    }
    else if(this.state.name.match(/[a-zA-z0-9]/)){
      this.setState({
        nameError:"name should not contain number in it"
            })
            isValid=false;
    }
    else{
      this.setState({
                nameError:""
            })
            isValid=true
    }
    return isValid;
  };

  submitData = (e) => {
    e.preventDefault();
   var isvalid= this.ValidForm()
    // var isValid= this.state.isValid;
    // console.log(isValid)
    var arr = JSON.parse(localStorage.getItem("userList")) || [];

    var obj = { name: this.state.name, pass: this.state.pass };
    arr.push(obj);

    if(isvalid==true){
      localStorage.setItem("userList", JSON.stringify(arr));
      var arr = JSON.parse(localStorage.getItem("userList"));
      this.setState({
        empList: arr,
        name: "",
        pass: "",
      });
      this.displayData();
    }
    
    
  };

  componentDidMount() {
    var arr = JSON.parse(localStorage.getItem("userList")) || [];
    this.setState({
      empList: arr,
    });
  }

  displayData = () => {
    return this.state.empList.map((emp, index) => {
      //   alert('emp')
      return (
        <tr>
          <td> {index + 1}</td>
          <td>{emp.name}</td>
          <td> {emp.pass}</td>
          <td>
            <button
              className="btn btn-success ml-2"
              onClick={() => this.editData(index)}
            >
              {" "}
              edit
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.deleteData(index)}
            >
              {" "}
              delete
            </button>
          </td>
        </tr>
      );
    });
  };

  editData = (i) => {
    var arr = JSON.parse(localStorage.getItem("userList")) || [];
    var obj = arr[i];
    this.setState({
      name: obj.name,
      pass: obj.pass,
      flag: false,
      index: i,
    });
  };

  updateData = () => {
    var arr = JSON.parse(localStorage.getItem("userList")) || [];
    var obj = { name: this.state.name, pass: this.state.pass };
    console.log(obj);
    let i = this.state.index;
    arr[i] = obj;
    localStorage.setItem("userList", JSON.stringify(arr));

    var arr = JSON.parse(localStorage.getItem("userList"));
    this.setState({
      empList: arr,
      index: "",
      flag: true,
      name: "",
      pass: "",
    });
    this.displayData();
  };

  deleteData = (i) => {
    var arr = JSON.parse(localStorage.getItem("userList")) || [];
    arr.splice(i, 1);

    localStorage.setItem("userList", JSON.stringify(arr));
    var arr = JSON.parse(localStorage.getItem("userList"));
    this.setState({
      empList: arr,
    });
    this.displayData();
  };

  render() {
    return (
      <div className="container">
        <h1> CRUD Demo</h1>

        <form onSubmit={this.submitData}>
          <div className="form-group">
            <label> UserName<span className='text-danger'>  * </span></label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={(e) => this.handleData(e)}
              className="form-control"
              autoComplete="off"
            />
            <div className='text-danger'> {this.state.nameError?this.state.nameError:null}</div>
          </div>
          <div className="form-group">
            <label> Password <span className='text-danger'>  * </span></label>
            <input
              type="password"
              name="pass"
              value={this.state.pass}
              onChange={(e) => this.handleData(e)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-secondary"
              disabled={this.state.flag ? false : true}
            />
            <button
              className="btn btn-primary ml-3"
              disabled={this.state.flag ? true : false}
              onClick={() => this.updateData()}
            >
              {" "}
              update
            </button>
          </div>
        </form>
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th> sr no </th>
                <th> Name </th>
                <th> Password </th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>{this.displayData()}</tbody>
          </table>
        </>
      </div>
    );
  }
}

export default CRUD;
