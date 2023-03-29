import "./register-success.css";
import React from "react";
import Footer from "../../componentes/footer/footer";
import Whatsapp from "../../componentes/whatsapp/whatsapp";
import Header from "../../componentes/header/header";
import Banner from "../../assets/banner-registro.png";
import Arrow from "../../assets/arrow.png";
import ArrowRight from "../../assets/arrow-right.png";
import API from "../../utils/fetch";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function RegisterSuccess() {
  const { params } = useRouteMatch();
  const [confirmed, setConfirmed] = React.useState();
  const history = useHistory();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const emailConfirmation = async () => {
      API.updateAuthorization(params.token);
	  if(API.getToken()){
      const response = await API.emailConfirmation(params.token);
      const data = response.data;
	  
      setUser(jwt_decode(API.getToken()));
      if (response.status !== 200) alert(data.dados);
      else {
        setConfirmed(true);
      }
	}
    };

    emailConfirmation();
  }, []);

  return confirmed ? (
    <div className="RegisterSuccess">
      <Header h1="Cadastro" h2="" menu="false" arrow="true" />

      <div className="register-content">
        <div className="container">
          <h2>Cadastro realizado com sucesso</h2>

          <span>Prontinho! Você já pode acessar sua página inicial</span>
          <a
            onClick={() => {
              if (user.type === 1) {
                history.push(`${process.env.PUBLIC_URL}/pagina-de-sonhos`);
              } else {
                history.push(
                  `${process.env.PUBLIC_URL}/em-analise`
                );
              }
            }}
          >
            Pagina inicial
          </a>
        </div>
      </div>
      <hr></hr>
      <Whatsapp />
      <Footer />
    </div>
  ) : (
    <div>Token Expirado</div>
  );
}
