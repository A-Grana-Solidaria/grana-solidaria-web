import "./pagination.css";
import React from "react";
import ArrowRight from "../../assets/arrow-right.png";
import ArrowLeft from "../../assets/arrow-right.png";

export default function Pagination(props) {
  const { totalPaginas, setPaginaAtual, paginaAtual } = props;

  const pages = [];
  const montarPaginas = (total) => {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  };

  montarPaginas(totalPaginas);

  return totalPaginas ? (
    <div className="Pagination">
      <div className="pagination-container">
        {pages.map((page) => {
          return (
			<>
			{totalPaginas > 2 && paginaAtual !== 1 ? (
			  <span>
				<img
				  src={ArrowLeft}
				  alt="arrow for changing page"
				  onClick={() => {
					if (totalPaginas !== paginaAtual) {
					  setPaginaAtual(paginaAtual + 1);
					}
				  }}
				/>
			  </span>
			) : (
			  ""
			)}
			<span
			  className={paginaAtual === page ? "current" : ""}
			  onClick={() => {
				setPaginaAtual(page);
			  }}
			>
			  {page}
			</span>
		  </>
          );
        })}
        <span>
          <img
            src={ArrowRight}
            alt="arrow for changing page"
            onClick={() => {
              setPaginaAtual(paginaAtual + 1);
            }}
          />
        </span>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
