import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import axios from "./../axios";
import Repository from "./Repository";
import "./../resources/css/user.css";

function User() {
  const { login } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await Promise.all([
          axios.get(`/users/${login}`),
          axios.get(`/users/${login}/repos`),
        ]);
        setUserInfo(response[0].data);
        setRepos(response[1].data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInformation();
  }, []);

  return (
    <div>
      <div className="container-back">
        <Link to="/" className="icon-arrow-a">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="icon-arrow"
          ></FontAwesomeIcon>
        </Link>
      </div>
      <div className="container">
        <div className="card text-center p-3 rounded-0 card-container-profile">
          <div className="image">
            <img src={userInfo?.avatar_url} />
          </div>
          <div className="user-content">
            <h3 className="pt-4">{userInfo?.name}</h3>
            <p>{userInfo?.bio}</p>
            <div className="more-data">
              <p>
                {" "}
                {userInfo?.followers} Seguidores - Siguiendo{" "}
                {userInfo?.following}
              </p>
              <p>{userInfo?.location}</p>
              <p>{userInfo?.blog}</p>
              <p>
                <a href={userInfo?.html_url} className="github-a">
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="icon-github"
                  ></FontAwesomeIcon>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div>
          {repos ? (
            repos.map((repo) => {
              return <Repository repo={repo} key={repo.id} />;
            })
          ) : (
            <h2>No hay repositorios...</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
