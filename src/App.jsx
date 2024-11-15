import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Home from "./screens/Home";
import Students from "./screens/Students";
import Supervisors from "./screens/Supervisors";
import Dissertation from "./screens/Dissertation";
import Settings from "./screens/Settings";
import Login from "./screens/Login";
import StudentForm from "./screens/Student";
import DissertationForm from "./screens/AddDissertation";
import SupervisorForm from "./screens/AddSupervisors";
import Departments from "./screens/Departments";
import Courses from "./screens/Courses";
import Signup from "./screens/Signup";
import {Provider} from 'react-redux'
import store from "./store/store";
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import MyStudents from "./screens/MyStudents";
import VerifiedDissertations from "./screens/VerifiedDissertation";
import UnverifiedDissertations from "./screens/Unverified";
import ForgotPassword from "./screens/ForgotPassword";

const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      {location.pathname !== "/login" && (
        <div className="flex">
          <Sidebar />
          <Dashboard />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:courseId/students" element={<Students />} />
        <Route path="/supervisors" element={<Supervisors />} />
        <Route path="/dissertations" element={<Dissertation />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/courses" element={ <Courses/>} />
        <Route path="/addStudent" element={<StudentForm/>}/>
        <Route path="/addDissertation" element={<DissertationForm/>}/>
        <Route path="/addSupervisors" element={<SupervisorForm/>}/>
        <Route path="/students" element={<MyStudents/>} />
        <Route path="/verified" element={<VerifiedDissertations/>} />
        <Route path="/unverified" element={<UnverifiedDissertations/>} />
        
      </Routes>
    </Provider>
    </QueryClientProvider>
    
  );
}

function App() {
  return (
   <QueryClientProvider client={queryClient}>
     <Provider store={store}>
       <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/*" element={<AppLayout />} />
        <Route path="/signup" component={<Signup/>}/>
        
        
      </Routes>
    </Router>
    </Provider>
   </QueryClientProvider>
   
  );
}

export default App;
