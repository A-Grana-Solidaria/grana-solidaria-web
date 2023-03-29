import "./dreams-page.css";
import React, { useContext } from "react";
import DreamCard from "../../componentes/dream-card/dream-card";
import Footer from "../../componentes/footer/footer";
import Header from "../../componentes/header/header";
import Pagination from "../../componentes/pagination/pagination";
import TokenContext from "../../componentes/token/token";
import API from "../../utils/fetch";

export default function DreamsPage() {
  const [dreams, setDreams] = React.useState([]);
  const [paginaAtual, setPaginaAtual] = React.useState(1);
  const [totalPaginas, setTotalPaginas] = React.useState(0);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    setOffset(paginaAtual * 5 - 5);
    const getDreams = async () => {
      const response = await API.dreams(paginaAtual * 5 - 5);
      const data = response.data;
      setTotalPaginas(data.dados.totalDePaginas);
      setPaginaAtual(data.dados.paginaAtual);
      setDreams(data.dados.sonhos);
    };
    getDreams();
  }, [paginaAtual]);
  return dreams ? (
    <div className="DreamsPage">
      <Header h1="Sonhos" h2="página dos" arrow="false" menu="true" />

      <div className="dreams-content">
        {dreams.map((dream) => {
          return <DreamCard dream={dream} />;
        })}

        <Pagination
          totalPaginas={totalPaginas}
          paginaAtual={paginaAtual}
          setPaginaAtual={setPaginaAtual}
        />
      </div>
      <Footer />
    </div>
  ) : (<div></div>)
}
