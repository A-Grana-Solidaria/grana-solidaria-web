import "./dream-card.css";
import React from "react";
import Quotas from "../quotas/quotas";
import { useHistory } from "react-router-dom";
import profile from "../../assets/registro-photo.png"

export default function DreamCard(props) {
  const { dream } = props;
  const history = useHistory();

  return (
    <div className="DreamCard">
      <div className="dream-header">
        <div className="left">
          <span>{dream.quotasquantity - Number(dream.quotas)}</span> cotas
          disponíveis
        </div>
        <div className="right">
          <span>{60 - dream.expiration_date}</span>{" "}
          {60 - dream.expiration_date <= 1 ? "dia restante" : "dias restantes"}
        </div>
      </div>

      <div className="dream-body">
        <div className="dreamer-content">
          <img src={dream.picture && dream.picture !== 'null' ? dream.picture : profile} alt="foto do sonhador" />
          <div className="dreamer-data">
            <h3>{dream.name}</h3>
            <span>
              Cota: R${Math.round(dream.cashgoal / dream.quotasquantity)}, 00
            </span>
            <span>
              {dream.risk === 0 ? "Alto" : dream.risk === 1 ? "Médio" : "Baixo"}{" "}
              risco
            </span>
          </div>
        </div>
        <div className="dream-data">
          <Quotas quotas={dream.quotas} total={dream.quotasquantity} />
          Meta: <span>R${dream.cashgoal}</span> ({Math.round(dream.quotasPercentage)}%
          arrecadado)
        </div>
      </div>

      <div className="dream-footer">
        <a href={`${process.env.PUBLIC_URL}/sonho-individual/${dream.id}`}>
          Ver projeto
        </a>
      </div>
    </div>
  );
}
