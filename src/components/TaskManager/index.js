import './index.css';
import Header from '../Header';
import DashBoard from '../DashBoard';
import ProjectManager from "../ProjectManager";

const TaskManager = () => {
    return (
        <div className="taskmanager-bg-container">
            <Header />
            <div className='dashboard-projectmanager-container'>
                <DashBoard />
                <ProjectManager />
            </div>
        </div>
    );
};

export default TaskManager;
