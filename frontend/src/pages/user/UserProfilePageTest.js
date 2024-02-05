import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const UserProfilePageTest = () => {
  const { user } = useAuth0();
  console.log(user);
  if (!user) {
    return null;
  }

  return (
    <div className="content-layout">
      <h1 id="page-title" className="content__title">
        Profile Page
      </h1>
      <div className="content__body">
        <p id="page-description">
          <span>
            You can use the <strong>ID Token</strong> to get the profile
            information of an authenticated user.
          </span>
          <span>
            <strong>Only authenticated users can access this page.</strong>
          </span>
        </p>
        <div className="profile-grid">
          <div className="profile__header">
            <img
              src={user.picture}
              alt="Profile"
              className="profile__avatar"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="profile__headline">
              <h2 className="profile__title">{user.name}</h2>
              <span className="profile__description">{user.email}</span>
            </div>
          </div>
          <div className="profile__details">
            <span>"Decoded ID Token</span>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePageTest;
