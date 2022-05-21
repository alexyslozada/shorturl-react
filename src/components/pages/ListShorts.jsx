import { useState, useEffect } from "react";
import Axios from "axios";

import ShortURL from "../elements/ShortURL";
import useShortURL from "../../hooks/useShorturl"
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

  const { deleteShortURL } = useShortURL()

  const wrapDelShortURL = async (id) => {
    const resp = await deleteShortURL(id)
    if (resp.status !== 200) {
      console.log("Ups! no pudimos borrar", resp.status, resp.data)
      return
    }

    const cleanShorts = shorts.filter(s => s.id !== id)
    setShorts(cleanShorts)
  }

  return (
    <>
      {shorts.map((data) => (
        <ShortURL key={data.id} short={data} delShortURL={() => wrapDelShortURL(data.id)} />
      ))}
    </>
  );
};

export default ListShorts;
