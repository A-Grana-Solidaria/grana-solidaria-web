import "./login.css";
import React from "react";
import { useHistory } from "react-router-dom";
import Whatsapp from "../whatsapp/whatsapp";
import API from "../../utils/fetch";
import { Formik } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";

export default function Login() {
  const history = useHistory();

  return (
    <div className="Login">
      <div className="login-container">
        <h2>Bem vindo de volta!</h2>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (formValues) => {
            try {
              const response = await API.auth(
                formValues.email,
                formValues.password
              );

              const data = response.data;

              API.updateAuthorization(data.dados.token);

              const user = jwt_decode(API.getToken());

              if (user.type === 1)
                history.push(`${process.env.PUBLIC_URL}/pagina-de-sonhos`);
              else {
                if (user.status === 1) {
                  history.push(
                    `${process.env.PUBLIC_URL}/sonho-individual-sonhador/${user.dreamid}`
                  );
                } else history.push(`${process.env.PUBLIC_URL}/em-analise`);
              }
            } catch (error) {
				
              if (error.response.status === 400) {
		
                history.push(`${process.env.PUBLIC_URL}/conferir-email`);
              }
                if (error.response.status === 401)
                  alert("email ou senha incorreta"); // TODO: substituir esse log por um feedback ao usuário
                 }
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Required"),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <input
                  id="email"
                  placeholder="E-mail"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">Por favor coloque um email válido</div>
                )}

                <input
                  id="password"
                  placeholder="Senha"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <a
                  onClick={() => {
                    history.push(`${process.env.PUBLIC_URL}/recuperar-senha`);
                  }}
                >
                  Esqueci minha senha
                </a>
                <button type="submit" className="submit" style={{backgroundColor: "#FFB152", color: "white"}}>
                  Login
                </button>
              </form>
            );
          }}
        </Formik>

        <span className="conta">
          <div className="hr"></div>Não possuo uma conta
          <div className="hr"></div>
        </span>
        <span></span>
        <div className="submit" style={{display: "flex"}}>
          <button
            onClick={() => {
              history.push(`${process.env.PUBLIC_URL}/registro-sonhador`);
            }}
          >
            Faça seu cadastro
          </button>
          {/* <button
            onClick={() => {
              history.push(`${process.env.PUBLIC_URL}/registro-apoiador`);
            }}
          >
            Apoiador
          </button> */}
        </div>
      </div>
      <hr></hr>
      <Whatsapp />
    </div>
  );
}
