import React from 'react'
import SignUp from '../signup_component/signup_component';
import AdminBuild from './AdminBuild';

function superadmin() {
    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
      };
  return (
    <>
    <h1>superadmin</h1>
    <div>
        <SignUp/>
    </div>
    <div>
      <AdminBuild/>
    </div>
    <div>
         <button onClick={logOut} className="btn btn-primary" style={{ marginTop: 10 }}>
          Log Out
        </button>
    </div>
    </>
    
  )
}

export default superadmin