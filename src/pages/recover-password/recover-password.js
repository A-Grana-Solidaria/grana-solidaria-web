import React from "react";
import Footer from "../../componentes/footer/footer";
import Header from "../../componentes/header/header";
import Loading from "../../componentes/loading/loading";
import Modal from "react-modal";
import { Formik } from "formik";
import API from "../../utils/fetch"
import * as Yup from "yup";
import "./recover-password.css";

export default function RecoverPassword() {
  const [loadingModalIsOpen, setLoadingModalIsOpen] = React.useState(false);

  const showLoading = () => {
    setLoadingModalIsOpen(true);
  };

  const hideLoading = () => {
    setLoadingModalIsOpen(false);
  };
  return (
    <div className="RecoverPassword">
      <Header h1="senha" h2="esqueci minha" arrow="true" menu="false" />

      <div className="recover-content">
        <div className="container">
          <p>Para recuperar a sua senha, digite o seu e-mail abaixo</p>

          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={async (formValues) => {
               //   const response = await API.recoverPassword(formValues.email)
			  showLoading();
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
                  <label>
                    E-mail
                    <input
                      type="text"
                      placeholder="Digite seu e-mail"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </label>

                  <button type="submit">Continuar</button>
                  <Modal
                    hideModal={hideLoading}
                    isOpen={loadingModalIsOpen}
                    className="ModalLoading"
                    overlayClassName="OverlayFirstTime"
                  >
                    <Loading hideModal={hideLoading} email={values.email}/>
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
