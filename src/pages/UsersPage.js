import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const url = `https://reqres.in/api/users?page=${page}`;

    fetch(url)
      .then((res) => res.json())
      .then((dataFromApi) => {
        setUsers((prevUsers) => {
          return [...prevUsers, ...dataFromApi.data];
        });
        setTotalPages(dataFromApi.total_pages);
      });
  }, [page]);

  function renderUsers() {
    return users.map((user) => {
      const { first_name, last_name, id } = user;

      return (
        <li key={id}>
          <Link to={`/users/${id}`}>
            {first_name} {last_name}{" "}
          </Link>
        </li>
      );
    });
  }

  function handleLoadMore() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  return (
    <div>
      <h2> Here we fetch users </h2>
      <ul>{renderUsers()}</ul>
      {page < totalPages && (
        <button onClick={handleLoadMore}>Load more </button>
      )}
    </div>
  );
}
