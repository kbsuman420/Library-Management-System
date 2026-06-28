import { Routes, Route } from 'react-router-dom';

import Dashboard from './pages/admin/Dashboard';
import Books from './pages/admin/Books';
import BorrowRecords from './pages/admin/BorrowRecords';
import ReturnRecords from './pages/admin/ReturnRecords';
import Profile from './pages/admin/Profile';
import Authentication from "./pages/Authentication"
import DashBoardLayout from "./pages/DashBoardLayout"

import AdminLogin from "./components/AdminLogin"
import StudentLogin from './components/StudentLogin';
import Register from './components/Register';
import RegisterOtpVerified from './components/RegisterOtpVerified';

import StudentDashboardLayout from './pages/StudentDashboardLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentBooks from './pages/student/StudentBooks';
import StudentBorrowRecords from './pages/student/StudentBorrowRecords';
import StudentReturnRecords from './pages/student/StudentReturnRecords';
import StudentProfile from './pages/student/StudentProfile';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Authentication />}>
        <Route index element={<StudentLogin />} />
        <Route path="login" element={<StudentLogin />} />
        <Route path="register" element={<Register />} />
        <Route path="registerOtpVerified" element={<RegisterOtpVerified />} />
      </Route>
      <Route path="admin/login" element={<AdminLogin />} />

      <Route path='/dashboard' element={<DashBoardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="books" element={<Books />} />
        <Route path="borrow-records" element={<BorrowRecords />} />
        <Route path="return-records" element={<ReturnRecords />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path='student-dashboard' element={<StudentDashboardLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="books" element={<StudentBooks />} />
        <Route path="borrow-records" element={<StudentBorrowRecords />} />
        <Route path="return-records" element={<StudentReturnRecords />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

    </Routes>

  );
}

export default App;
