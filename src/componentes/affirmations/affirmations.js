import "./affirmations.css";
import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

export default function Affirmations(props) {
  const { hideModal } = props;
  const { params } = useRouteMatch();
  const history = useHistory();

  return (
    <div className="Affirmations">
      <div className="close">
        <button onClick={hideModal}>x</button>
      </div>
      <span>
        Para seu primeiro apoio, por favor, confirme as seguintes afirmações
      </span>

      <Formik
        initialValues={{
          o1: false,
          o2: false,
          o3: false,
          o4: false,
        }}
        onSubmit={async (formValues) => {
          history.push(`${process.env.PUBLIC_URL}/apoiar-sonho/${params.id}`);
        }}
        validationSchema={Yup.object().shape({
          o1: Yup.string().required("Campo requerido"),
          o2: Yup.string().required("Campo requerido"),
          o3: Yup.string().required("Campo requerido"),
          o4: Yup.string().required("Campo requerido"),
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
              <div className="affirmation">
                <p>
                  A Grana Solidária intermedia uma operação onde vou, de forma
                  direta, disponibilizar recursos para investir em projetos de
                  pessoas de baixa renda sonham em ter uma fonte de renda
                  extra/própria
                </p>

                <div className="input-checkbox">
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.o1}
                    id="o1"
                  ></input>
                  <label>Estou ciente</label>
                </div>
              </div>

              <div className="affirmation">
                <p>
                  Entendo que o reembolso do valor investido, e do seu
                  rendimento, será feito diretamente pelo tomador
                </p>
                <div className="input-checkbox">
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.o2}
                    id="o2"
                  ></input>
                  <label>Estou ciente</label>
                </div>
              </div>

              <div className="affirmation">
                <p>
                  Caso os projetos escolhidos por mim não alcancem o valor de
                  investimento, é possível optar por cotas extras de
                  investimento para viabilizá-los dentro do prazo de 3 meses
                  desde o início da disponibilização para investimento
                </p>
                <div className="input-checkbox">
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.o3}
                    id="o3"
                  ></input>
                  <label>Estou ciente</label>
                </div>
              </div>

              <div className="affirmation">
                <p>
                  Ao final desse prazo de 3 meses, caso os projetos não cheguem
                  a atingir o valor de viabilidade, o meu dinheiro destinado a
                  cada um deles será retornado para a minha carteira sem
                  qualquer rentabilidade
                </p>
                <div className="input-checkbox">
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.o4}
                    id="o4"
                  ></input>
                  <label>Estou ciente</label>
                </div>
              </div>

              <button
                disabled={
                  values.o1 && values.o2 && values.o3 && values.o4
                    ? false
                    : true
                }
              >
                Prosseguir
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
