import * as Yup from "yup";

import LoadingSpinner from "@/helpers/LoadingSpinner/LoadingSpinner";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import axios from "axios";
import styles from "./styles.module.scss";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //Tipo de carros disponíveis
  const tipoCarroOptions = [
    { value: "Básico" },
    { value: "Intermediário" },
    { value: "Luxo" },
  ];

  //Validação dos campos e envio dos dados para a API
  const formik = useFormik({
    initialValues: {
      cidadeOrigem: "",
      cidadeDestino: "",
      tipoCarro: "Básico",
    },
    validationSchema: Yup.object({
      cidadeOrigem: Yup.string().required("Campo obrigatório"),
      cidadeDestino: Yup.string().required("Campo obrigatório"),
    }),
    // envio dos dados para a API
    onSubmit: async (values) => {
      setError(false);
      setLoading(true);

      try {
        const response = await axios.get(
          `/api/maps/api/distancematrix/json?origins=${values.cidadeOrigem}&destinations=${values.cidadeDestino}&units=imperial&key=AIzaSyAQlXH_lfQPVBxaO5SEifHsSVQou9d_etY`
        );

        const distanceInMeters =
          response.data.rows[0].elements[0].distance.value;
        const distanceInKm = distanceInMeters / 1000;

        let valorAluguel = 0;
        switch (values.tipoCarro) {
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

        setLoading(false);

        // envio dos dados para a página de resultado
        router.push({
          pathname: "/resultado",
          query: {
            cidadeOrigem: values.cidadeOrigem,
            cidadeDestino: values.cidadeDestino,
            tipoCarro: values.tipoCarro,
            distancia: distanceInKm,
            valorAluguel,
          },
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    },
  });

  return (
    <div className={styles.container}>
      <h1>Calculadora de aluguel de carros</h1>
      <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>
        <div className={styles.wrapperInput}>
          <label htmlFor="cidadeOrigem">Cidade de origem:</label>

          <div style={{ width: "100%" }}>
            <ReactGoogleAutocomplete
              placeholder="Insira a cidade de origem"
              inputAutocompleteValue={formik.values.cidadeOrigem}
              onChange={formik.handleChange}
              name="cidadeOrigem"
              id="cidadeOrigem"
              apiKey="AIzaSyAQlXH_lfQPVBxaO5SEifHsSVQou9d_etY"
              onPlaceSelected={(place) =>
                formik.setFieldValue("cidadeOrigem", place.formatted_address)
              }
            />
            {formik.touched.cidadeOrigem && formik.errors.cidadeOrigem ? (
              <p className={styles.error}>{formik.errors.cidadeOrigem}</p>
            ) : null}
          </div>
        </div>

        <div className={styles.wrapperInput}>
          <label htmlFor="cidadeDestino">Cidade de destino:</label>
          <div>
            <ReactGoogleAutocomplete
              placeholder="Insira a cidade de destino"
              inputAutocompleteValue={formik.values.cidadeDestino}
              onChange={formik.handleChange}
              name="cidadeDestino"
              id="cidadeDestino"
              apiKey="AIzaSyAQlXH_lfQPVBxaO5SEifHsSVQou9d_etY"
              onPlaceSelected={(place) =>
                formik.setFieldValue("cidadeDestino", place?.formatted_address)
              }
            />

            {formik.touched.cidadeDestino && formik.errors.cidadeDestino ? (
              <p className={styles.error}>{formik.errors.cidadeDestino}</p>
            ) : null}
          </div>
        </div>

        <div className={styles.wrapperInput}>
          <label>Tipo de carro:</label>
          <select {...formik.getFieldProps("tipoCarro")}>
            {tipoCarroOptions.map((option, index) => (
              <option key={`${index} ${option.value}`} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Calcular</button>
      </form>
      {loading ? <LoadingSpinner /> : null}
      {error && <p>Não foi possível obter a distância entre as cidades.</p>}
    </div>
  );
}
