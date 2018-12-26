import React, { Component } from "react";

class RowData extends Component {
  render() {
    const data = this.props.data;
    const isInBook = (
      data.book1 !== "Não" || data.book2 !== "Não" || data.book3 !== "Não" || data.book4 !== "Não" || data.book5 !== "Não");
    return (
      <div className="card mt-4">
        <div className="row">
          <div className="col-12 rowDataTitle">
            <h4 className="d-inline font-weight-bold">{data.name}</h4>
            {data.title && <h4 className="d-inline">,{" "}{data.title},{" "}</h4>}
            {data.house && 
              <h4 className="d-inline">{" "}da {data.house}</h4>
            }
          </div>
        </div>
        <hr/>
        <div className="width-800">
          <div className="row">
            <div className="col-md-4">Sexo: {data.male}</div>
            <div className="col-md-4">Popularidade: {data.popularity.toFixed(2)}</div>
            <div className="col-md-4">Relacionado(a) com {data.numdeadrelations} mortes</div>
          </div>
          <div className="row pt-3">
            <div className="col-12">
              {isInBook && <p>Está presente nos livros:</p>}
              <ul>
                {data.book1 !== "Não" && <li className="pb-2">A Guerra dos Tronos</li>}
                {data.book2 !== "Não" && <li className="pb-2">A Fúria dos Reis</li>}
                {data.book3 !== "Não" && <li className="pb-2">A Tormenta de Espadas</li>}
                {data.book4 !== "Não" && <li className="pb-2">O Festim dos Corvos</li>}
                {data.book5 !== "Não" && <li className="pb-2">A Dança dos Dragões</li>}
              </ul>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-md-8">
            <p>
              Capacidade de Pagamento Anual: {data.capacidade_de_pagamento_anual}
            </p>
            </div>
            <div className="col-md-4">
              <p>Dívida: {data.dvida}</p>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-md-4">
              <p>Patrimônio: R$ {data.patrimnio}</p>
            </div>
            <div className="col-md-4">
              <p>Patrimônio do total: {(parseFloat(data.porcentagem.replace(',', '.')).toFixed(2))}%</p>
            </div>
            <div className="col-md-4">
              <p>Grupo na Curva ABC: {data.curva}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RowData;