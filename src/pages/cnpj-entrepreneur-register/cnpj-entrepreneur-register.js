import "./cnpj-entrepreneur-register.css";
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

export default function CnpjEntrepreneurRegister() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const history = useHistory();
  

  return (
    <div className="CnpjEntrepreneurRegister">
      <Header h1="Grana Solidária" h2="Quero fazer parte da" arrow="true" menu="false" />
      <div className="register-content">
        <div className="intro">
          <h4>Obrigado pelo seu interesse na Grana Solidária.</h4>
          <h4>O cadastro é bem rapidinho </h4>
        </div>
        <div className="part">
          <h2>Informações da sua empresa</h2>
        </div>
        <Formik
          initialValues={{
            cnpj: "",
            razaosocial: "",
            nomefantasia: "",
            cellphone: "",
            tellphone: "",
            openingdate: "",
            investimenttarget: "",
          }}
          onSubmit={async (formValues) => {
            let formData = new FormData();
            formData.append("cnpj", formValues.cnpj);
            formData.append("razaosocial", formValues.razaosocial);
            formData.append("nomefantasia", formValues.nomefantasia);
            formData.append("cellphone", formValues.cellphone);
            formData.append("tellphone", formValues.tellphone);
            formData.append(
              "openingdate",
              moment(formValues.openingdate, "DD/MM/YYYY").format("MM-DD-YYYY")
            );
            formData.append("investimenttarget", formValues.investimenttarget);
            try{
              const saveDataOnCache = await API.saveCompanyDataOnCache(formValues);//ToDO: Validate if its safe (formvalues and saving on cache)
              history.push(`${process.env.PUBLIC_URL}/registro-endereco-empresa`);
            } catch (error) {
              alert(error.response.data.dados.mensagem);//ToDO: enquanto n tenho erros personalizados para cada campo
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
                  <label>Quanto você precisa de investimento?</label>
                  <input
                    id="investimenttarget"
                    placeholder="Investimento"
                    type="text"
                    value={values.investimenttarget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.investimenttarget && touched.investimenttarget ? "error" : ""}
                    /*ToDO: Criar mascara para valor em dinheiro*/
                  />
                  <label>CNPJ (apenas números)</label>
                  <InputMask
                    mask="99.999.999/9999-99"
                    id="cnpj"
                    placeholder="CNPJ"
                    type="text"
                    value={values.cnpj}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.cnpj && touched.cnpj ? "error" : ""
                    }
                  />
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
                  <label>Número de Celular</label>
                  <InputMask
                    mask="(99) 99999-9999"
                    id="cellphone"
                    placeholder="Número de Celular"
                    type="text"
                    value={values.cellphone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.cellphone && touched.cellphone ? "error" : ""
                    }
                  />
                  <label>Número de Telefone</label>
                  <InputMask
                    mask="(99) 9999-9999"
                    id="tellphone"
                    placeholder="Número de Telefone"
                    type="text"
                    value={values.tellphone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.tellphone && touched.tellphone ? "error" : ""
                    }
                  />
                  <label>Data de Abertura</label>
                  <InputMask
                    mask="99/99/9999"
                    id="openingdate"
                    placeholder="Data de Abertura"
                    type="text"
                    value={values.openingdate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.openingdate && touched.openingdate ? "error" : ""
                    }
                  />
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