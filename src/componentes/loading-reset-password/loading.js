import React from "react";
import "./loading.css";
import API from "../../utils/fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

export default function LoadingResetPassword(props) {
  const { hideModal, token, password } = props;
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);

  const redirect = () =>{
	hideModal()
	history.push(`${process.env.PUBLIC_URL}/`)
  }

  const sendCall = async () => {
    setLoading(true);

	const response = await API.resetPassword(
		token,
		password
	  );
	  if(response.status === 200) setLoading(false)
  };

  React.useEffect(() => {
    sendCall();
  }, []);

  return (
    <div className="Loading">
      <div className="close">
        <button onClick={redirect}>X</button>
      </div>
      {loading === true ? (
        <div>
          <FontAwesomeIcon icon={faSpinner} size="4x" pulse />
          <h2>Um momento</h2>
        </div>
      ) : (
        <div>
          <FontAwesomeIcon icon={faCheck} size="4x" />
          <h2>Sucesso</h2>

          <span>Sua senha foi alterada com sucesso</span>
        </div>
      )}
    </div>
  );
}
