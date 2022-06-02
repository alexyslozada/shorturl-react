import { useState, useEffect } from "react";
import Axios from "axios";

import ShortURL from "../elements/ShortURL";
import useShortURL from "../../hooks/useShorturl"

const PATH = "/v1/short-urls";

const ListShorts = () => {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${PATH}`)
      .then((response) => {
        if (response.data.data) {
          setShorts(response.data.data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) return <div>Cargando...</div>;
  // TODO en el catch agregar el mensaje de error

  const { deleteShortURL } = useShortURL()

  const wrapDelShortURL = async (id) => {
    const resp = await deleteShortURL(id)
    if (resp.status !== 204) {
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
