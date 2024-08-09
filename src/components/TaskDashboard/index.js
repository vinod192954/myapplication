import { useState } from 'react';
import './index.css';
import ViewTasksList from '../ViewTasksList';

const TaskDashboard = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [refreshTasks, setRefreshTasks] = useState(false);

  const onSubmitProject = async (event) => {
    event.preventDefault();
    const userId = 12;
    const apiUrl = `https://taskmanagerbackend-ei4s.onrender.com/projects/${userId}`;

    const projectDetails = {
      projectName,
      projectDescription: description,
    };

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectDetails),
    };

    const response = await fetch(apiUrl, options);
    if (response.ok) {
      console.log("Project added successfully");
      setRefreshTasks(prevState => !prevState); // Trigger refresh after adding a project
    } else {
      console.log("Error adding project");
    }
  };

  const onChangeProjectName = (event) => {
    setProjectName(event.target.value);
  };

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className='taskdashboard-bg-container'>
      <div className="project-description-add-section">
        <h1 className='task-heading'>Task</h1>
        <form className='form-section' onSubmit={onSubmitProject}>
          <div className='label-input-section'>
            <label>Project name </label> <br />
            <input
              className='label-section'
              type='text'
              value={projectName}
              onChange={onChangeProjectName}
            />
          </div>
          <div className='label-textarea-section'>
            <label>Description</label> <br />
            <textarea
              rows="6"
              cols="70"
              value={description}
              onChange={onChangeDescription}
            />
          </div>
          <button type="submit" className='task-button'>+ add</button>
        </form>
      </div>
      <ViewTasksList refreshTasks={refreshTasks} />
    </div>
  );
};

export default TaskDashboard;