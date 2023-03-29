import "./supporter-register.css";
import React from "react";
import InputMask from "react-input-mask";
import Footer from "../../componentes/footer/footer";
import Whatsapp from "../../componentes/whatsapp/whatsapp";
import Header from "../../componentes/header/header";
import Photo from "../../assets/registro-photo.png";
import API from "../../utils/fetch";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  isValidCPF,
  isValidCEP,
  isValidEmail,
  isValidMobilePhone,
} from "@brazilian-utils/brazilian-utils";
import moment from "moment";
import Modal from "react-modal";
import Agreements from "../agreement/agreement";

export default function SupporterRegister() {
  const history = useHistory();
  const [cpfError, setCpfError] = React.useState("");
  const [cepError, setCepError] = React.useState("");
  const [dateError, setDateError] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");
  const [photosrc, setphotosrc] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [accept, setAccept] = React.useState(false);
  const [modalAgreementIsOpen, setModalAgreementIsOpen] = React.useState(false);

  const showAgreement = () => {
    setModalAgreementIsOpen(true);
  };

  const hideAgreement = () => {
    setModalAgreementIsOpen(false);
  };
  return (
    <div className="SupporterRegister">
      <Header h2="Quero ser um" h1="Apoiador" menu="false" arrow="true" />

      <div className="register-content">
        <div className="intro">
          <span>Obrigado pelo seu interesse na Grana Solidaria.</span>
          <span>O cadastro é bem rapidinho ;) </span>
        </div>

        <Formik
          initialValues={{
            name: "",
            birthdate: "",
            phoneNumber: "",
            cep: "",
            cpf: "",
            email: "",
            password: "",
            changepassword: "",
            hasInvestingExperience: "",
            investingType: "",
            investingBudget: 100,
            type: "1",
          }}
          onSubmit={async (formValues) => {
            let formData = new FormData();

            formData.append("name", formValues.name);
            formData.append(
              "birthdate",
              moment(formValues.birthdate, "DD/MM/YYYY").format("MM-DD-YYYY")
            );
            formData.append("cpf", formValues.cpf);
            formData.append("cep", formValues.cep);
            formData.append("phonenumber", formValues.phoneNumber);
            formData.append("email", formValues.email);
            formData.append("picture", formValues.picture);
            formData.append("password", formValues.password);
            formData.append(
              "hasInvestingExperience",
              formValues.hasInvestingExperience
            );
            formData.append("investingType", formValues.investingType);
            formData.append("investingBudget", formValues.investingBudget);
            formData.append("type", formValues.type);

            try {
              const response = await API.supporter(formData);
              const data = response.data;

              setCepError("");
              setCpfError("");
              setPhoneError("");
              setDateError("");
              setEmailError("");
              API.updateAuthorization(data.dados.token);

              history.push(`${process.env.PUBLIC_URL}/conferir-email`);
            } catch (error) {
              if (!isValidCPF(formValues.cpf)) {
                setCpfError("CPF Inválido");
              }

              if (!isValidCEP(formValues.cep)) {
                setCepError("CEP inválido");
              }
              if (!moment(formValues.birthdate, "DD/MM/YYYY").isValid()) {
                setDateError("Data inválida");
              } else if (
                Date.parse(moment(formValues.birthdate, "DD/MM/YYYY")._d) >
                new Date().setFullYear(new Date().getFullYear() - 18)
              ) {
                setDateError("Menor de idade");
              }

              if (!isValidMobilePhone(formValues.phoneNumber)) {
                setPhoneError("Telefone inválido");
              }
              if (!isValidEmail(formValues.email)) {
                setEmailError("Email inválido");
              }
              if (
                error.response.data.dados.mensagem ===
                "Usuario já está cadastrado"
              ) {
                alert(error.response.data.dados.mensagem);
              }
            }
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Campo requerido"),
            birthdate: Yup.string().required("Campo requerido"),
            phoneNumber: Yup.string().required("Campo requerido"),
            cep: Yup.string().required("Campo requerido"),
            cpf: Yup.string().required("Campo requerido"),
            hasInvestingExperience: Yup.string().required(
              "Por favor, escolha uma opção."
            ),
            investingType: Yup.string().required(
              "Por favor, escolha uma opção."
            ),
            investingBudget: Yup.number()
              .required("Por favor, escolha um valor")
              .min(100),
            email: Yup.string().email().required("Campo requerido"),
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
              touched,
              errors,
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <div className="photo">
                  <img
                    className="imgRound"
                    src={photosrc || Photo}
                    alt="imagem placeholder para o perfil"
                  />
                  <h2>
                    <label className="changePhotoLabel">
                      Adicionar Foto
                      <input
                        type="file"
                        id="picture"
                        onChange={(event) => {
                          let reader = new FileReader();
                          reader.onloadend = () => {
                            setphotosrc(reader.result);
                          };
                          reader.readAsDataURL(event.target.files[0]);
                          setFieldValue("picture", event.target.files[0]);
                        }}
                      />
                    </label>
                  </h2>
                </div>
                <label>Nome Completo</label>
                <input
                  id="name"
                  placeholder="Nome Completo"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.name && touched.name ? "error" : ""}
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
                <label>Data de Nascimento</label>
                <InputMask
                  mask="99/99/9999"
                  id="birthdate"
                  placeholder="Data de Nascimento"
                  type="text"
                  value={values.birthdate}
                  onChange={handleChange}
                  onClick={() => {
                    setDateError("");
                  }}
                  onBlur={handleBlur}
                  className={
                    errors.birthdate && touched.birthdate ? "error" : ""
                  }
                />
                {dateError ? (
                  <div className="input-feedback">{dateError}</div>
                ) : (
                  ""
                )}
                {errors.birthdate && touched.birthdate && (
                  <div className="input-feedback">{errors.birthdate}</div>
                )}
                <label>Número de Telefone</label>
                <InputMask
                  mask="(99) 99999-9999"
                  id="phoneNumber"
                  placeholder="Número de Telefone"
                  type="text"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onClick={() => {
                    setPhoneError("");
                  }}
                  onBlur={handleBlur}
                  className={
                    errors.phoneNumber && touched.phoneNumber ? "error" : ""
                  }
                />
                {phoneError ? (
                  <div className="input-feedback">{phoneError}</div>
                ) : (
                  ""
                )}
                {errors.phoneNumber && touched.phoneNumber && (
                  <div className="input-feedback">{errors.phoneNumber}</div>
                )}
                <label>CEP</label>
                <InputMask
                  mask="99999-999"
                  id="cep"
                  placeholder="CEP"
                  type="text"
                  value={values.cep}
                  onChange={handleChange}
                  onClick={() => {
                    setCepError("");
                  }}
                  onBlur={handleBlur}
                  className={errors.cep && touched.cep ? "error" : ""}
                />
                {cepError ? (
                  <div className="input-feedback">{cepError}</div>
                ) : (
                  ""
                )}
                {errors.cep && touched.cep && (
                  <div className="input-feedback">{errors.cep}</div>
                )}
                <label>CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  id="cpf"
                  placeholder="CPF"
                  type="text"
                  value={values.cpf}
                  onChange={handleChange}
                  onClick={() => {
                    setCpfError("");
                  }}
                  onBlur={handleBlur}
                  className={errors.cpf && touched.cpf ? "error" : ""}
                />
                {cpfError ? (
                  <div className="input-feedback">{cpfError}</div>
                ) : (
                  ""
                )}
                {errors.cpf && touched.cpf && (
                  <div className="input-feedback">{errors.cpf}</div>
                )}
                <label>Email</label>
                <input
                  id="email"
                  placeholder="E-mail"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onClick={() => {
                    setEmailError("");
                  }}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {emailError ? (
                  <div className="input-feedback">{emailError}</div>
                ) : (
                  ""
                )}
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}

                <label>Senha</label>
                <input
                  id="password"
                  placeholder="Senha"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password && touched.password ? "error" : ""}
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
                  className={
                    errors.changepassword && touched.changepassword
                      ? "error"
                      : ""
                  }
                />
                {errors.email && touched.changepassword && (
                  <div className="input-feedback">{errors.changepassword}</div>
                )}

                <span className="question">
                  Possui experiência com investimentos?
                </span>
                <div className="buttons">
                  <div>
                    <input
                      id="hasInvestingExperience"
                      type="radio"
                      name="hasInvestingExperience"
                      value={true}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.hasInvestingExperience &&
                        touched.hasInvestingExperience
                          ? "error"
                          : ""
                      }
                    />
                    <label>Sim</label>
                  </div>

                  <div>
                    <input
                      id="hasInvestingExperience"
                      type="radio"
                      name="hasInvestingExperience"
                      value={false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.hasInvestingExperience &&
                        touched.hasInvestingExperience
                          ? "error"
                          : ""
                      }
                    />
                    <label>Não</label>
                  </div>
                </div>

                {errors.hasInvestingExperience &&
                  touched.hasInvestingExperience && (
                    <div className="input-feedback">
                      {errors.hasInvestingExperience}
                    </div>
                  )}
                <span className="question">Modalidade de investimento</span>
                <div className="buttons">
                  <div>
                    <input
                      type="radio"
                      id="investingType"
                      name="investingType"
                      value={0}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.investingType && touched.investingType
                          ? "error"
                          : ""
                      }
                    />
                    <label>Pontual</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="investingType"
                      name="investingType"
                      value={1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.investingType && touched.investingType
                          ? "error"
                          : ""
                      }
                    />
                    <label>Recorrente</label>
                  </div>
                </div>

                {errors.investingType && touched.investingType && (
                  <div className="input-feedback">{errors.investingType}</div>
                )}
                <span className="question">Quanto deseja investir?</span>
                <div className="slider">
                  <input
                    type="range"
                    min="100"
                    max="3000"
                    className="slider-range"
                    id="investingBudget"
                    value={values.investingBudget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.investingBudget && touched.investingBudget
                        ? "error"
                        : ""
                    }
                  />
                  <span>R${values.investingBudget}</span>
                </div>
                {errors.investingBudget && touched.investingBudget && (
                  <div className="input-feedback">
                    É necessário colocar algum valor
                  </div>
                )}
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
                <div class="alignButton">
                  <button type="submit" className="submit" disabled={!accept}>
                    Continuar cadastro
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
