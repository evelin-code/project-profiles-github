import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Card({ user }) {
  const { avatar_url, login, html_url } = user;

  return (
    <div className="card text-center mt-5 p-3 rounded-0 card-container">
      <img
        src={avatar_url}
        alt={login}
        className="photo card-img-top rounded-0"
      />
      <div className="card-body container-body">
        <hr className="line-hr" />
        <h4 className="card-title">{login}</h4>
        <div className="container-icons d-flex justify-content-center">
          <a href="#!" className="btn btn-outline-dark rounded-5 btn-followers">
            Seguidores
          </a>
          <a href={html_url} className="github-a">
            <FontAwesomeIcon
              icon={faGithub}
              className="icon-github"
            ></FontAwesomeIcon>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
