import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api";

export default function TeacherProfile() {

  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    API.get(`/teacher/${id}`)
      .then(res => setTeacher(res.data));
  }, [id]);

  if (!teacher) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{teacher.name}</h2>
      <img src={teacher.photoURL} width="200" />

      <p><b>Designation:</b> {teacher.designation}</p>
      <p><b>Department:</b> {teacher.department}</p>
      <p><b>Father Name:</b> {teacher.fatherName}</p>
      <p><b>Mother Name:</b> {teacher.motherName}</p>
      <p><b>DOB:</b> {teacher.dob}</p>
      <p><b>Contact:</b> {teacher.contact}</p>
      <p><b>Blood Group:</b> {teacher.bloodGroup}</p>
      <p><b>Email:</b> {teacher.email}</p>
      <p><b>Address:</b> {teacher.address}</p>
      <p><b>Identification Mark:</b> {teacher.identificationMark}</p>
    </div>
  );
}