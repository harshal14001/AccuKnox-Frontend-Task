import './Nav.css';
import { Bell, User } from "lucide-react"; // make sure lucide-react is installed

const Nav = () => {
  const handleClick = () => {
    window.location.reload(); 
  };

  return (
    <header>
      <div className="navbar">

        {/* Left: breadcrumb */}
        <div className="navbar-left">
          <span className="breadcrumb">
            Home &gt;{" "}
            <span className="active" onClick={handleClick}>
              Dashboard V2
            </span>
          </span>
        </div>

        {/* Center: search bar */}
        <div className="navbar-center">
          <input
            type="text"
            placeholder="Search Widgets..."
            className="search-bar"
          />
        </div>

        {/* Right: icons + username */}
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
