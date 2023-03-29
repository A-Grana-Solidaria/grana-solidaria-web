import "./confirm-email.css";
import Footer from "../../componentes/footer/footer";
import Whatsapp from "../../componentes/whatsapp/whatsapp";
import Header from "../../componentes/header/header";

export default function ConfirmEmail() {
  return (
    <div className="ConfirmEmail">
      <Header h1="Cadastro" h2="" menu="false" arrow="true" />

      <div className="confirm-content">
        <div className="container">
          <h2>Só mais um passo!</h2>

          <span>Por favor, confira seu e-mail para finalizar o cadastro.</span>
        </div>
      </div>
      <hr></hr>
      <Whatsapp />
      <Footer />
    </div>
  );
}
