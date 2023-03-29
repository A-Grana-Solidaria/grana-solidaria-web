import "./agreement.css";
import Footer from "../../componentes/footer/footer";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function Agreement(props) {
  const { hideModal, setAccept, accept } = props;
  const { params } = useRouteMatch();
  const history = useHistory();
  return (
    <div className="Agreement">
      <div className="close">
        <button onClick={hideModal}>x</button>
      </div>
      <Formik
        initialValues={{
          o1: accept,
        }}
        onSubmit={() => {
          hideModal();
        }}
        validationSchema={Yup.object().shape({
          o1: Yup.string().required("Campo requerido"),
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
              <div className="agreement-content">
                <div className="container">
                  <br />
                  <h4>
                    TERMO DE CONSENTIMENTO DO USUÁRIO PARA ARMAZENAMENTO E
                    TRATAMENTO DE SEUS DADOS PESSOAIS,{" "}
                    <span>
                      em conformidade com a Lei nº 13.709 – Lei Geral de
                      Proteção de Dados Pessoais (LGPD).
                    </span>
                  </h4>
                  <br />
                  <p>
                    Este documento visa registrar a manifestação livre,
                    informada e inequívoca pela qual o titular do dado
                    denominado <strong>USUÁRIO</strong> consente e concorda com
                    a coleta e o tratamento de seus dados pessoais para
                    finalidade específica, em conformidade com a Lei nº 13.709 –
                    Lei Geral de Proteção de Dados Pessoais (LGPD).
                  </p>
                  <p>
                    O <strong>USUÁRIO</strong> ao utilizar os nossos serviços
                    e/ou ao se cadastrar no nosso site, manifesta sua aceitação
                    para com o presente Termo de Consentimento através do aceite
                    expresso clicando no link abaixo{" "}
                    <strong>
                      <em>“Li e dou o meu consentimento”</em>
                    </strong>
                    , o Titular do Dado denominado <strong>USUÁRIO</strong>
                    consente e concorda que o site{" "}
                    <strong>GRANA SOLIDÁRIA</strong> o qual é de propriedade da
                    empresa GRANA SOLIDARIA LTDA, CNPJ nº 41.001.505/0001-58,
                    com sede na rua Ewerton Visco, 290, Edf. Boulevard Side
                    Empresarial, Sala 1901, Caminho das Árvores, Salvador,
                    Bahia, CEP 41.820-022, telefone (71) 3329.6066, e-mail -
                    granasolidaria@gmail.com, doravante denominada{" "}
                    <strong>Controlador</strong>, tome decisões referentes ao
                    tratamento de seus dados pessoais, bem como realize o
                    tratamento de seus dados pessoais, envolvendo operações como
                    as que se referem a coleta, produção, recepção,
                    classificação, utilização, acesso, reprodução, transmissão,
                    distribuição, processamento, arquivamento, armazenamento,
                    eliminação, avaliação ou controle da informação,
                    modificação, comunicação, transferência, difusão ou
                    extração.
                  </p>
                  <br />
                  <h4>DADOS PESSOAIS DO USUÁRIO</h4>
                  <p>
                    O Site <strong>GRANA SOLIDÁRIA</strong> na qualidade de{" "}
                    <strong>Controladora</strong> fica autorizada a tomar
                    decisões referentes ao tratamento e a realizar o tratamento
                    dos seguintes dados pessoais do Titular:
                  </p>
                  <ul>
                    <li>Nome completo;</li>
                    <li>Nome empresarial;</li>
                    <li>Data de nascimento;</li>
                    <li>Número e imagem da Carteira de Identidade (RG);</li>
                    <li>
                      Número e imagem do Cadastro de Pessoas Físicas (CPF);
                    </li>
                    <li>
                      Número e imagem da Carteira Nacional de Habilitação (CNH);
                    </li>
                    <li>
                      Número do Cadastro Nacional de Pessoas Jurídicas (CNPJ);
                    </li>
                    <li>Estado civil;</li>
                    <li>Endereço completo;</li>
                    <li>
                      Números de telefone, WhatsApp e endereços de e-mail;
                    </li>
                    <li>Banco, agência e número de contas bancárias;</li>
                    <li>
                      Bandeira, número, validade e código de cartões de crédito;
                    </li>
                    <li>
                      Nome de usuário e senha específicos para uso dos serviços
                      do Controlador;
                    </li>
                    <li>
                      Comunicação, verbal e escrita, mantida entre o Titular e o
                      Controlador.
                    </li>
                  </ul>
                  <br />
                  <h4>FINALIDADES DO TRATAMENTO DOS DADOS</h4>
                  <p>
                    O tratamento dos dados pessoais listados neste termo tem as
                    seguintes finalidades:
                  </p>
                  <ul>
                    <li>
                      Possibilitar que a Controladora identifique e entre em
                      contato com o Titular para fins de relacionamento
                      comercial.
                    </li>
                    <li>
                      Possibilitar que a Controladora elabore contratos
                      comerciais e emita cobranças contra o Titular.
                    </li>
                    <li>
                      Possibilitar que a Controladora envie ou forneça ao
                      Titular seus produtos e serviços, de forma remunerada ou
                      gratuita.
                    </li>
                    <li>
                      Possibilitar que a Controladora estruture, teste, promova
                      e faça propaganda de produtos e serviços, personalizados
                      ou não ao perfil do Titular.
                    </li>
                    <li>
                      Possibilitar que a Controladora utilize tais dados em
                      Pesquisas de Mercado;
                    </li>
                    <li>
                      Possibilitar que a Controladora utilize tais dados para
                      suas peças de Comunicação;
                    </li>
                    <li>
                      Possibilitar que a Controladora utilize tais dados emissão
                      de Notas Fiscais e documentos financeiros correlatos;
                    </li>
                    <li>
                      Possibilitar que a Controladora utilize tais dados para
                      facilitar a prestação de serviços diversos além dos
                      primariamente contratados, desde que o cliente também
                      demonstre interesse em contratar novos serviços;
                    </li>
                    <li>
                      Possibilitar que a Controladora conecte o titular do dado
                      que deseja empreender com e pessoas físicas ou jurídicas
                      que desejam investir em microempreendedores.
                    </li>
                    <li>
                      Possibilitar que a Controladora utilize tais dados para
                      manter banco de dados de profissionais do mercado para
                      facilitar o contato em futuros convites para eventos;
                    </li>
                  </ul>
                  <br />
                  <h4>COMPARTILHAMENTO DE DADOS</h4>
                  <p>
                    A Controladora fica autorizada a compartilhar os dados
                    pessoais do Titular com outros agentes de tratamento de
                    dados, caso seja necessário para as finalidades listadas
                    neste termo, observados os princípios e as garantias
                    estabelecidas pela Lei nº 13.709.
                  </p>
                  <br />
                  <h4>SEGURANÇA DOS DADOS</h4>
                  <p>
                    A Controladora responsabiliza-se pela manutenção de medidas
                    de segurança, técnicas e administrativas aptas a proteger os
                    dados pessoais de acessos não autorizados e de situações
                    acidentais ou ilícitas de destruição, perda, alteração,
                    comunicação ou qualquer forma de tratamento inadequado ou
                    ilícito.
                  </p>
                  <p>
                    Em conformidade ao art. 48 da Lei nº 13.709, a Controladora
                    comunicará ao Titular e à Autoridade Nacional de Proteção de
                    Dados (ANPD) a ocorrência de incidente de segurança que
                    possa acarretar risco ou dano relevante ao Titular.
                  </p>
                  <br />
                  <h4>TÉRMINO DO TRATAMENTO DOS DADOS</h4>
                  <p>
                    A Controladora poderá manter e tratar os dados pessoais do
                    Titular durante todo o período em que os mesmos forem
                    pertinentes ao alcance das finalidades listadas neste termo.
                    Dados pessoais anonimizados, sem possibilidade de associação
                    ao indivíduo, poderão ser mantidos por período indefinido.
                  </p>
                  <p>
                    O Titular poderá solicitar via e-mail ou correspondência a
                    Controladora, a qualquer momento, que sejam eliminados os
                    dados pessoais não anonimizados do Titular. O Titular fica
                    ciente de que poderá ser inviável a Controladora continuar o
                    fornecimento de produtos ou serviços ao Titular a partir da
                    eliminação dos dados pessoais.
                  </p>
                  <br />
                  <h4>DIREITOS DO TITULAR</h4>
                  <p>
                    O Titular tem direito a obter da Controladora, em relação
                    aos dados por ele tratados, a qualquer momento e mediante
                    requisição:{" "}
                  </p>
                  <ol>
                    <li>Confirmação da existência de tratamento;</li>
                    <li>Acesso aos dados;</li>
                    <li>
                      Correção de dados incompletos, inexatos ou desatualizados;
                    </li>
                    <li>
                      Anonimização, bloqueio ou eliminação de dados
                      desnecessários, excessivos ou tratados em desconformidade
                      com o disposto na Lei nº 13.709;
                    </li>
                    <li>
                      Portabilidade dos dados a outro fornecedor de serviço ou
                      produto, mediante requisição expressa e observados os
                      segredos comercial e industrial, de acordo com a
                      regulamentação do órgão controlador;
                    </li>
                    <li>
                      Portabilidade dos dados a outro fornecedor de serviço ou
                      produto, mediante requisição expressa, de acordo com a
                      regulamentação da autoridade nacional, observados os
                      segredos comercial e industrial;
                    </li>
                    <li>
                      Eliminação dos dados pessoais tratados com o consentimento
                      do titular, exceto nas hipóteses previstas no art. 16 da
                      Lei nº 13.709; VII – informação das entidades públicas e
                      privadas com as quais o controlador realizou uso
                      compartilhado de dados;
                    </li>
                    <li>
                      Informação sobre a possibilidade de não fornecer
                      consentimento e sobre as consequências da negativa;
                    </li>
                    <li>
                      Revogação do consentimento, nos termos do § 5º do art. 8º
                      da Lei nº 13.709.
                    </li>
                  </ol>
                  <br />
                  <h4>DIREITO DE REVOGAÇÃO DO CONSENTIMENTO</h4>
                  <p>
                    Este consentimento poderá ser revogado pelo Titular, a
                    qualquer momento, mediante solicitação via e-mail ou
                    correspondência a Controladora.
                  </p>
                  <p>
                    Para entrar em contato com a Controladora para todas
                    solicitações acima, envie um e-mail para
                    granasolidaria@gmail.com
                  </p>

                  <br />
                  <h4>DO ACEITE</h4>
                  <p>
                    Estou de acordo com o uso dos meus dados conforme regras
                    acima. Tenho ciência de que o Controlador possui regras para
                    garantir a privacidade, a proteção dos dados pessoais e a
                    segurança das informações e que a coleta, classificação,
                    uso, processamento, armazenamento e eliminação dos dados
                    pessoais são tratados com a máxima cautela.
                  </p>
                  <p>
                    Estou ciente de que o site <strong>GRANA SOLIDÁRIA</strong>,
                    de titularidade da empresa (insira a razão social ou nome da
                    empresa), CNPJ nº (insira o CNPJ), com sede na (insira o
                    endereço completo com cidade e estado), telefone (insira o
                    telefone), e-mail (clique aqui e insira o e-mail de contato
                    da empresa) adota medidas técnicas e administrativas de
                    segurança da informação, que lhes permitam proteger os dados
                    pessoais de acesso por quem não é autorizado e que são
                    mantidos padrões de segurança e integridade dos dados
                    armazenados, com backups das informações, em ambiente físico
                    e eletrônico fora de suas dependências internas.
                  </p>

                  <p>
                    Declaro serem verdadeiras todas as informações contidas
                    neste cadastro e responsabilizo-me plenamente pelo seu teor.
                  </p>
                  <p>Atualizado em 08/03/2021</p>

                  <div className="input-checkbox">
                    <input
                      type="checkbox"
                      onClick={() => {
                        if (accept) {
                          setAccept(false);
                        } else {
                          setAccept(true);
                        }
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.o1}
                      id="o1"
                      checked={accept ? true : false}
                    ></input>
                    <h6>
                      {" "}
                      Li e dou o meu consentimento ao <br /> Termo de
                      consentimento do usuário
                    </h6>
                  </div>
                </div>
              </div>
              <div class="alignButton">
                <button disabled={values.o1 ? false : true}>Prosseguir</button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
