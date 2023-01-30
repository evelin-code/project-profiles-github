import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSistrix } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import axios from "./../axios";

function Home() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  var key = 0;

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/search/users?q=" + query);
      return data?.items;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    if (query) {
      const items = await fetchUsers();
      setUsers(items);
    } else {
      console.log("Query Vacio *");
    }
  };

  return (
    <div className="app">
      <div className="container-title d-flex justify-content-center">
        <div className="titles">
          <h1 className="title">PERFILES DE USUARIO</h1>
          <small className="subtitle">API Rest pública de GitHub</small>
          <div className="mt-5">
            <form
              id="form"
              autoComplete="off"
              className="d-flex justify-content-center"
            >
              <input
                type="text"
                value={query}
                onChange={handleQueryInput}
                id="username"
                className="input-search"
                placeholder="Buscar usuario..."
                aria-describedby="button-addon2"
              ></input>
              <button
                className="icon-sistrix"
                type="button"
                id="button-addon2"
                onClick={handleSearchUsers}
              >
                <FontAwesomeIcon
                  icon={faSistrix}
                  className="icon-sistrix"
                ></FontAwesomeIcon>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div></div>
      <div className="d-flex justify-content-center">
        <div className="container-cards">
          <div className="row gx-5">
            {users ? (
              users.map((user) => {
                return (
                  <div className="col-md-4" key={user.id}>
                    <Card user={user} key={user.id}></Card>
                  </div>
                );
              })
            ) : (
              <h2>No hay resultados...</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
