import React, { useEffect, useState } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const TaskDetailsPage = () => {
  const [taskDetails, setTaskDetails] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editedContent, setEditedContent] = useState({ title: '', description: '', dueDate: '' });

  const navigate = useNavigate();
  const { taskId } = useParams();

  const handleDelete = (index) => { 
    navigate("/")
    const updatedTaskDetails = [...taskDetails];
    updatedTaskDetails.splice(index, 1);
    setTaskDetails(updatedTaskDetails);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskDetails));
  };

  const handleEdit = () => { 
    setEdit(true);
    // Set the edited content to the current task's values
    setEditedContent({
      title: selectedTask.title,
      description: selectedTask.description,
      dueDate: selectedTask.dueDate,
    });
  };

  const handleSave = () => { 
    const updatedTaskDetails = [...taskDetails];
    const index = updatedTaskDetails.findIndex((taskItem) => taskItem.id === taskId);
    updatedTaskDetails[index] = {
      ...selectedTask,
      title: editedContent.title,
      description: editedContent.description,
      dueDate: editedContent.dueDate,
    };
    setTaskDetails(updatedTaskDetails);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskDetails));
    setEdit(false); // Exit edit mode after saving
  };

  useEffect(() => {
    const taskList = localStorage.getItem('taskList');
    if (taskList) {
      setTaskDetails(JSON.parse(taskList));
    }
  }, []);

  // Find the selected task by taskId
  const selectedTask = taskDetails.find((taskItem) => taskItem.id === taskId);

  if (!selectedTask) {
    // Handle the case where the task is not found
    return <p>Task not found.</p>;
  }

  return (
    <div className='container col-lg-6 mt-5 bg-primary py-3'>
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between', color:"white" }}>
          Task Details
          <div>
            {!edit && (
              <Button variant="outlined" onClick={handleEdit} style={{ marginRight: '5px',color:"white",borderColor:"white" }}>
                Edit
              </Button>
            )}
            <Button variant="outlined" onClick={() => handleDelete(selectedTask.id)}  style={{ color:"white",borderColor:"white" }}>
              Delete
            </Button>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className='bg-light p-2 mb-2'>
          <TextField
            label="Title"
            fullWidth
            variant="outlined"
            margin="dense"
            value={edit ? editedContent.title : selectedTask.title}
            onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
            disabled={!edit}
          />
          </div>
           <div className=' bg-light p-2 mb-2' >
           <TextField
            label="Due Date"
            type="date"
            fullWidth
            variant="outlined"
            margin="dense"
            value={edit ? editedContent.dueDate : selectedTask.dueDate}
            onChange={(e) => setEditedContent({ ...editedContent, dueDate: e.target.value })}
            disabled={!edit}
          />
           </div>
          <div className='bg-light p-2'>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            margin="dense"
            value={edit ? editedContent.description : selectedTask.description}
            onChange={(e) => setEditedContent({ ...editedContent, description: e.target.value })}
            disabled={!edit}
          />

          </div>
        
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {edit && (
          <Button variant="outlined" onClick={handleSave} style={{color:"white",borderColor:"white" }}>
            Save
          </Button>
        )}
      </DialogActions>

    {!edit ?<Button variant="outlined" onClick={()=>navigate("/")} style={{color:"white",borderColor:"white" }}>
            Back to home
          </Button>:"" }

    </div>
  );
};

export default TaskDetailsPage;
