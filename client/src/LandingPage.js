import React from 'react'
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div style={{ paddingLeft: '20px', paddingTop: '60px'}}>
      <h2>Welcome to Posts-Comments</h2>
      <p>Please select an option below:</p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <div>
        <Link to="/signup">
          <button>Create Account</button>
        </Link>
      </div>
    </div>
    )
}

export default LandingPage