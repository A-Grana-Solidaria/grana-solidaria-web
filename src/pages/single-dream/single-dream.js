import "./single-dream.css";
import React from "react";
import Header from "../../componentes/header/header";
import Footer from "../../componentes/footer/footer";
import Stars from "../../assets/stars.png";
import Wpp from "../../assets/wpp.png";
import Face from "../../assets/facebook.png";
import Twitter from "../../assets/twitter.png";
import Insta from "../../assets/insta.png";
import Link from "../../assets/link.png";
import DreamerIMG from "../../assets/registro-photo.png";
import { useHistory, useRouteMatch } from "react-router-dom";
import Modal from "react-modal";
import Affirmations from "../../componentes/affirmations/affirmations";
import Quotas from "../../componentes/quotas/quotas";
import API from "../../utils/fetch";
import jwt_decode from "jwt-decode";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export default function SingleDream() {
  const history = useHistory();
  const [modalAffirmationIsOpen, setModalAffirmationIsOpen] = React.useState(
    false
  );
  const [dadosSonhos, setDadosSonhos] = React.useState();
  const { params } = useRouteMatch();

  React.useEffect(() => {
    const getDream = async () => {
      const response = await API.dreamById(params.id);
      const data = response.data;
      setDadosSonhos(data.dados.dream);
    };
    getDream();
  }, []);

  const showAffirmation = () => {
    setModalAffirmationIsOpen(true);
  };

  const hideAffirmation = () => {
    setModalAffirmationIsOpen(false);
  };

  return dadosSonhos ? (
    <div className="SingleDream">
      <Header h1="" h2="" menu={API.getToken() ? "true" : "false"} arrow="true" />
      <div className="dreamer-img">
        <img
          src={
            dadosSonhos.picture && dadosSonhos.picture !== "null"
              ? dadosSonhos.picture
              : DreamerIMG
          }
          alt="foto de perfil"
        />
      </div>

      <div className="dream-content">
        <div className="dreamer">
          <h2>{dadosSonhos.name}</h2>
          <div className="data">
            <span>
              Cota: R${" "}
              {Math.round(dadosSonhos.cashgoal / dadosSonhos.quotasquantity)},00
            </span>
            <span>
              {dadosSonhos.risk == 0
                ? "Alto"
                : dadosSonhos.risk == 1
                ? "Médio"
                : "Baixo"}{" "}
              risco
            </span>
          </div>
          <hr></hr>
          <div className="data">
            <span>
              {dadosSonhos.quotasquantity - dadosSonhos.quotas}{" "}
              {dadosSonhos.quotasquantity - dadosSonhos.quotas <= 1
                ? " cota disponível"
                : " cotas disponíveis"}
            </span>
            <span>
              {60 - dadosSonhos.expiration_date}{" "}
              {60 - dadosSonhos.expiration_date <= 1
                ? "dia restante"
                : "dias restantes"}{" "}
            </span>
          </div>
          <span>
            Meta: {dadosSonhos.cashgoal},00 (
            {Math.round(dadosSonhos.quotasPercentage)}% arrecadado)
          </span>

          <Quotas
            quotas={dadosSonhos.quotas}
            total={dadosSonhos.quotasquantity}
          />

          {dadosSonhos.quotas === "0" ? (
            <span className="first-time">
              <img src={Stars} alt="icone estrelas" />
              Seja o primeiro a apoiar {dadosSonhos.name}!
            </span>
          ) : (
            ""
          )}

          <Modal
            isOpen={modalAffirmationIsOpen}
            className="ModalFirstTime"
            overlayClassName="OverlayFirstTime"
          >
            <Affirmations hideModal={hideAffirmation} />
          </Modal>

          <a
            onClick={() => {
				if(API.getToken()){
              const user = jwt_decode(API.getToken());
              const { projects } = jwt_decode(API.getToken());
			        if (projects === 0) {
                showAffirmation();
              } else {
                history.push(
                  `${process.env.PUBLIC_URL}/apoiar-sonho/${params.id}`
                );
              }
			}else{
				history.push(`${process.env.PUBLIC_URL}/registro-apoiador`)
			}
            }}
          >
            Apoiar este projeto
          </a>
        </div>
      </div>

      <div className="dream-data">
        <h4>Sobre o projeto de {dadosSonhos.name}</h4>
        <hr></hr>
        <div className="dream-description">
          <p>{dadosSonhos.description}</p>
          <div className="button">
            <a
             onClick={() => {
				if(API.getToken()){
              const user = jwt_decode(API.getToken());
              const { projects } = jwt_decode(API.getToken());
			        if (projects === 0) {
                showAffirmation();
              } else {
                history.push(
                  `${process.env.PUBLIC_URL}/apoiar-sonho/${params.id}`
                );
              }
			}else{
				history.push(`${process.env.PUBLIC_URL}/registro-apoiador`)
			}
            }}
            >
              Apoiar este projeto
            </a>
          </div>
        </div>
      </div>

      <div className="promo">
        Divulgar
        <hr></hr>
		<div className="social-media">
          <WhatsappShareButton
            url={window.location.href}
            title={`Apoie o sonho de ${dadosSonhos.name}`}
          >
            <img src={Wpp} alt="whatsapp" />
          </WhatsappShareButton>
          <FacebookShareButton
            url="https://www.figma.com/file/pTUejjPRQLD3s16DLzPhgn/Grana-Solidaria-%2F%2F-Telas-Finais?node-id=1%3A2"
            quote={`Apoie o projeto de ${dadosSonhos.name} || Descrição: ${dadosSonhos.description}`}
            hashtag="#GranaSolidaria"
          >
            <img src={Face} alt="facebook" />
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href} title={`Apoie o projeto de ${dadosSonhos.name}!!`} hashtags={['ApoieEsseSonho', 'GranaSolidaria']}>
            <img src={Twitter} alt="twitter" />
          </TwitterShareButton>
          <a target="_blank" rel="noreferrer" href="https://www.instagram.com/grana_solidaria/">
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
