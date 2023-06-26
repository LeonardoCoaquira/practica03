import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">MODULOS</div>
            <Link className="nav-link collapsed" to="/vehiculo-gasto">
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Gastos del Vehiculo
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angles-down"></i>
              </div>
            </Link>
            <Link className="nav-link collapsed" to="/tipo-gasto">
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Tipos de Gastos
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Link>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          Start Bootstrap
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
