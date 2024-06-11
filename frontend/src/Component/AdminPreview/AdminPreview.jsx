import React, { useEffect, useState } from "react";
import "./AdminPreview.css";
import { CiSearch } from "react-icons/ci";
import UserTable from "./UserTable";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import useAuthRedirect from "../../../context/useAuth";
import axios from "axios";

const userData = [];

const AdminPreview = () => {
  useAuthRedirect();
  const [search, setSearch] = useState("");
  const [adminData, setAdminData] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:3500/admin");
        setAdminData(response.data);
      } catch (error) {
        setIsLoading(false);
        setMessage("Cannot fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting user with id:", id);
    try {
      await axios.delete(`http://localhost:3500/admin/${id}`);
      setAdminData((prevData) => prevData.filter((admin) => admin._id !== id));
      setMessage("Admin deleted successfully");
    } catch (error) {
      setMessage("Failed to delete admin");
      console.error("Error deleting admin");
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      const response = await axios.patch(`http://localhost:3500/admin/${id}`, {
        role: newRole,
      });
      setAdminData((prevData) =>
        prevData.map((admin) =>
          admin._id === id ? { ...admin, role: response.data.role } : admin
        )
      );
      setMessage("Admin updated Successfully");
    } catch (error) {
      setMessage("Failed to update admin");
      console.error("Failed to update admin", error);
    }
  };

  const filteredData = adminData.filter(
    (admin) =>
      admin.fullname.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="__prevCon">
      <h2 className="__prevHeader">Admins</h2>

      <div className="__prevSearchCon">
        <CiSearch className="__prevSearchIcon" />
        <input
          type="text"
          className="__prevSearch"
          placeholder="Search by name or email or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="__prevList">
        {isLoading ? (
          <p>Loading...</p>
        ) : adminData.length > 0 ? (
          <UserTable
          data={filteredData}
          onDelete={handleDelete}
          onUpdateRole={handleUpdateRole}
            />
          ) : (<p>No admins found</p>)
        }
        
      </div>

        {message && <p>{message}</p>}

    </div>
  );
};

export default AdminPreview;
