import { Link, useRouteError } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import './notfound.scss'

interface ExtendedError extends Error {
  status?: number;
  statusText?: string;
  message: string;
}

const NotFound = () => {
  const error = useRouteError() as ExtendedError;  
  return (
    <div className="error-container">
    <div className="content">
      <p className="error-code">404</p>
      <h1 className="title">
        Page not found
      </h1>
      <p className="description">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <p className="error-message">
        {error?.statusText || error.message}
      </p>
      <div className="actions">
        <Link to="/" className="btn btn-back">
          <ArrowLeft size={16} className="icon" /> Go back
        </Link>
        <Link to="/" className="btn btn-contact">
          Contact us
        </Link>
      </div>
    </div>
  </div>
  )
}

export default NotFound