import React from "react";
import { useRef } from "react";
import "./home.css";
import Login from "../../componentes/login/login";
import LogoHeader from "../../assets/grana-logo-1.png";
import DropDown from "../../assets/drop-down.png";
import Whatsapp from "../../componentes/whatsapp/whatsapp";
import WhatsappImg from "../../assets/wpp-white.png";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import BannerPhoto from "../../assets/home-banner-photo2.png";
import Footer from "../../componentes/footer/footer";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const history = useHistory();

  const showModal = () => {
    setModalIsOpen(true);
  };

  const hideModal = () => {
    setModalIsOpen(false);
  };

  const scrollRef = useRef(null);

  const scroll = () => {
    scrollRef.current.scrollIntoView();
  };

  return (
    <div className="Home">
      <header>
        <img src={BannerPhoto} alt="banner" />
        <div className="header-container">
          <div className="header-top">
            <nav>
              <img src={LogoHeader} alt="logo" />
              <span onClick={showModal}>Login</span>
              <Modal
                isOpen={modalIsOpen}
                className="Modal"
                overlayClassName="Overlay"
              >
                <div className="close">
                  <button onClick={hideModal}>x</button>
                </div>
                <Login />
              </Modal>
            </nav>
            <h1>Investimento com impacto social</h1>
          </div>

          <div className="header-bot">
            <hr></hr>
            <a onClick={() => {
              history.push(`${process.env.PUBLIC_URL}/registro-sonhador`);
            }}>Preciso de investimento</a>
            {/* <a onClick={() => {
              history.push(`${process.env.PUBLIC_URL}/registro-apoiador`);
            }}>Quero investir com propósito</a> */}

          </div>
        </div>
      </header>

      <div className="home-content">
        <div className="home-container">
          <div className="about-container" ref={scrollRef}>
            <h3>Nós somos a</h3>
            <h2>Grana Solidária</h2>
            <p>
            Conectamos pessoas que querem investir com propósito a empreendedores qualificados. Esta qualificação
            será realizada por meio da nossa plataforma <strong>"trilha do sucesso"</strong> e por nossos parceiros
            especialistas em educação empreendedora.  Queremos criar um ecossistema capaz de prover, de forma simultânea
            e integrada, crédito e educação empreendedora.
            </p>
          </div>

          <div className="image-container">
            <div className="dreamer-container">
              <div className="overlay"></div>
              <div className="text-container">
                <div className="text-tile">
                  <h3>Quem é o empreendedor</h3>
                  <h2>da Grana Solidária</h2>
                </div>

                <div className="description">
                  <p>
                    Uma pessoa que busca uma solução que alie crédito e educação empreendedora
                    em negócios conectados a valores sociais e ambientais.
                    {/* Necessáario correção e adição. */}
                  </p>
                  <button onClick={() =>{
					  history.push(`${process.env.PUBLIC_URL}/registro-sonhador`)
				  }}>Preciso de investimento</button>
                </div>
              </div>
            </div>

            <div className="supporter-container">
              <div className="overlay-supporter"></div>

              <div className="text-container">
                <div className="text-tile">
                  <h3>Quem investe nos empreendedores</h3>
                  <h2>da Grana Solidária</h2>
                </div>

                <div className="description">
                  <p>
                  O <strong>Investidor</strong> é a força que move as engrenagens da Grana Solidária. Ele deseja colocar o seu
                  dinheiro em algo que vá além de uma simples aplicação financeira. Ele quer ver o investimento
                  render com propósito e impactar positivamente na vida das pessoas, melhorando também o nosso
                  planeta através da geração de trabalho e renda e de ações que preservem o meio-ambiente.
                  </p>

                  {/* <button onClick={() =>{
					  history.push(`${process.env.PUBLIC_URL}/registro-apoiador`)
				  }}>Quero investir com propósito</button> */}
                </div>
              </div>
            </div>
          </div>

          <div className="how-it-works-container">
            <h2>Como funcionamos</h2>
            <ol>
              <li>
                O <strong>empreendedor</strong> entra na plataforma e preenche dados cadastrais básicos,
                sem custo. Ao ser aprovado na análise de situação cadastral, ele passa
                instantaneamente para a segunda etapa, onde fará o cadastro completo para
                o score financeiro e o socioambiental, este último exclusivo da Grana
                Solidária.
              </li>
              <li>
                O projeto, então, entra no ranking para investimento e fica disponível para
                captar <strong>Investidores</strong> por até 60 dias.
              </li>
              <li>
                O <strong>Investidor Pessoa Física ou Jurídica</strong> pode sinalizar o desejo de investir
                o valor que quiser em quantos projetos desejar. É possível, inclusive,
                financiar projetos de forma integral, porém nossa plataforma sempre
                incentiva a pulverização do investimento.
              </li>
              <li>
                Sendo o investidor um Fundo ou uma empresa que direcione um montante
                para investimento, a plataforma distribui o investimento pelo ranking.
              </li>
              <li>
                Quando a nossa plataforma faz o chamado “matching” - o encontro de
                <strong>Empreendedor e Investidor(es)</strong> inicia-se o processo de materialização do
                projeto através dos nossos parceiros financeiros. <strong>Empreendedor e
                Investidor</strong> abrem conta digital e é emitida, então, a CCB (Cédula de Crédito
                Bancário). Também é feito, para todos os <strong>Empreendedores</strong> habilitados a
                receber recursos, um seguro prestamista que garante o retorno do restante
                do valor principal emprestado, a qualquer tempo do contrato de
                financiamento, no caso de invalidez ou morte do Empreendedor.
              </li>
              <li>
                <strong>Empreendedores</strong> 100% adimplentes, ao final de cada ciclo de
                financiamento dentro da plataforma, são melhor colocados dentro do ranking
                da Grana Solidária ao pedir novos investimentos.
              </li>
              <li>
                Empreendedores que se tornarem também Investidores, ao final de cada
                ciclo de financiamento, também recebem melhor posicionamento no ranking
                de investimento da Grana Solidária.
              </li>
            </ol>

            <div className="center">
              <span>Indique a Grana Solidaria.</span>
            </div>
          </div>
        </div>
      </div>
      <Whatsapp />
      <Footer />
    </div>
  );
}
