import { useNavigate } from "react-router-dom";

function Layout({ children, logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    console.log(1);
    navigate("/auth/login");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid">
          <span className="navbar-brand"></span>
          <div className="d-flex">
            <a
              className="btn btn-primary me-2"
              onClick={() => navigate("/home")}
            >
              Home
            </a>
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => navigate("/user/profile")}
            >
              Profile
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container my-4">{children}</div>
    </div>
  );
}

export default Layout;
