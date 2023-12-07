import "./company-address-register.css";
import React, {useEffect} from "react";
import Header from "../../componentes/header/header";
import Footer from "../../componentes/footer/footer";
import { Formik } from "formik";
import moment from "moment";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import API from "../../utils/fetch";
import InputMask from "react-input-mask";
import Whatsapp from "../../componentes/whatsapp/whatsapp";
import Modal from "react-modal";
import Agreements from "../agreement/agreement";

export default function CompanyAddressRegister() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const history = useHistory();

  const [accept, setAccept] = React.useState(false);
  const [modalAgreementIsOpen, setModalAgreementIsOpen] = React.useState(false);

  const showAgreement = () => {
    setModalAgreementIsOpen(true);
  };

  const hideAgreement = () => {
    setModalAgreementIsOpen(false);
  };

  return (
    <div className="CompanyAddressRegister">
      <Header h1="Grana Solidária" h2="Quero fazer parte da" arrow="register" menu="false" />
      <div className="register-content">
        <div className="intro">
          <h4>Obrigado pelo seu interesse na Grana Solidária.</h4>
          <h4>O cadastro já está acabando! </h4>
        </div>
        <div className="part">
          <h2>Endereço da sua empresa</h2>
        </div>
        <Formik
          initialValues={{
            cep: "",
            bairro: "",
            complemento: "",
            numero: "",
            logradouro: "",
            cidade: "",
            estado: "",
            pais: "",
          }}
          onSubmit={async (formValues) => {
            let formData = new FormData();
            formData.append("cep", formValues.cep);
            formData.append("bairro", formValues.bairro);
            formData.append("complemento", formValues.complemento);
            formData.append("numero", formValues.numero);
            formData.append("logradouro", formValues.logradouro);
            formData.append("cidade", formValues.cidade);
            formData.append("estado", formValues.estado);
            formData.append("pais", formValues.pais);
            try{
              console.log(formData);
              const response = await API.company(formData);//ToDO: should I use formvalues?
              const data = response.data;
              API.updateAuthorization(data.dados.token);
              history.push(`${process.env.PUBLIC_URL}/conferir-email`);
            } catch (error) {

            }
          }}
          validationSchema={Yup.object().shape({

          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <label>CEP (apenas números)</label>
                  <InputMask
                    mask="999999999-99"
                    id="cep"
                    placeholder="CEP"
                    type="text"
                    value={values.cep}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.cep && touched.cep ? "error" : ""
                    }
                  />
                  <label>Bairro</label>
                  <input
                    id="bairro"
                    placeholder="Bairro"
                    type="text"
                    value={values.bairro}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.bairro && touched.bairro ? "error" : ""}
                  />
                  <label>Complemento</label>
                  <input
                    id="complemento"
                    placeholder="Complemento"
                    type="text"
                    value={values.complemento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.complemento && touched.complemento ? "error" : ""}
                  />
                  <label>Número</label>
                  <input
                    id="numero"
                    placeholder="Número"
                    type="text"
                    value={values.numero}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.numero && touched.numero ? "error" : ""}
                  />
                  <label>Logradouro</label>
                  <input
                    id="logradouro"
                    placeholder="Logradouro"
                    type="text"
                    value={values.logradouro}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.logradouro && touched.logradouro ? "error" : ""}
                  />
                  <label>Cidade</label>
                  <input
                    id="city"
                    placeholder="Cidade"
                    type="text"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.city && touched.city ? "error" : ""}
                  />
                  <label>Estado</label>
                  <input
                    id="state"
                    placeholder="Estado"
                    type="text"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.state && touched.state ? "error" : ""}
                  />
                  <label>País</label>
                  <input
                    id="pais"
                    placeholder="País"
                    type="text"
                    value={values.pais}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.pais && touched.pais ? "error" : ""}
                  />
                  <div className="disclaimer">
                    <span className="agreement">
                      <Modal
                        isOpen={modalAgreementIsOpen}
                        className="ModalAgreement"
                        overlayClassName="OverlayAgreement"
                      >
                        <Agreements
                          accept={accept}
                          setAccept={setAccept}
                          hideModal={hideAgreement}
                        />
                      </Modal>
                      <a onClick={showAgreement} target="_blank" rel="noreferrer">
                        Antes de prosseguir, leia o Termo de consentimento do
                        usuário
                      </a>
                      .
                    </span>
                </div>
                  <div class="alignButton">
                    <button type="submit" className="submit">
                      Finalizar cadastro
                    </button>
                  </div>
                </form>
              );
          }}
        </Formik>
        <hr></hr>
        <Whatsapp />
      </div>
      <Footer />
    </div>
  );
}