import './index.css';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Import the edit icon
import { Component } from 'react';

class ViewTasksList extends Component {
  state = {
    projectList: [],
    loading: true,
    editingProject: null, // Track which project is being edited
    editedProjectName: '',
    editedProjectDescription: '',
  };

  componentDidMount() {
    this.tasksList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.refreshTasks !== this.props.refreshTasks) {
      this.tasksList(); // Fetch tasks again when refreshTasks prop changes
    }
  }

  onClickDeleteTask = async (id) => {
    const apiUrl = `https://taskmanagerbackend-ei4s.onrender.com/projects/${id}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log(`Task with id ${id} deleted successfully`);
        this.setState(prevState => ({
          projectList: prevState.projectList.filter(eachproject => eachproject.projectId !== id)
        }));
      } else {
        console.error('Error deleting task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  tasksList = async () => {
    this.setState({ loading: true });
    const api = `https://taskmanagerbackend-ei4s.onrender.com/projects`;
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      const projectData = data.projects.map(eachproject => ({
        projectId: eachproject.projectId,
        projectName: eachproject.projectName,
        projectDescription: eachproject.projectDescription,
        userId: eachproject.userId,
      }));
      this.setState({ projectList: projectData });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ loading: false });
    }
  }

  onClickEditTask = (project) => {
    // Set the project to be edited and prefill the form with current values
    this.setState({
      editingProject: project.projectId,
      editedProjectName: project.projectName,
      editedProjectDescription: project.projectDescription,
    });
  }

  onChangeEditProjectName = (event) => {
    this.setState({ editedProjectName: event.target.value });
  }

  onChangeEditDescription = (event) => {
    this.setState({ editedProjectDescription: event.target.value });
  }

  onClickUpdateTask = async () => {
    const { editingProject, editedProjectName, editedProjectDescription } = this.state;
    const apiUrl = `https://taskmanagerbackend-ei4s.onrender.com/projects/${editingProject}`;
    const updatedProjectDetails = {
      projectName: editedProjectName,
      projectDescription: editedProjectDescription,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProjectDetails),
      });

      if (response.ok) {
        console.log(`Task with id ${editingProject} updated successfully`);
        this.setState({ editingProject: null });
        this.tasksList(); // Refresh the project list after update
      } else {
        console.error('Error updating task:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  render() {
    const { projectList, loading, editingProject, editedProjectName, editedProjectDescription } = this.state;

    return (
      <div>
        <h1 className="taskheading">Tasks</h1>
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          projectList.length > 0 ? (
            <ul className='project-bg-container'>
              {projectList.map(eachproject => (
                <li key={eachproject.projectId} className='project-view-list'>
                  <div>
                    <h1>{eachproject.projectName}</h1>
                    <p>{eachproject.projectDescription}</p>
                  </div>
                  <div>
                    <button className='trash' onClick={() => this.onClickDeleteTask(eachproject.projectId)}>
                      <FaTrash />
                    </button>
                    <button className='edit' onClick={() => this.onClickEditTask(eachproject)}>
                      <FaEdit />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Empty project</p>
          )
        )}

        {/* Popup for editing project */}
        {editingProject && (
          <div className="popup">
            <div className="popup-inner">
              <h2>Edit Project</h2>
              <label>Project Name:</label>
              <input
                type="text"
                value={editedProjectName}
                onChange={this.onChangeEditProjectName}
              />
              <label>Description:</label>
              <textarea
                value={editedProjectDescription}
                onChange={this.onChangeEditDescription}
              />
              <button onClick={this.onClickUpdateTask}>Update</button>
              <button onClick={() => this.setState({ editingProject: null })}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ViewTasksList;
