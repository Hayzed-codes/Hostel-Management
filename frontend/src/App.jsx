import { Route, Routes } from "react-router-dom";
import AdminReg from "./Component/Register/AdminReg";
import Login from "./Component/Register/Login";
import StudentReg from "./Component/Register/StudentReg";
import HomeDash from "./Component/Dashboard/HomeDash";
import Layout from "./Component/Layout/Layout";
import StudentDashboard from "./Component/Dashboard/StudentDashboard";
import Rooms from "./Component/Dashboard/Rooms";
import AdminPreview from "./Component/AdminPreview/AdminPreview";
import Attendance from "./Component/Attendance/Attendance";

function App() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000)

  // }, [])

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<AdminReg />} />

          <Route path="/login" element={<Login />} />

          <Route path="/student-reg" element={<StudentReg />} />

          <Route
            path="/homedash"
            element={
              <Layout>
                <HomeDash />
              </Layout>
            }
          />

          <Route path="/room" element={<Rooms />} />

          <Route path="/adminPrev" element={<AdminPreview />} />

          <Route
            path="/attendance"
            element={
              <Layout>
                <Attendance />
              </Layout>
            }
          />

          <Route path="/studentdash" element={<StudentDashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
