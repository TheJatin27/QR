import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTeacher from "./pages/AddTeacher";
import TeacherProfile from "./pages/TeacherProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddTeacher />} />
        <Route path="/teacher/:id" element={<TeacherProfile />} />
      </Routes>
    </BrowserRouter>
  );
}