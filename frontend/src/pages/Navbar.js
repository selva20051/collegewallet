
import { Link } from "react-router-dom"
import "../css/navbar.css";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="Report.png" alt="Report" />
            </div>
            <div className="menu">
                <ul>
                    <Link to="/" ><li>Home</li></Link>
                    <li> <Link to="/login" >
                        <button>
                            Login
                        </button>
                    </Link>

                    </li>
                </ul>
            </div>

        </header>
    );
};

export default Header;