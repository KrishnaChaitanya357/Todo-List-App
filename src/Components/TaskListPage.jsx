import React, { useEffect, useState } from 'react';
import {
    Button,
    Paper,
    Typography,
} from '@mui/material';
import { Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const TaskListPage = () => {
    const [taskList, setTaskList] = useState([]);
    const [task, setTask] = useState({ title: "", description: "", dueDate: "" });
    const [error, setError] = useState(false); // for error validations

  

    // I want to store the data in LocalStorage as I am working with a small set of data
    const saveToLocalStorage = (data) => {
        localStorage.setItem('taskList', JSON.stringify(data));
    };

    // collecting the form details and then storing in the task
    const handleTask = (e) => {
        setTask((prevTask) => ({
            ...prevTask,
            [e.target.name]: e.target.value
        }));
    }

    // Pushing the task object into taskList
    const handleTaskList = () => {
       
        if (task.title.trim() !== "" && task.description.trim() !== "" && task.dueDate !== "") {
           
            // Generate a unique ID for the new task
            const newTask = {
                id: uuidv4(),
                title: task.title,
                description: task.description,
                dueDate: task.dueDate
            };
            const updatedTaskList = [...taskList, newTask];
            setTaskList(updatedTaskList);
            setTask({ title: "", description: "", dueDate: "" });
            saveToLocalStorage(updatedTaskList);
            setError(false);
        }
        else{
            setError(true)
        }
    }

    // For deleting a particular task
    const handleDelete = (taskId) => {
        const updatedTasks = taskList.filter((task) => task.id !== taskId);
        setTaskList(updatedTasks);
        saveToLocalStorage(updatedTasks);
    }
    // sorting the tasks based on title and due date

    const handleSort = (value) => {
        if (value === "dueDate") {
            const sortByDate = [...taskList].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            setTaskList(sortByDate)
        }

        if (value === "Title") {
            const sortByTitle = [...taskList].sort((a, b) => {
                // Use localeCompare to compare strings in a case-insensitive manner
                return a.title.localeCompare(b.title);
            });
            setTaskList(sortByTitle);
        }

       
    }

    // using UseEffect to continuosly update changes 
    useEffect(() => {
       
        const list = localStorage.getItem("taskList")
        if (list) {
            setTaskList(JSON.parse(list))
        }
    }, [])


    return (<>
        <div className='pt-3 bg-dark'> <h2 className=' text-light pb-3'>Todo List App</h2>
        </div>
        <div className='container d-flex my-5 py-3'>
            <div className='col-lg-6 Todoform mx-2 p-3 bg-primary text-center'>
                <h3 className='text-light'>Create Task</h3>
                <div className="mb-3 col-md-9 mx-auto">
                    <label htmlFor="exampleFormControlInput1" className="form-label  text-light">Title</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" name="title" onChange={handleTask} value={task.title} />
                    {error && task.title.trim() === "" ? <span className='text-danger'>Title is mandatory</span> : ""}
                </div>
                <div className="mb-3 col-md-9 mx-auto">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label text-light">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="description" onChange={handleTask} value={task.description}></textarea>
                    {error && task.description.trim().length < 5? <span className='text-danger'>Description should be at least 5 characters</span> : ""}
                </div>
                <div className="mb-3 col-md-9 mx-auto">
                    <label htmlFor="exampleFormControlInput1" className="form-label  text-light">Due Date</label>
                    <input type="date" className="form-control" id="exampleFormControlInput1" name="dueDate" onChange={handleTask} value={task.dueDate} />
                    {error && (new Date(task.dueDate) <= new Date()) ? <span className='text-danger'>Enter a valid due Date</span> : ""}

                </div>

                <div className="d-grid gap-2 col-3 mx-auto">
                    <button className="btn btn-warning" type="button" onClick={handleTaskList}>Add Task</button>
                </div>
            </div>



            <div className='col-lg-6 todoList p-3  mx-2 bg-success'>
                <h3 className='text-light'>Task List</h3>
                <div className='d-flex justify-content-around align-items-center pb-3'>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleSort("dueDate")}
                        style={{ margi: 'auto',color:"white",borderColor:"white" }} 
                    >
                       Sort by DueDate
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleSort("Title")}
                        style={{ margi: 'auto',color:"white",borderColor:"white"  }} 
                    >
                       Sort by Title
                    </Button>
                    
                </div>
                <div className='d-flex justify-content-center '>
                   
                </div>
                {taskList.length > 0 ? (
                    taskList.map((task, index) => (
                        <div key={index} className='mx-auto col-md-10 pb-3'>
                            <Paper elevation={3} style={{ padding: '20px', position: 'relative' }}>
                                <Button
                                    size="small"
                                    variant="circle"
                                    style={{ position: 'absolute', top: '0px', right: '0px' }}
                                    onClick={() => handleDelete(task.id)}
                                >
                                    X
                                </Button>
                                <div className='d-flex justify-content-between align-items-center pt-3 '>
                                    <div>
                                        <Typography variant="h6"> {task.title}   </Typography>
                                        <Typography >{task.dueDate}</Typography>
                                    </div>
                                    <Link to={`/tasks/${task.id}`} >
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            style={{ marginLeft: '10px' }} 
                                        >
                                            View
                                        </Button>  </Link>
                                </div>

                            </Paper>

                        </div>
                    ))
                ) : (
                    <h4 className='text-light pt-5'>Task List Empty</h4>
                )}
            </div>




        </div>
    </>)
}

export default TaskListPage