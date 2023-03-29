import React from "react";
import "./loading.css";
import API from "../../utils/fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouteMatch, useHistory } from "react-router-dom";

export default function Loading(props) {
  const { cotas, email, hideModal } = props;
  const { params } = useRouteMatch();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);

  const sendCall = async () => {
    setLoading(true);

    if (cotas) {
      const response = await API.supportDream(params.id, cotas);
      if (response.status === 200) {
        setLoading(false);
      }
    } else {
		const response = await API.recoverPassword(email)
		if (response.status === 200) {
			setLoading(false);
		  }
    }
  };

  React.useEffect(() => {
    sendCall();
  }, []);

  return (
    <div className="Loading">
      <div className="close">
        <button onClick={() =>{
			if(cotas){
				hideModal()
			history.push(`${process.env.PUBLIC_URL}/sonho-individual/${params.id}`)}
			else{
				history.push(`${process.env.PUBLIC_URL}/`)
			}}}>X</button>
      </div>
      {loading === true ? (
        <div>
          <FontAwesomeIcon icon={faSpinner} size="4x" pulse />
          <h2>Um momento</h2>
          {cotas ? (
            <span>O seu apoio está sendo registrado</span>
          ) : (
            <span></span>
          )}
        </div>
      ) : (
        <div>
          <FontAwesomeIcon icon={faCheck} size="4x" />
          <h2>Sucesso</h2>

          {cotas ? (
            <>
              <span>O seu apoio foi registrado.</span>
              <span>Nossa equipe entrará em contato.</span>
            </>
          ) : (
            <span>
              O e-mail de recuperação de senha foi enviado com sucesso
            </span>
          )}
        </div>
      )}
    </div>
  );
}
