import "./support-dream.css";
import React, { useRef } from "react";
import Header from "../../componentes/header/header";
import Footer from "../../componentes/footer/footer";
import DreamerIMG from "../../assets/registro-photo.png";
import Menos from "../../assets/menos.png";
import Mais from "../../assets/mais.png";
import Modal from "react-modal";
import Tip from "../../componentes/tip/tip";
import API from "../../utils/fetch";
import { useRouteMatch, useHistory } from "react-router-dom";

import Loading from "../../componentes/loading/loading";
import Quotas from "../../componentes/quotas-support/quotas";

export default function ApoiarSonho() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [dataDreams, setDataDreams] = React.useState();

  const [loadingModalIsOpen, setLoadingModalIsOpen] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);

  const [quotas, setQuotas] = React.useState(0);
  const [finalQuotas, setFinalQuotas] = React.useState(0);

  const history = useHistory();
  const { params } = useRouteMatch();
  const inputRef = useRef("");

  React.useEffect(() => {
    const getDream = async () => {
      const response = await API.dreamById(params.id);
      const data = response.data;
      setDataDreams(data.dados.dream);
      setFinalQuotas(Number(data.dados.dream.quotas));
    };
    getDream();
  }, []);

  const showModal = () => {
    setModalIsOpen(true);
  };

  const hideModal = () => {
    setModalIsOpen(false);
  };

  const showLoading = () => {
    setLoadingModalIsOpen(true);
  };

  const hideLoading = () => {
    setLoadingModalIsOpen(false);
  };

  return dataDreams ? (
    <div className="SupportDream">
      <Header h1="" h2="" menu="true" arrow="true" />
      <div className="dreamer-img">
        <img
          src={
            dataDreams.picture && dataDreams.picture !== "null"
              ? dataDreams.picture
              : DreamerIMG
          }
          alt="imagem de perfil sonhador"
        />
      </div>

      <div className="dream-content">
        <div className="dreamer">
          <h2>{dataDreams.name}</h2>
          <div className="data">
            <span>
              Cota: R$
              {Math.round(dataDreams.cashgoal / dataDreams.quotasquantity)},00
            </span>
            <span>
              {dataDreams.risk == 0
                ? "Alto"
                : dataDreams.risk == 1
                ? "Médio"
                : "Baixo"}{" "}
              risco
            </span>
          </div>
          <hr></hr>
          <span className="note">
            As cotas que serão reservadas neste momento serão registradas como
            interesse.
          </span>
          <div className="data">
            <span>
              {dataDreams.quotasquantity - dataDreams.quotas}{" "}
              {dataDreams.quotasquantity - dataDreams.quotas <= 1
                ? " cota disponível"
                : " cotas disponíveis"}
            </span>
            <span>
              {" "}
              {60 - dataDreams.expiration_date}{" "}
              {60 - dataDreams.expiration_date <= 1
                ? "dia restante"
                : "dias restantes"}{" "}
            </span>
          </div>
          <Modal
            isOpen={modalIsOpen}
            className="ModalTip"
            overlayClassName="OverlayFirstTime"
          >
            <Tip hideModal={hideModal} />
          </Modal>
          <Quotas quotas={finalQuotas} total={dataDreams.quotasquantity} />

          <span>Adicione quantas cotas você deseja apoiar</span>
          <div className="quotas-number">
            <div
              className="more-less"
              onClick={() => {
                let newQuota = quotas - 1;
                if (
                  newQuota >= 0 &&
                  newQuota <= dataDreams.quotasquantity - dataDreams.quotas
                ) {
                  setQuotas(newQuota);

                  //   let newFinal = finalQuotas-1
                  setFinalQuotas(finalQuotas - 1);
                  inputRef.current.value = newQuota;
                }
              }}
            >
              <img src={Menos} alt="imagem para diminuir o número de cotas" />
            </div>
            <input ref={inputRef} type="text" placeholder="0"></input>
            <div
              className="more-less"
              onClick={() => {
                let newQuota = quotas + 1;
                if (
                  newQuota >= 0 &&
                  newQuota <= dataDreams.quotasquantity - dataDreams.quotas
                ) {
                  setQuotas(newQuota);
                  //   let newFinal = finalQuotas+1
                  setFinalQuotas(finalQuotas + 1);
                  inputRef.current.value = newQuota;
                  // trocar 10 por total de cotas
                  let percent = dataDreams.quotasquantity * (25 / 100);
                  if (quotas >= percent && clicked === false) {
                    showModal();
                    setClicked(true);
                  }
                }
              }}
            >
              <img src={Mais} alt="imagem para aumentar o número de cotas" />
            </div>
          </div>
          <span className="wished">Quero apoiar com {quotas} cotas</span>
          <span className="total">
            Total R$
            {Math.round(dataDreams.cashgoal / dataDreams.quotasquantity) *
              quotas}
            ,00
          </span>
          <button
            onClick={async () => {
              //   const response = await API.supportDream(params.id, quotas);
              showLoading();

              //   if (response.status === 200) {
              //     history.push(`${process.env.PUBLIC_URL}/sonho-individual/${params.id}`);
              //   }
            }}
          >
            Apoiar este sonho
          </button>
          <Modal
            isOpen={loadingModalIsOpen}
            className="ModalLoading"
            overlayClassName="OverlayFirstTime"
          >
            <Loading cotas={quotas} hideModal={hideLoading} />
          </Modal>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <div> </div>
  );
}
