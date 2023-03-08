import { useRouter } from "next/router";

export default function Resultado() {
  const router = useRouter();
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
        <h1>Cidade origem:</h1>
        <h2>{router.query.cidadeOrigem}</h2>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
        <h1>Cidade destino:</h1>
        <h2> {router.query.cidadeDestino}</h2>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
        <h1>Distancia em KM:</h1>
        <h2>{parseFloat(router.query.distancia)}km</h2>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
        <h1>Tipo do carro: </h1>
        <h2>{router.query.tipoCarro}</h2>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
        <h1>Valor do aluguel:</h1>
        <h2>R${parseFloat(router.query.valorAluguel)}</h2>
      </div>
    </div>
  );
}
