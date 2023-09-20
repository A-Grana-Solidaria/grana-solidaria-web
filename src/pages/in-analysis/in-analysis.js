import "./in-analysis.css";
import Footer from "../../componentes/footer/footer";
import Whatsapp from "../../componentes/whatsapp/whatsapp";
import Clock from "../../assets/clock.png";
import Header from "../../componentes/header/header";

export default function InAnalysis() {
  return (
    <div className="InAnalysis">
      <Header h1="" h2="" />

      <div className="analysis-content">
        <div className="container">
          <h2>Em Análise</h2>

          <div>
            <img src={Clock} alt="imagem de um relógio" />
            <span>
              Oba! Seu cadastro foi realizado com sucesso, seu projeto está em análise <br></br> assim que for liberado enviaremos um e-mail te avisando!
            </span>
          </div>
        </div>
      </div>

      <Whatsapp />
      <Footer />
    </div>
  );
}
