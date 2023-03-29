import "./whatsapp.css";
import WhatsappImg from "../../assets/wpp-white.png";
import { useHistory } from "react-router-dom";
import {FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share"

export default function Whatsapp() {
  const history = useHistory();
  return (
    <div className="Wpp">
      <a
        href={"https://api.whatsapp.com/send?phone=5571987033795"}
        target="_blank"
        className="whatsapp"
      >
        <img src={WhatsappImg} />
        <div className="wpp-content">
          <span>Contato via Whatsapp</span>
          <span>(71) 98703-3795</span>
        </div>
      </a>
    </div>
  );
}
