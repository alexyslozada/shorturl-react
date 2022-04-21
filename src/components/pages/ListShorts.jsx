import { useState, useEffect } from "react";
import Axios from "axios";

import ShortURL from "../elements/ShortURL";
import { API_URL } from "../../config/configuration";

const PATH = "/v1/short-urls";

const ListShorts = () => {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${API_URL}${PATH}`)
      .then((response) => {
        setShorts(response.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <>
      {shorts.map((data) => (
        <ShortURL key={data.id} short={data} />
      ))}
    </>
  );
};

export default ListShorts;
