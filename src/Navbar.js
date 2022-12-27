import { Link } from 'react-router-dom';

const Navbar = () => {

    return ( 
        <nav className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/ToDos">ToDos</Link>
                <Link to="/Posts">Posts</Link>
                <Link to="/Photos">Photos</Link>            
            </div>
        </nav>
    );
}
 
export default Navbar;