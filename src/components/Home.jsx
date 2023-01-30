import Card from "./Card";
import "./../resources/css/app.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSistrix } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import axios from "./../axios";

function Home() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  var key = 0;

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handlePrevPage = () => {
    setPage((page) => {
      if (page === 1) return page;
      else return page - 1;
    });
  };

  const handlePageLimit = (e) => {
    const value = e.target.value;
    setLimit(parseInt(value)); 
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/search/users?q=" + query, {
        params: {
          page,
          per_page: limit,
        }
      });
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

  useEffect(() => {
    const displayUsersOnChange = async () => {
      if (query) {
        const items = await fetchUsers();
        setUsers(items);
      }
    };
    displayUsersOnChange();
  }, [page, limit]);

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
                type="submit"
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
          <div className="container-pagination pt-5">
            <label>
              <small>Paginado por: </small>
              <select onChange={handlePageLimit}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </label>
            <div className="pagination">
              <button onClick={handlePrevPage}>{page}</button>
              <button onClick={handleNextPage}>{page + 1}</button>
            </div>
          </div>
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
