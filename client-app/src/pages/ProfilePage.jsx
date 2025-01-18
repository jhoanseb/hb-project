import React from "react";

const ProfilePage = ({ user }) => {
  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        {user.photos && user.photos[0]?.value && (
          <img
            src={user.photos[0].value}
            className="card-img-top"
            alt={`${user.displayName} avatar`}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">
            {user.displayName || "Nombre no disponible"}
          </h5>
          <p className="card-text">
            <strong>Username:</strong> {user.username}
          </p>
          {user.profileUrl && (
            <p className="card-text">
              <strong>GitHub URL:</strong>{" "}
              <a
                href={user.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.profileUrl}
              </a>
            </p>
          )}

          {user._json && (
            <>
              <p className="card-text">
                <strong>Public Repositories:</strong> {user._json.public_repos}
              </p>
              <p className="card-text">
                <strong>Followers:</strong> {user._json.followers}
              </p>
              <p className="card-text">
                <strong>Following:</strong> {user._json.following}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
