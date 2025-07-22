import { useEffect, useState } from 'react';
import axios from 'axios';


function MemberList() {
  const [members, setMembers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    age: '',
    gender: '',
    relationship: '',
    contact: '',
    address: ''
  });

  // Fetch members on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  // Load members from API
  const fetchMembers = async () => {
    try {
      const res = await axios.get('https://backend-zjbc.onrender.com/api/members');
      setMembers(res.data);
    } catch (err) {
      console.error('Error fetching members:', err);
    }
  };

  // Delete member
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await axios.delete(`https://backend-zjbc.onrender.com/api/members/${id}`);
      fetchMembers(); // Refresh the list
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Start editing a member
  const handleEdit = (member) => {
    setEditId(member._id);
    setEditData({
      name: member.name,
      age: member.age,
      gender: member.gender,
      relationship: member.relationship,
      contact: member.contact,
      address: member.address
    });
  };

  // Update form fields during edit
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Submit updated data
  const handleUpdate = async () => {
    try {
      await axios.put(`https://backend-zjbc.onrender.com/api/members/${editId}`, editData);
      setEditId(null);
      setEditData({});
      fetchMembers(); // Refresh the list
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  return (
    
    <div>
      <h2>📋 Registered Family Members</h2>
      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <ul>
          {members.map((member) => (
            <li key={member._id} style={{ marginBottom: '1rem' }}>
              {editId === member._id ? (
                <div>
                  <input
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    placeholder="Name"
                  />
                  <input
                    name="age"
                    type="number"
                    value={editData.age}
                    onChange={handleEditChange}
                    placeholder="Age"
                  />
                  <input
                    name="gender"
                    value={editData.gender}
                    onChange={handleEditChange}
                    placeholder="Gender"
                  />
                  <input
                    name="relationship"
                    value={editData.relationship}
                    onChange={handleEditChange}
                    placeholder="Relationship"
                  />
                  <input
                    name="contact"
                    value={editData.contact}
                    onChange={handleEditChange}
                    placeholder="Contact"
                  />
                  <input
                    name="address"
                    value={editData.address}
                    onChange={handleEditChange}
                    placeholder="Address"
                  />
                  <br />
                  <button onClick={handleUpdate}>💾 Save</button>
                  <button onClick={handleCancel}>❌ Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>{member.name}</strong> — {member.relationship}, {member.age} yrs, {member.gender}<br />
                  📞 {member.contact} | 📍 {member.address}<br />
                  <button onClick={() => handleEdit(member)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(member._id)}>🗑️ Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MemberList;
