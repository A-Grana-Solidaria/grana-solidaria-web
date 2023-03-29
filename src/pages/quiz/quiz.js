import "./quiz.css";
import React from "react";
import Header from "../../componentes/header/header";
import Footer from "../../componentes/footer/footer";
import Whatsapp from "../../componentes/whatsapp/whatsapp";
import API from "../../utils/fetch";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import Agreements from "../agreement/agreement";

export default function Quiz() {
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
    <div className="Quiz">
      <Header h1="sonhador" h2="quero ser um" menu="false" arrow="true" />

      <div className="quiz-content">
        <h3>Parte 2 de 2</h3>
        <h2>Questionário</h2>

        <Formik
          initialValues={{
            question1_status: "",
            question2_status: "",
            question3_status: "",
            question4_status: "",
            question5_status: "",
            question6_status: "",
            estimatedCashGoal: "",
            description: "",
            type: "0",
          }}
          onSubmit={async (formValues) => {
            try {
              const response = await API.registerDream(
                formValues.question1_status,
                formValues.question2_status,
                formValues.question3_status,
                formValues.question4_status,
                formValues.question5_status,
                formValues.question6_status,
                formValues.estimatedCashGoal,
                formValues.description,
                formValues.type
              );
              history.push(`${process.env.PUBLIC_URL}/conferir-email`);
            } catch (error) {
              alert("Preencha todos os campos!");
            }
          }}
          validationSchema={Yup.object().shape({
            question1_status: Yup.string().required(
              "Por favor, escolha uma opção."
            ),
            question2_status: Yup.string().required(
              "Por favor, escolha uma opção."
            ),
            question3_status: Yup.string().required(
              "Por favor, escolha uma opção."
            ),
            question4_status: Yup.string().required(
              "Por favor, escolha uma opção."
            ),
            question5_status: Yup.string().required(
              "Por favor, escolha uma opção."
            ),
            question6_status: Yup.string().required(
              "Por favor, escolha uma opção."
            ),
            estimatedCashGoal: Yup.number()
              .min(100, "Valor deve ser maior ou igual a 100")
              .required("Por favor, escolha um valor maior ou igual a R$100."),
            description: Yup.string().required("Campo requerido."),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <div className="question">
                  <span>
                    Você planeja complementar a renda ou quer trabalhar pra você
                    mesmo?
                  </span>
                  <div className="answer">
                    <input
                      type="radio"
                      id="question1_status"
                      name="question1_status"
                      value={"0"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <label>Complementar a renda</label>
                  </div>

                  <div className="answer">
                    <input
                      type="radio"
                      id="question1_status"
                      name="question1_status"
                      value={"1"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label>Trabalhar para mim</label>
                  </div>
                </div>
                {errors.question1_status && touched.question1_status && (
                  <div className="input-feedback">
                    {errors.question1_status}
                  </div>
                )}
                <div className="question">
                  <span>Você está trabalhando ou está desempregado?  </span>
                  <div className="answer">
                    <input
                      type="radio"
                      id="question2_status"
                      name="question2_status"
                      value={"0"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label>Trabalhando</label>
                  </div>
                  <div className="answer">
                    <input
                      type="radio"
                      id="question2_status"
                      name="question2_status"
                      value={"1"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label>Desempregado</label>
                  </div>
                </div>
                {errors.question2_status && touched.question2_status && (
                  <div className="input-feedback">
                    {errors.question2_status}
                  </div>
                )}
                <div className="question">
                  <span>
                    Você quer mudar de ramo ou continuar com a profissão que
                    tem?
                  </span>
                  <div className="answer">
                    <input
                      type="radio"
                      id="question3_status"
                      name="question3_status"
                      value={"0"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label>Mudar</label>
                  </div>
                  <div className="answer">
                    <input
                      type="radio"
                      id="question3_status"
                      name="question3_status"
                      value={"1"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label>Continuar</label>
                  </div>
                </div>
                {errors.question3_status && touched.question3_status && (
                  <div className="input-feedback">
                    {errors.question3_status}
                  </div>
                )}
                <div className="question">
                  <span>
                    O negócio que quer montar é fixo, uma banca de lanches por
                    exemplo, ou ambulante como um carro de lanches?
                  </span>
                  <div className="answer">
                    <input
                      type="radio"
                      id="question4_status"
                      name="question4_status"
                      value={"0"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label>Fixo</label>
                  </div>
                  <div className="answer">
                    <input
                      type="radio"
                      id="question4_status"
                      name="question4_status"
                      value={"1"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label>Ambulante</label>
                  </div>
                </div>
                {errors.question4_status && touched.question4_status && (
                  <div className="input-feedback">
                    {errors.question4_status}
                  </div>
                )}
                <div className="question">
                  <span>Vai ser no seu bairro mesmo?</span>
                  <div className="answer">
                    <input
                      type="radio"
                      id="question5_status"
                      name="question5_status"
                      value={"0"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label>No meu bairro</label>
                  </div>
                  <div className="answer">
                    <input
                      type="radio"
                      id="question5_status"
                      name="question5_status"
                      value={"1"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label>Outra região</label>
                  </div>
                </div>
                {errors.question5_status && touched.question5_status && (
                  <div className="input-feedback">
                    {errors.question5_status}
                  </div>
                )}
                <div className="question">
                  <span>
                    Já fez ou está fazendo algum curso de empreendedorismo ou de
                    investimento pessoal?
                  </span>
                  <div className="answer">
                    <input
                      type="radio"
                      id="question6_status"
                      name="question6_status"
                      value={"0"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label>Sim</label>
                  </div>
                  <div className="answer">
                    <input
                      type="radio"
                      id="question6_status"
                      name="question6_status"
                      value={"1"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label>Não</label>
                  </div>
                </div>
                {errors.question6_status && touched.question6_status && (
                  <div className="input-feedback">
                    {errors.question6_status}
                  </div>
                )}
                <div className="question">
                  <span>Qual é o seu sonho?</span>
                  <p>
                    Descreva o seu sonho para nós conhecermos um pouco do seu
                    projeto. Esse é o primeiro passo para ganhar o apoio de
                    pessoas que acreditam em você e na sua ideia. O valor
                    estimado não é o valor final que será públicado
                  </p>

                  {errors.description && touched.description && (
                    <div className="input-feedback">{errors.description}</div>
                  )}
                  <p>
                    Essas informações poderão ser editadas entrando em contato
                    com a Grana Solidária.
                  </p>
                  <textarea
                    id="description"
                    value={values.description}
                    placeholder="Meu sonho é..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>

                  <span>Valor estimado</span>
                  <input
                    id="estimatedCashGoal"
                    placeholder="Digite um valor"
                    type="text"
                    value={values.estimatedCashGoal}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.estimatedCashGoal && touched.estimatedCashGoal && (
                  <div className="input-feedback">
                    {errors.estimatedCashGoal}
                  </div>
                )}
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
                <button type="submit" className="submit" disabled={!accept}>
                  Finalizar cadastro
                </button>
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
