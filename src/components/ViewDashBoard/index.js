import { Link } from 'react-router-dom';
import './index.css';

const ViewDashBoard = () => {
    return (
        <div className="viewdashboard-bg-container">
            <ul className='view-sections'>
            <li>
                    <button className='btn'>About</button>
                </li>
                <li>
                    <Link to="/taskview" className='btn'>
                        View Tasks
                    </Link>
                </li>
                <li>
                    <button className='btn'>Todo Tasks</button>
                </li>
                <li>
                    <button className='btn'>Completed Tasks</button>
                </li>
                
            </ul>
        </div>
    );
};

export default ViewDashBoard;
