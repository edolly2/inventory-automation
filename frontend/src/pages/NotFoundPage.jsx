// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="page centered">
      <div>
        <h1>404</h1>
        <p>Page not found.</p>
        <Link to="/dashboard" className="btn btn-primary">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
