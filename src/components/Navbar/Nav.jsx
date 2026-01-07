import './Nav.css';
import { Bell, User } from "lucide-react"; 

// Receive props here
const Nav = ({ setSearchQuery }) => {
  const handleClick = () => {
    window.location.reload(); 
  };

  return (
    <header>
      <div className="navbar">
        <div className="navbar-left">
          <span className="breadcrumb">
            Home &gt;{" "}
            <span className="active" onClick={handleClick}>
              Dashboard V2
            </span>
          </span>
        </div>

        <div className="navbar-center">
          <input
            type="text"
            placeholder="Search Widgets..."
            className="search-bar"
            // Update state on change
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="navbar-right">
          <Bell className="icon" size={20} />
          <User className="icon" size={20} />
          <span className="username">Harshal Argade</span>
        </div>
      </div>
    </header>
  );
};

export default Nav;