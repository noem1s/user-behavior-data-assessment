import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-1 text-danger">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary mt-3">Return to Home</Link>
    </div>
  );
}