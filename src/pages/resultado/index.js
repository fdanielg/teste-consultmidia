import { formatCurrency } from "@/helpers/fomatCurrency";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

export default function Resultado() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h1>Resultado</h1>

      <div className={styles.wrapper}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <h2>Cidade origem:</h2>
          <h3>{router.query.cidadeOrigem}</h3>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <h2>Cidade destino:</h2>
          <h3> {router.query.cidadeDestino}</h3>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <h2>Distancia em KM:</h2>
          <h3>{parseFloat(router.query.distancia)}km</h3>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <h2>Tipo do carro: </h2>
          <h3>{router.query.tipoCarro}</h3>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <h2>Valor do aluguel:</h2>
          <h3>{formatCurrency(parseFloat(router.query.valorAluguel))}</h3>
        </div>
      </div>
    </div>
  );
}
