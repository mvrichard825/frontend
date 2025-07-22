import { useState } from 'react';
import axios from 'axios';
import './FamilyForm.css'; // <-- Ensure you import the CSS file

function FamilyForm() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    relationship: '',
    contact: '',
    address: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-zjbc.onrender.com/api/members', form);
      alert('✅ Member registered successfully!');
      setForm({
        name: '',
        age: '',
        gender: '',
        relationship: '',
        contact: '',
        address: ''
      });
    } catch (error) {
      alert('❌ Failed to add member.');
      console.error(error);
    }
  };

  return (
    <div className="family-form-container">
      <h2>Register Family Member</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} type="number" required />
        <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} required />
        <input name="relationship" placeholder="Relationship" value={form.relationship} onChange={handleChange} required />
        <input name="contact" placeholder="Contact Info" value={form.contact} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
}

export default FamilyForm;
