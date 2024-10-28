import React, { useEffect, useState } from "react";
import "../Main/User.css"
import axios from "axios"

const UserManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setDetailModal] = useState(false);
  console.log(selectedEmployee);



  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/api/users",
        {
          headers: {
            "Content-Type": "application/json"
          }
        }

      )
      console.log("check", response.data);
      setEmployees(response.data);
    }
    fetchData();
  }, [])
  const openDetailModal = async () => {
    setDetailModal(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/user/${selectedEmployee.userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Here", response.data);

    } catch (error) {
      console.error("Error fetching user data:", error);
    }

  }
  const closeDetailModal = () => setDetailModal(false);
  const openAddModal = () => {

    setShowAddModal(true)
  };
  const closeAddModal = () => setShowAddModal(false);

  const openEditModal = (employee) => {
    setShowEditModal(true);
  };
  const closeEditModal = () => setShowEditModal(false);

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => setShowDeleteModal(false);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const newEmployee = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      const response = await axios.post("http://localhost:8080/api/users",
        newEmployee,
        {
          headers: {
            "Content-Type": "application/json"
          }
        },

      )
      setEmployees([...employees, {
        ...newEmployee,
        userId: response.data.userId
      }]);
      closeAddModal();
    } catch (error) {
      console.log(err);

    }

  };

  const handleEditEmployee = async (e) => {
    e.preventDefault();

    const updateEmployee = { ...selectedEmployee, username: e.target.username.value, password: e.target.password.value }
    console.log("check update ", selectedEmployee);

    try {
      const response = await axios.put(`http://localhost:8080/api/users/${selectedEmployee.userId}`,
        updateEmployee, {
        headers: {
          "Content-Type": "application/json"
        }
      }
      )
      console.log("check update", response.data);
      setEmployees(
        employees.map((emp) =>
          emp.userId === selectedEmployee.userId ? { ...selectedEmployee, ...{ username: e.target.username.value, password: e.target.password.value } } : emp
        )
      );
      closeEditModal();
      alert("Edit successfully!!!")
    } catch (error) {
      console.log(error);


    }

  };

  const handleDeleteEmployee = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/users/${selectedEmployee.userId}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      console.log("after delete", response.data);
      alert("delete succesfully!!!")
    } catch (error) {
      console.log(err);
    }
    setEmployees(employees.filter((emp) => emp.userId !== selectedEmployee.userId));
    closeDeleteModal();
  };

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
              </div>
              <div className="col-sm-6">
                <button onClick={openAddModal} className="btn btn-success"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></button>
                <button onClick={() => openDeleteModal()} className="btn btn-danger"><i className="material-icons">&#xE15C;</i> <span>Delete</span></button>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Password</th>

              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employees.userId} onClick={() => setSelectedEmployee(employee)}>
                  <td>{employee.userId}</td>
                  <td>{employee.username}</td>
                  <td>{employee.password}</td>
                  <td>
                    <button onClick={() => openEditModal()} className="edit"><i className="material-icons" title="Edit">Edit</i></button>
                    <button onClick={() => openDeleteModal()} className="delete"><i className="material-icons" title="Delete">X</i></button>
                    <button onClick={() => openDetailModal()} className="delete"><i className="material-icons" title="Delete">I</i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="modalAdd">
          <form onSubmit={handleAddEmployee}>
            <h4>Add Employee</h4>

            <div className="inputGroup">
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" placeholder="Username..." id="username" required />
              <br />
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" placeholder="Password..." id="password" required />
            </div>

            <div className="buttonGroup">
              <button type="submit">Add</button>
              <button onClick={closeAddModal}>Cancel</button>
            </div>

          </form>
        </div>
      )}

      {showDetailModal && (
        <table cellPadding={10} border={1} className="modalDetail">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
          <tr>
            <td>{selectedEmployee.userId}</td>
            <td>{selectedEmployee.username}</td>
            <td>{selectedEmployee.password}</td>
            <td>
              <button onClick={() => closeDetailModal()} className="edit"><i className="material-icons" title="Detail">Ok</i></button>
            </td>
          </tr>
        </table>
      )}




      {showEditModal && (
        <div className="modalImp">
          <form onSubmit={handleEditEmployee}>
            <h4>Edit Employee</h4>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" defaultValue={selectedEmployee.username} id="username" required />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" defaultValue={selectedEmployee.password} id="password" required />
            <div className="buttonGroup">
              <button type="submit">Save</button>
              <button onClick={closeEditModal}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {showDeleteModal && (
        <div className="modalImp">
          {selectedEmployee ? (
            <div>
              <p>Are you sure you want to delete <span className="userDelete">{selectedEmployee?.username}?</span></p>
              <div className="buttonGroup">
                <button onClick={handleDeleteEmployee}>Delete</button>
                <button onClick={closeDeleteModal}>Cancel</button>
              </div>
            </div>


          ) : (

            <div>
              <p>Choose user you want to delete!</p>
              <div className="buttonGroup" style={{marginLeft:"auto", marginRight:"auto"}}>
                <button onClick={closeDeleteModal}>Ok</button>
              </div>
            </div>
          )}


        </div>
      )}
    </div>
  );
};

export default UserManagement;
