import "./tip.css";
import React from "react";

export default function Tip(props) {
  const { hideModal } = props;
  return (
    <div className="Tip">
      <div className="close">
        <button onClick={hideModal}>x</button>
      </div>
      <h2>Dica da grana solidária</h2>
      <span>
        Nós recomendamos diluir os seus apoios em empreendimentos diferentes, assim,
        todos saem com mais chances de bons resultados ;)
      </span>
    </div>
  );
}
