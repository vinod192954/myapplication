import './index.css';
import { FaTrash } from 'react-icons/fa';
import { Component } from 'react';

class ViewTasksList extends Component {
  state = { 
    projectList: [], 
    loading: true,
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

  render() {
    const { projectList, loading } = this.state;

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
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Empty project</p>
          )
        )}
      </div>
    );
  }
}

export default ViewTasksList;