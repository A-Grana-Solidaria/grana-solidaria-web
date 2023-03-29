import "./single-dream-dreamer.css";
import React from "react";
import Header from "../../componentes/header/header";
import Footer from "../../componentes/footer/footer";
import SonhadorImg from "../../assets/registro-photo.png";
import Wpp from "../../assets/wpp.png";
import Face from "../../assets/facebook.png";
import Twitter from "../../assets/twitter.png";
import Insta from "../../assets/insta.png";
import Link from "../../assets/link.png";
import { useRouteMatch } from "react-router-dom";
import Quotas from "../../componentes/quotas/quotas";
import API from "../../utils/fetch";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export default function SingleDreamDreamer() {
  const { params } = useRouteMatch();
  const [dream, setDream] = React.useState({});

  React.useEffect(() => {
    const getDream = async () => {
      const response = await API.dreamById(params.id);
      const data = response.data;
      setDream(data.dados.dream);
    };
    getDream();
  }, []);
  return dream ? (
    <div className="SingleDream">
      <Header
        h1=""
        h2=""
        menu={API.getToken() ? "true" : "false"}
        arrow="true"
      />
      <div className="dreamer-img">
        <img
          src={
            dream.picture && dream.picture !== "null"
              ? dream.picture
              : SonhadorImg
          }
          alt="icon do perfil do sonhador"
        />
      </div>

      <div className="dream-content">
        <div className="dreamer">
          <h2>{dream.name}</h2>
          <div className="data">
            <span>
              Cota: R${Math.round(dream.cashgoal / dream.quotasquantity)},00
            </span>
            <span>
              {dream.risk === 0 ? "Alto" : dream.risk === 1 ? "Médio" : "Baixo"}{" "}
              risco
            </span>
          </div>
          <hr></hr>
          <div className="data">
            <span>
              {dream.quotasquantity - dream.quotas}{" "}
              {dream.quotasquantity - dream.quotas <= 1
                ? " cota disponível"
                : " cotas disponíveis"}
            </span>
            <span>
              {" "}
              {60 - dream.expiration_date}{" "}
              {60 - dream.expiration_date <= 1
                ? "dia restante"
                : "dias restantes"}{" "}
            </span>
          </div>
          <Quotas quotas={dream.quotas} total={dream.quotasquantity} />
          <span>
            Meta R${dream.cashgoal} ({Math.round(dream.quotasPercentage)}% arrecadado)
          </span>
        </div>
      </div>
      <div className="dream-data">
        <h4>Sobre o sonho de {dream.name}</h4>
        <hr></hr>
        <div className="dream-description">
          <p>{dream.description}</p>
        </div>
      </div>

      <div className="promo">
        Divulgar
        <hr></hr>
        <div className="social-media">
          <WhatsappShareButton
            url={`${process.env.PUBLIC_URL}/sonho-individual/${dream.id}`}
            title={`Apoie o sonho de ${dream.name}`}
          >
            <img src={Wpp} alt="whatsapp" />
          </WhatsappShareButton>
          <FacebookShareButton
            url={`${process.env.PUBLIC_URL}/sonho-individual/${dream.id}`}
            quote={`Apoie o sonho de ${dream.name} || Descrição: ${dream.description}`}
            hashtag="#GranaSolidaria"
          >
            <img src={Face} alt="facebook" />
          </FacebookShareButton>
          <TwitterShareButton
            url={`${process.env.PUBLIC_URL}/sonho-individual/${dream.id}`}
            title={`Apoie o sonho de ${dream.name}!!`}
            hashtags={["ApoieEsseSonho", "GranaSolidaria"]}
          >
            <img src={Twitter} alt="twitter" />
          </TwitterShareButton>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/grana_solidaria/"
          >
            <img src={Insta} alt="instagram" />
          </a>
          {/* <img src={Link} alt="link" /> */}
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div></div>
  );
}
