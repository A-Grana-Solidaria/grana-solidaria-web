import "./footer.css";
import Logo from "../../assets/grana-logo-2.png";

export default function Footer() {
  return (
    <div className="Footer">
      <footer>
        <div className="footer-container">
          <div className="logo">
            <img src={Logo} />
          </div>
          <span>Todos os direitos reservados | 2021</span>
        </div>
      </footer>
    </div>
  );
}
