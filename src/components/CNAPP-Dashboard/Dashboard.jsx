import './Dashboard.css'
import { RefreshCw, MoreVertical, Clock } from 'lucide-react'

const Dashboard = () => {
    return (
        <div className='CNAPP'>
            <div className='left-section'>
                <span>CNAPP Dashboard</span>
            </div>

            <div className='right-section'>
                <button className='action-btn btn'>
                    Add Widget <span className='plus'>+</span>
                </button>
                <button className='action-btn icon-btn'><RefreshCw /></button>
                <button className='action-btn icon-btn'><MoreVertical /></button>
                <div className='action-btn clock'>
                    <div className="clock-left">
                        <Clock size={16} />
                    </div>
                    <div className="clock-right">
                        <span>Last 2 days</span>
                        <span className="arrow">▼</span>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Dashboard;