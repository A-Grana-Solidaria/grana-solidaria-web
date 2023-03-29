import React from "react";
import Footer from "../../componentes/footer/footer";
import Header from "../../componentes/header/header";
import LoadingResetPassword from "../../componentes/loading-reset-password/loading";
import Modal from "react-modal";
import { Formik } from "formik";
import * as Yup from "yup";
import "./insert-password.css";
import { useRouteMatch } from "react-router-dom";

export default function InsertPassword() {
  const { params } = useRouteMatch();
  const [loadingModalIsOpen, setLoadingModalIsOpen] = React.useState(false);

  const showLoading = () => {
    setLoadingModalIsOpen(true);
  };

  const hideLoading = () => {
    setLoadingModalIsOpen(false);
  };
  return (
    <div className="RecoverPassword">
      <Header h1="senha" h2="redefinição de" arrow="true" menu="false" />

      <div className="recover-content">
        <div className="container">
          <p>Para redefinir sua senha, por favor digite uma nova senha.</p>

          <Formik
            initialValues={{
              password: "",
              changepassword: "",
            }}
            onSubmit={async (formValues) => {
              showLoading();     
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .required("Campo requerido")
                .min(6, "Senha deve ter no mínimo seis caracteres."),
              changepassword: Yup.string()
                .required("Required")
                .when("password", {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "As senhas não conferem."
                  ),
                }),
            })}
          >
            {(props) => {
              const {
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <label>Senha</label>
                  <input
                    id="password"
                    placeholder="Senha"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                  <label>Confirmar senha</label>
                  <input
                    id="changepassword"
                    placeholder="Senha"
                    type="password"
                    value={values.changepassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.changepassword && (
                    <div className="input-feedback">
                      {errors.changepassword}
                    </div>
                  )}

                  <button type="submit">Redefinir senha</button>
                  <Modal
                    hideModal={hideLoading}
                    isOpen={loadingModalIsOpen}
                    className="ModalLoading"
                    overlayClassName="OverlayFirstTime"
                  >
                    <LoadingResetPassword hideModal={hideLoading} token={params.token} password={values.password} />
                  </Modal>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
}
