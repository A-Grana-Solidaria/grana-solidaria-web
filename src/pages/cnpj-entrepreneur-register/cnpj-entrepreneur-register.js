import "./cnpj-entrepreneur-register.css";
import React from "react";
import InputMask from "react-input-mask";
import Header from "../../componentes/header/header";
import Footer from "../../componentes/footer/footer";
import Whatsapp from "../../componentes/whatsapp/whatsapp";
import Photo from "../../assets/registro-photo.png";
import StatesDropdown from '../../componentes/brazilian-states-dropdown/brazilian-states-dropdown';
import CitiesDropdown from '../../componentes/brazilian-cities-dropdown/brazilian-cities-dropdown';

import API from "../../utils/fetch";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import {
  isValidCPF,
  isValidCEP,
  isValidEmail,
  isValidMobilePhone,
  isValidCNPJ,
  getCities,
  getStates
} from "@brazilian-utils/brazilian-utils";
import moment from "moment";
import {useEffect} from 'react';

export default function CnpjEntrepreneurRegister() {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const history = useHistory();
  const [cpfManagingPartnerError, setcpfManagingPartnerError] = React.useState("");
  const [cnpjError, setCnpjError] = React.useState("");
  const [companyCepError, setCompanyCepError] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");
  const [photosrc, setphotosrc] = React.useState("");
  const [managingPartnerEmailError, setManagingPartnerEmailError] = React.useState("");
  const [dateError, setDateError] = React.useState("");
  const shortenedStatesNamesList = getStates().map((state) => state.code);
  const [selectedOption, setSelectedOption] = React.useState('');
  const handleOptionSelect = (selectedValue) => {
    setSelectedOption(selectedValue);
  };


  return (
    <div className="CnpjEntrepreneurRegister">
      <Header h1="Grana Solidária" h2="Quero me cadastrar na" arrow="true" menu="false" />
      <div className="register-content">
        <div className="intro">
          <h4>Obrigado pelo seu interesse na Grana Solidária.</h4>
          <h4>O cadastro é bem rapidinho </h4>
        </div>
        <div className="part">
          <h3>Parte 1 de 2</h3>
          <h2>Informações da sua empresa</h2>
          <h4>Todas as informações referentes a pessoa física são do sócio administrador</h4>
        </div>
        <Formik
          initialValues={{
            razaosocial: "",
            nomefantasia: "",
            birthdateManagingPartner: "",
            phoneNumberManagingPartner: "",
            companyCep: "",
            cpfManagingPartner: "",
            cpnj: "",
            state: "",
            city: "",
            managingPartnerEmail: "",
            password: "",
            changepassword: "",
          }}
          onSubmit={async (formValues) => {
            let formData = new FormData();
            formData.append("razaosocial", formValues.razaosocial);
            formData.append("nomefantasia", formValues.nomefantasia);
            formData.append("state", formValues.state);
            formData.append("city", formValues.city);
            formData.append(
              "birthdatemanagingpartner",
              moment(formValues.birthdateManagingPartner, "DD/MM/YYYY").format("MM-DD-YYYY")
            );
            formData.append("phonenumbermanagingpartner", formValues.phoneNumberManagingPartner);
            formData.append("companycep", formValues.companyCep);
            formData.append("cpfmanagingpartner", formValues.cpfManagingPartner);
            formData.append("cnpj", formValues.cnpj);
            formData.append("managingpartneremail", formValues.managingPartnerEmail);
            formData.append("password", formValues.password);
            formData.append("picture", formValues.picture);

            try {
              //const response = await API.dreamer(formData);
              console.log(formData);
              
              //const data = response.data;

              setCompanyCepError("");
              setcpfManagingPartnerError("");
              setCnpjError("");
              setPhoneError("");
              setDateError("");
              setManagingPartnerEmailError("");
              //API.updateAuthorization(data.dados.token);
              history.push(`${process.env.PUBLIC_URL}/questionario`);
            } catch (error) {
              if (!isValidCPF(formValues.cpf)) {
                setcpfManagingPartnerError("CPF Inválido");
              }
              if (!isValidCNPJ(formValues.cnpj)) {
                setCnpjError("CNPJ Inválido");
              }

              if (!isValidCEP(formValues.cep)) {
                setCompanyCepError("CEP inválido");
              }
              if (!moment(formValues.birthdateManagingPartner, "DD/MM/YYYY").isValid()) {
                setDateError("Data inválida");
              } else if (
                Date.parse(moment(formValues.birthdateManagingPartner, "DD/MM/YYYY")._d) >
                new Date().setFullYear(new Date().getFullYear() - 18)
              ) {
                setDateError("Menor de idade");
              }

              if (!isValidMobilePhone(formValues.phoneNumberManagingPartner)) {
                setPhoneError("Telefone inválido");
              }
              if (!isValidEmail(formValues.email)) {
                setManagingPartnerEmailError("Email inválido");
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
            razaosocial: Yup.string().required("Campo requerido"),
            nomefantasia: Yup.string().required("Campo requerido"),
            birthdateManagingPartner: Yup.string().required("Campo requerido"),
            phoneNumberManagingPartner: Yup.string()
              .min(11, "Formato inválido")
              .required("Campo requerido"),
            companyCep: Yup.string().required("Campo requerido"),
            cpfManagingPartner: Yup.string().required("Campo requerido"),
            cnpj: Yup.string().required("Campo requerido"),
            state: Yup.string().required("Campo requerido"),
            city: Yup.string().required("Campo requerido"),
            managingPartnerEmail: Yup.string().email().required("Campo requerido"),
            password: Yup.string()
              .required("Campo requerido")
              .min(6, "Senha deve ter no mínimo seis caracteres."),
            changepassword: Yup.string()
              .required("Campo requerido")
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
            const handleStateSelect = (selectedState) => {
              <input id="state" value={selectedState}></input>//ToDO:is this correct?
              return selectedState;
            }
            const handleCitySelect = (selectedCity) => {
              <input id="state" value={selectedCity}></input>//ToDO:is this correct?
            }
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
                <label>Razão Social</label>
                <input
                  id="razaosocial"
                  placeholder="Razão Social"
                  type="text"
                  value={values.razaosocial}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.razaosocial && touched.razaosocial ? "error" : ""}
                />
                {errors.razaosocial && touched.razaosocial && (
                  <div className="input-feedback">{errors.razaosocial}</div>
                )}
                <label>Nome Fantasia</label>
                <input
                  id="nomefantasia"
                  placeholder="Nome Fantasia"
                  type="text"
                  value={values.nomefantasia}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.nomefantasia && touched.nomefantasia ? "error" : ""}
                />
                {errors.nomefantasia && touched.nomefantasia && (
                  <div className="input-feedback">{errors.nomefantasia}</div>
                )}
                <label>Data de Nascimento</label>
                <InputMask
                  mask="99/99/9999"
                  id="birthdatemanagingpartner"
                  placeholder="Data de Nascimento"
                  type="text"
                  value={values.birthdateManagingPartner}
                  onChange={handleChange}
                  onClick={() => {
                    setDateError("");
                  }}
                  onBlur={handleBlur}
                  className={
                    errors.birthdateManagingPartner && touched.birthdateManagingPartner ? "error" : ""
                  }
                />
                {dateError ? (
                  <div className="input-feedback">{dateError}</div>
                ) : (
                  ""
                )}
                {errors.birthdateManagingPartner && touched.birthdateManagingPartner && (
                  <div className="input-feedback">{errors.birthdateManagingPartner}</div>
                )}
                <label>Número de Telefone</label>
                <InputMask
                  mask="(99) 99999-9999"
                  id="phonenumbermanagingpartner"
                  placeholder="Número de Telefone"
                  type="text"
                  value={values.phoneNumberManagingPartner}
                  onChange={handleChange}
                  onClick={() => {
                    setPhoneError("");
                  }}
                  onBlur={handleBlur}
                  className={
                    errors.phoneNumberManagingPartner && touched.phoneNumberManagingPartner ? "error" : ""
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
                  id="companycep"
                  placeholder="CEP"
                  type="text"
                  value={values.cep}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.companyCep && touched.companyCep ? "error" : ""}
                />
                {companyCepError ? (
                  <div className="input-feedback">{companyCepError}</div>
                ) : (
                  ""
                )}
                {errors.companyCep && touched.companyCep && (
                  <div className="input-feedback">{errors.companyCep}</div>
                )}
                <label>CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  id="cpfmanagingpartner"
                  placeholder="CPF"
                  type="text"
                  value={values.cpfManagingPartner}
                  onChange={handleChange}
                  onClick={() => {
                    setcpfManagingPartnerError("");
                  }}
                  onBlur={handleBlur}
                  className={errors.cpfManagingPartner && touched.cpfManagingPartner ? "error" : ""}
                />
                {cpfManagingPartnerError ? (
                  <div className="input-feedback">{cpfManagingPartnerError}</div>
                ) : (
                  ""
                )}
                {errors.cpf && touched.cpf && (
                  <div className="input-feedback">{errors.cpf}</div>
                )}
                <label>CNPJ</label>
                <InputMask
                  mask="99.999.999/9999-99"
                  id="cnpj"
                  placeholder="CNPJ"
                  type="text"
                  value={values.cnpj}
                  onChange={handleChange}
                  onClick={() => {
                    setCnpjError("");
                  }}
                  onBlur={handleBlur}
                  className={errors.cnpj && touched.cnpj ? "error" : ""}
                />
                {cnpjError ? (
                  <div className="input-feedback">{cnpjError}</div>
                ) : (
                  ""
                )}
                {errors.cnpj && touched.cnpj && (
                  <div className="input-feedback">{errors.cnpj}</div>
                )}
                <label>Estado</label>
                <StatesDropdown options={shortenedStatesNamesList} onSelect={handleOptionSelect} />
                <label>Cidade</label>
                {selectedOption && (
                  <CitiesDropdown options={getCities(selectedOption)} onSelect={handleCitySelect}/>
                )}
                <label>Email</label>
                <input
                  id="managingpartneremail"
                  placeholder="E-mail"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onClick={() => {
                    setManagingPartnerEmailError("");
                  }}
                  onBlur={handleBlur}
                  className={
                    errors.managingPartnerEmail && touched.managingPartnerEmail
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {managingPartnerEmailError ? (
                  <div className="input-feedback">{managingPartnerEmailError}</div>
                ) : (
                  ""
                )}
                {errors.managingPartnerEmailError && touched.managingPartnerEmailError && (
                  <div className="input-feedback">{errors.emamanagingPartnerEmailErroril}</div>
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
                {errors.changepassword && touched.changepassword && (
                  <div className="input-feedback">{errors.changepassword}</div>
                )}

                <div class="alignButton">
                  <button type="submit" className="submit">
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
