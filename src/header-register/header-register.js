import "./header.css";
import React from "react";
import Arrow from "../../assets/back.png";
import Hamburguer from "../../assets/menu.png";
import Menu from "../../componentes/menu/menu";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import API from "../../utils/fetch";
import Login from "../../componentes/login/login";

export default function HeaderRegister(props) {
  const { h1 } = props;
  const { h2 } = props;
  const { menu } = props;
  const { arrow } = props;

  const history = useHistory();

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const showModal = () => {
    setModalIsOpen(true);
  };

  const hideModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="Header">
      <header>
        <div className="header-content">
          {((arrow !== "false") && (arrow !== "register")) ? (
            <img
              src={Arrow}
              className="arrow"
              alt="seta para retornar página"
              onClick={() => {
                if (!API.getToken()) {
                  history.push(`${process.env.PUBLIC_URL}/`);
                } else {
                  history.goBack();
                }
              }}
            />
          ) : (
            ""
          )}
          <div className="title">
            <h2>{h2}</h2>
            <h1>{h1}</h1>
          </div>

          {menu !== "false" ? (
            <img
              src={Hamburguer}
              onClick={showModal}
              className="menu"
              alt="icon para o menu"
            />
          ) : (
            ""
          )}
        </div>
      </header>
      <Modal
        isOpen={modalIsOpen}
        className="ModalMenu"
        overlayClassName="OverlayPrimeiraVez"
      >
        <div className="close">
          <button onClick={hideModal}>x</button>
        </div>
        <Menu />
      </Modal>
    </div>
  );
}
