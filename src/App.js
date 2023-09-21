import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home/home";
import SupporterRegister from "./pages/supporter-register/supporter-register";
import DreamerRegister from "./pages/cnpj-entrepreneur-register/cnpj-entrepreneur-register";
import CnpjEntrepreneurRegister from "./pages/cnpj-entrepreneur-register/cnpj-entrepreneur-register";
import ConfirmEmail from "./pages/confirm-email/confirm-email";
import RegisterSuccess from "./pages/register-success/register-success";
import Quiz from "./pages/quiz/quiz";
import DreamsPage from "./pages/dreams-page/dreams-page";
import SingleDream from "./pages/single-dream/single-dream";
import SingleDreamDreamer from "./pages/single-dream-dreamer/single-dream-dreamer";
import SupportDream from "./pages/support-dream/support-dream";
import HowItWorks from "./pages/how-it-works/how-it-works";
import InAnalysis from "./pages/in-analysis/in-analysis";
import Agreement from "./pages/agreement/agreement";
import Terms from "./pages/terms-of-use/terms-of-use"
import Politics from "./pages/politics/politics"
import "./App.css";
import TokenContext from "./componentes/token/token";
import RecoverPassword from "./pages/recover-password/recover-password";
import InsertPassword from "./pages/insert-password/insert-password";

function App() {
  const data = {
    token: null,
  };

  //const PUBLIC_URL = process.env.PUBLIC_URL;
  const PUBLIC_URL = 'https://grana-solidaria-server-dev.azurewebsites.net';

  return (
    <BrowserRouter>
      <TokenContext.Provider value={data}>
        <div className="App">
          <Switch>
            <Route exact path={`${PUBLIC_URL}/`} component={Home} />
            <Route
              path={`${PUBLIC_URL}/registro-apoiador`}
              component={SupporterRegister}
            />
            {/* <Route
              path={`${PUBLIC_URL}/dreamer-get`}
              component={DreamerGet}
            /> */}
            <Route
              path={`${PUBLIC_URL}/conferir-email`}
              component={ConfirmEmail}
            />
            <Route
              path={`${PUBLIC_URL}/cadastro-sucesso/:token`}
              component={RegisterSuccess}
            />
            {/* <Route
              path={`${PUBLIC_URL}/registro-sonhador`}
              component={DreamerRegister}
            /> */}
            <Route
              path={`${PUBLIC_URL}/registro-sonhador`}
              component={DreamerRegister}
            />
            <Route
              path={`${PUBLIC_URL}/registro-empreendedor-cnpj`}
              component={CnpjEntrepreneurRegister}
            />
            <Route path={`${PUBLIC_URL}/questionario`} component={Quiz} />
            <Route
              path={`${PUBLIC_URL}/pagina-de-sonhos`}
              component={DreamsPage}
            />
            <Route
              path={`${PUBLIC_URL}/sonho-individual/:id`}
              component={SingleDream}
            />
            <Route
              path={`${PUBLIC_URL}/sonho-individual-sonhador/:id`}
              component={SingleDreamDreamer}
            />
            <Route
              path={`${PUBLIC_URL}/apoiar-sonho/:id`}
              component={SupportDream}
            />
            <Route
              path={`${PUBLIC_URL}/como-funciona`}
              component={HowItWorks}
            />
            <Route path={`${PUBLIC_URL}/em-analise`} component={InAnalysis} />
            <Route path={`${PUBLIC_URL}/acordo`} component={Agreement} />
			<Route
              path={`${PUBLIC_URL}/termos-de-uso`}
              component={Terms}
            />
				<Route
              path={`${PUBLIC_URL}/politica-de-privacidade`}
              component={Politics}
            />
            <Route
              path={`${PUBLIC_URL}/recuperar-senha`}
              component={RecoverPassword}
            />
            <Route
              path={`${PUBLIC_URL}/nova-senha/:token`}
              component={InsertPassword}
            />
          </Switch>
        </div>
      </TokenContext.Provider>
    </BrowserRouter>
  );
}

export default App;
