import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SingleUserPage() {
  const params = useParams();
  const [resource, setResource] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const url = `https://reqres.in/api/users/${params.id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setResource(data.data);
        setIsLoading(false);
      });
  }, [params.id]);

  function renderResource() {
    if (isLoading || !resource) {
      return "Loading Resource...";
    } else {
      return (
        <div className="Page Page--Resource Page--ShowUserResource">
          <img src={resource?.avatar} />
          <div className="UserAttributes">
            <h2>
              {resource?.first_name} {resource?.last_name}
            </h2>

            <p>First Name: {resource?.first_name}</p>
            <p>Last Name: {resource?.last_name}</p>
            <p>E-Mail: {resource?.email}</p>
            <p>ID: {params.id}</p>
          </div>
        </div>
      );
    }
  }
  return renderResource();
}
