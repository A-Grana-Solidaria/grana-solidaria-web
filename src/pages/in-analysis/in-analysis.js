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
              Oba! Recebemos o seu sonho e entraremos em contato para te
              conhecermos melhor
            </span>
          </div>
        </div>
      </div>

      <Whatsapp />
      <Footer />
    </div>
  );
}
