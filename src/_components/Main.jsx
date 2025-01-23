import React, { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Main() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualifications, setQualifications] = useState([]);
  const [qualificationInput, setQualificationInput] = useState("");
  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const usersCollectionRef = collection(db, "users");

  const fetchUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const resetForm = () => {
    setName("");
    setDob("");
    setEmail("");
    setPhone("");
    setQualifications([]);
    setQualificationInput("");
    setResume(null);
    setProfilePhoto(null);
    setEditId(null);
  };

  const handleAddUser = async () => {
    const newUser = {
      name,
      dob,
      email,
      phone,
      qualifications,
      resume: resume ? resume.name : "",
      profilePhoto: profilePhoto ? profilePhoto.name : "",
    };
    await addDoc(usersCollectionRef, newUser);
    resetForm();
    fetchUsers();
    setIsModalOpen(false);
  };

  const handleEditUser = async () => {
    const updatedUser = {
      name,
      dob,
      email,
      phone,
      qualifications,
      resume: resume ? resume.name : "",
      profilePhoto: profilePhoto ? profilePhoto.name : "",
    };
    const userDoc = doc(db, "users", editId);
    await updateDoc(userDoc, updatedUser);
    resetForm();
    fetchUsers();
    setIsModalOpen(false);
  };

  const handleDeleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    fetchUsers();
  };

  const handleAddQualification = () => {
    if (qualificationInput.trim()) {
      setQualifications([...qualifications, qualificationInput.trim()]);
      setQualificationInput("");
    }
  };

  const handleRemoveQualification = (index) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setEditId(user.id);
    setName(user.name);
    setDob(user.dob);
    setEmail(user.email);
    setPhone(user.phone);
    setQualifications(user.qualifications || []);
    setResume(null);
    setProfilePhoto(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Home Page
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-8 text-center">
            <button
              onClick={handleOpenCreateModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create Document
            </button>
            <button
              onClick={() => setIsViewOpen(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              View Documents
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                  {editId ? "Edit Document" : "Create Document"}
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    editId ? handleEditUser() : handleAddUser();
                  }}
                >
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full px-4 py-2 border rounded-md"
                      required
                    />
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="block w-full px-4 py-2 border rounded-md"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-4 py-2 border rounded-md"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full px-4 py-2 border rounded-md"
                      required
                    />
                    <label className="block text-sm font-medium text-gray-700">
                      Qualifications
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={qualificationInput}
                        onChange={(e) => setQualificationInput(e.target.value)}
                        className="block flex-1 px-4 py-2 border rounded-md"
                        placeholder="Add a qualification"
                      />
                      <button
                        type="button"
                        onClick={handleAddQualification}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                      >
                        Add
                      </button>
                    </div>
                    <ul className="mt-2 space-y-2">
                      {qualifications.map((qual, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md">
                            {qual}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveQualification(index)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                    <label className="block text-sm font-medium text-gray-700">
                      Resume
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setResume(e.target.files[0])}
                      className="block w-full px-4 py-2"
                    />
                    <label className="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfilePhoto(e.target.files[0])}
                      className="block w-full px-4 py-2"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full hover:bg-indigo-700"
                    >
                      {editId ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isViewOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-2/3 shadow-lg">
                <h2 className="text-xl font-bold mb-4">View Documents</h2>
                <table className="w-full border">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>DOB</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.dob}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            onClick={() => handleOpenEditModal(user)}
                            className="text-blue-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-500 ml-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() => setIsViewOpen(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md mt-4"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Main;
