import { useState } from "react";
import { API } from "../api";
import { QRCodeCanvas } from "qrcode.react";

export default function AddTeacher() {

  const [form, setForm] = useState({});
  const [photoBase64, setPhotoBase64] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhotoBase64(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...form,
      photoURL: photoBase64
    };

    const res = await API.post("/add-teacher", dataToSend);
    setTeacherId(res.data.id);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Teacher</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="fatherName" placeholder="Father Name" onChange={handleChange} />
        <input name="motherName" placeholder="Mother Name" onChange={handleChange} />
        <input name="designation" placeholder="Designation" onChange={handleChange} />
        <input name="department" placeholder="Department" onChange={handleChange} />
        <input type="date" name="dob" onChange={handleChange} />
        <input name="contact" placeholder="Contact" onChange={handleChange} />
        <input name="bloodGroup" placeholder="Blood Group" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="identificationMark" placeholder="Identification Mark" onChange={handleChange} />
        <input name="aadhaarNo" placeholder="Aadhaar No" onChange={handleChange} />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Save</button>
      </form>

      {teacherId && (
        <div style={{ marginTop: 20 }}>
          <h3>QR Code</h3>
          <QRCodeCanvas
           value={`${window.location.origin}/teacher/${teacherId}`}
            size={200}
          />
        </div>
      )}
    </div>
  );
}