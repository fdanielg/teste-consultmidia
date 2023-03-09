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
          <h3>Cidade origem:</h3>
          <h4>{router.query.cidadeOrigem}</h4>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <h3>Cidade destino:</h3>
          <h4> {router.query.cidadeDestino}</h4>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <h3>Distancia em KM:</h3>
          <h4>{parseFloat(router.query.distancia)}km</h4>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <h3>Tipo do carro: </h3>
          <h4>{router.query.tipoCarro}</h4>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <h3>Valor do aluguel:</h3>
          <h4>{formatCurrency(parseFloat(router.query.valorAluguel))}</h4>
        </div>
      </div>
    </div>
  );
}
