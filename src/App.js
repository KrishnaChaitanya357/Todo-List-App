import './App.css';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import TaskListPage from './Components/TaskListPage';
import TaskDetailsPage from './Components/TaskDetailsPage';
import { useEffect } from 'react';



function App() {
  const navigate =useNavigate()
    const location =useLocation()
  useEffect(()=>{
    const currentpath =location.pathname;
    if(currentpath==="/")
    {
        navigate("/tasks")
    }
  })
  return (
    <div className="App">
      <Routes>
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="/tasks/:taskId" element={<TaskDetailsPage/>} />
       
      </Routes>
    </div>
  );
}

export default App;
