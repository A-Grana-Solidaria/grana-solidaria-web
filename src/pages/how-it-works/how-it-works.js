import "./how-it-works.css";
import Header from "../../componentes/header/header";
import Footer from "../../componentes/footer/footer";

export default function HowItWorks() {
  return (
    <div className="HowItWorks">
      <Header h1="Grana Solidária" h2="sobre a" menu="true" arrow="true" />

      <div className="about-content">
        <div className="container">
          <h2>Como funciona</h2>
          <p>
            O <strong>Sonhador</strong> nos conta qual empreendimento pessoal
            quer desenvolver ou melhorar. Uma pessoa que faz bolos, por exemplo,
            e quer fazer disso uma fonte de renda, pode encontrar aqui pessoas
            que desejam apoiar financeiramente o seu projeto, os chamados{" "}
            <strong>Apoiadores</strong>.
          </p>
          <p>
            O <strong>Apoiador</strong> escolhe quais projetos - ou sonhos -
            gostaria de ajudar a realizar e informa o valor que quer investir em
            cada um deles. A Grana Solidária incentiva que o{" "}
            <strong>Apoiador</strong> dilua o seu investimento em vários
            projetos para diminuir o risco e, também, possibilitar que se crie
            uma rede onde vários sonhos possam se concretizar.
          </p>
          <p>
            Quando a Grana Solidária encontra essa conexão, a sua rede de
            parceiros é acionada para materializar tudo. Um parceiro autorizado
            pelo Banco Central a fazer o empréstimo de pessoa para pessoa - de
            acordo com a Resolução do Banco Central 4.656 de 28/04/2018 que
            regula as SEP - Sociedades de Empréstimo entre Pessoas - efetua a
            transação financeira que faz chegar aos fornecedores o dinheiro
            necessário para realizar os sonhos. Enquanto outros parceiros
            capacitam os <strong>Sonhadores</strong> para empreender. Para
            colocar o seu pequeno negócio para rodar.
          </p>
          <p>
            Durante os cinco primeiros meses de sonho materializado, o{" "}
            <strong>Sonhador</strong>
            não paga nada aos <strong>Apoiadores</strong>. Esse é o período de
            carência necessário paagando aos <strong>Apoiadores</strong>.
            Durante todo o ciclo de 20 meses, nós da Grana Solidária monitoramos
            o andamento dos empreendimentos pessoais dos{" "}
            <strong>Sonhadores</strong>, mediante indicadores presentes no nosso
            sistema, atuando junto a eles em eventuais correções que ajudem na
            obtenção do sucesso dos sonhos.
          </p>
          <p>
            A cada pagamento, o <strong>Apoiador</strong> recebe de nosso
            parceiro financeiro o valor acrescido de juros pago pelos{" "}
            <strong>Sonhadores</strong>
            e, caso deseje, pode sinalizar que quer reinvestir em novos
            projetos.
          </p>
          <p>
            Já o <strong>Sonhador</strong>, ao final do ciclo de 20 meses, pode
            tornar-se também
            <strong>Apoiador</strong> ou novamente se inscrever como{" "}
            <strong>Sonhador</strong>
            para novos negócios ou a melhoria do seu empreendimento.
          </p>
          <h2>
            Informações essenciais para o <strong>Apoiador</strong>
          </h2>
          <p>
            Ao se tornar <strong>Apoiador</strong> de projetos pela Grana
            Solidária o investidor fica ciente de que não há garantia de
            pagamento por parte do <strong>Sonhador</strong>.
          </p>

          <p>
            Porém, para se tornar <strong>Sonhador</strong>, cada empreendedor
            tem seu crédito avaliado pela Neurotech e é também treinado pelos
            nossos parceiros para gerir o seu empreendimento que tem todo o
            ciclo acompanhado por nossa plataforma visando o sucesso do negócio
            e, com isso, o pagamento do dinheiro emprestado e do lucro sobre o
            valor investido.
          </p>

          <p>
            A cada parcela paga o dinheiro já torna-se disponível para saque via
            nosso parceiro bancári
          </p>

          <p>
            Não há cota mínima nem máxima de investimento por projeto. Cada
            sonho fica disponível por 2 meses para investimento e caso o valor
            necessário para o empreendimento não seja atingido ele retorna para
            o <strong>Apoiador</strong> sem correção.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
