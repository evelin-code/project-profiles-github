import React from "react";
import "./../resources/css/repository.css";

function Repository({ repo }) {
  const { name, html_url, description, language } = repo;

  return (
    <div className="card mt-5 rounded-0 container-repos mb-5 ">
      <div className="container p-3">
        <h3>
          <a href={html_url} className="name-repo">{name}</a>
        </h3>
      
      <p>{description}</p>
      {language && <small>Desarrollado en {language}</small>}
      </div>
    </div>
  );
}

export default Repository;
