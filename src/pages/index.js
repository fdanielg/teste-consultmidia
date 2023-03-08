import { useEffect, useState } from "react";

import ReactGoogleAutocomplete from "react-google-autocomplete";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const [cidadeOrigem, setCidadeOrigem] = useState("");
  const [cidadeDestino, setCidadeDestino] = useState("");
  const [tipoCarro, setTipoCarro] = useState("Básico");
  const [valorAluguel, setValorAluguel] = useState(0);
  const [erro, setErro] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro(false);

    try {
      const response = await axios.get(
        `/api/maps/api/distancematrix/json?origins=${cidadeOrigem}&destinations=${cidadeDestino}&units=imperial&key=AIzaSyAQlXH_lfQPVBxaO5SEifHsSVQou9d_etY`
      );

      console.log({ response });

      const distanceInMeters = response.data.rows[0].elements[0].distance.value;
      const distanceInKm = distanceInMeters / 1000;

      let valorAluguel = 0;
      switch (tipoCarro) {
        case "Básico":
          valorAluguel = 1.5 * distanceInKm;
          break;
        case "Intermediário":
          valorAluguel = 2.5 * distanceInKm;
          break;
        case "Luxo":
          valorAluguel = 3 * distanceInKm;
          break;
        default:
          break;
      }

      setValorAluguel(valorAluguel);

      router.push({
        pathname: "/resultado",
        query: {
          cidadeOrigem,
          cidadeDestino,
          tipoCarro,
          distancia: distanceInKm,
          valorAluguel,
        },
      });
    } catch (error) {
      console.log(error);
      setErro(true);
    }
  };

  console.log({ cidadeOrigem });
  console.log({ valorAluguel });

  return (
    <div>
      <h1>Calculadora de aluguel de carros</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cidade de origem:</label>
          <ReactGoogleAutocomplete
            apiKey="AIzaSyAQlXH_lfQPVBxaO5SEifHsSVQou9d_etY"
            onPlaceSelected={(place) =>
              setCidadeOrigem(place.formatted_address)
            }
          />
        </div>
        <div>
          <label>Cidade de destino:</label>
          <ReactGoogleAutocomplete
            apiKey="AIzaSyAQlXH_lfQPVBxaO5SEifHsSVQou9d_etY"
            onPlaceSelected={(place) =>
              setCidadeDestino(place.formatted_address)
            }
          />
        </div>
        <div>
          <label>Tipo de carro:</label>
          <select
            value={tipoCarro}
            onChange={(event) => setTipoCarro(event.target.value)}
          >
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Luxo">Luxo</option>
          </select>
        </div>
        <button type="submit">Calcular</button>
      </form>
      {erro && <p>Não foi possível obter a distância entre as cidades.</p>}
    </div>
  );
}
