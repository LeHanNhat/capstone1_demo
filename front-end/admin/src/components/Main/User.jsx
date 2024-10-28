import React, { useEffect, useState } from "react";
import "../Main/User.css"
import axios from "axios"

const UserManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  useEffect(()=>{
    const fetchData = async()=>{
        const response = await axios.get("http://localhost:8080/api/users",
          {
            headers:{
              "Content-Type":"application/json"
            }
          }

        )
        console.log("check",response.data);
        setEmployees(response.data);
    }
    fetchData();
  },[])

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };
  const closeEditModal = () => setShowEditModal(false);

  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => setShowDeleteModal(false);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: employees.length + 1,
      name: e.target.name.value,
      email: e.target.email.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
    };
    setEmployees([...employees, newEmployee]);
    closeAddModal();
  };

  const handleEditEmployee = (e) => {
    e.preventDefault();
    setEmployees(
      employees.map((emp) =>
        emp.id === selectedEmployee.id ? { ...selectedEmployee, ...{ name: e.target.name.value, email: e.target.email.value, address: e.target.address.value, phone: e.target.phone.value } } : emp
      )
    );
    closeEditModal();
  };

  const handleDeleteEmployee = () => {
    setEmployees(employees.filter((emp) => emp.id !== selectedEmployee.id));
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
              {employees.map((employee) => (
                <tr key={employee.userId}>
                  <td>{employee.userId}</td>
                  <td>{employee.username}</td>
                  <td>{employee.password}</td>
                  <td>
                    <button onClick={() => openEditModal(employee)} className="edit"><i className="material-icons" title="Edit">&#xE254;</i></button>
                    <button onClick={() => openDeleteModal(employee)} className="delete"><i className="material-icons" title="Delete">&#xE872;</i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="modal">
          <form onSubmit={handleAddEmployee}>
            <h4>Add Employee</h4>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="text" name="address" placeholder="Address" required />
            <input type="text" name="phone" placeholder="Phone" required />
            <button type="submit">Add</button>
            <button onClick={closeAddModal}>Cancel</button>
          </form>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditModal && (
        <div className="modal">
          <form onSubmit={handleEditEmployee}>
            <h4>Edit Employee</h4>
            <input type="text" name="name" defaultValue={selectedEmployee.name} required />
            <input type="email" name="email" defaultValue={selectedEmployee.email} required />
            <input type="text" name="address" defaultValue={selectedEmployee.address} required />
            <input type="text" name="phone" defaultValue={selectedEmployee.phone} required />
            <button type="submit">Save</button>
            <button onClick={closeEditModal}>Cancel</button>
          </form>
        </div>
      )}

      {/* Delete Employee Modal */}
      {showDeleteModal && (
        <div className="modal">
          <p>Are you sure you want to delete {selectedEmployee?.name}?</p>
          <button onClick={handleDeleteEmployee}>Delete</button>
          <button onClick={closeDeleteModal}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
