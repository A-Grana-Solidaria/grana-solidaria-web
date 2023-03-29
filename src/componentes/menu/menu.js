import "./menu.css";
import React from "react";
import SonhadorImg from "../../assets/registro-photo.png";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Menu() {
  const novoToken = localStorage.getItem("token");
  const tokenDecoded = jwt_decode(novoToken);
  const history = useHistory();

  return (
    <div className="Menu">
      <div className="menu-container">
        <div className="top">
          <img
            src={tokenDecoded.picture && tokenDecoded.picture !== 'null' ? tokenDecoded.picture : SonhadorImg}
            alt="imagem do perfil do sonhador"
          />

          <span>Olá,</span>

          <span>{tokenDecoded.name}</span>
        </div>

        <a
          onClick={() => {
            history.push(`${process.env.PUBLIC_URL}/como-funciona`);
          }}
        >
          Como funciona?
        </a>
		<a onClick={() =>{
			history.push(`${process.env.PUBLIC_URL}/politica-de-privacidade`)
		}}
		>
			Políticas de Uso
		</a>
		<a onClick={() =>{
			history.push(`${process.env.PUBLIC_URL}/termos-de-uso`)
		}}
		>
			Termo e Concentimento de uso
		</a>
        <Link to={`${process.env.PUBLIC_URL}/`}>
          <span
            className="logout"
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            Sair
          </span>
        </Link>
      </div>
    </div>
  );
}
