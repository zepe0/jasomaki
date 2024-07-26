import "./Nav.css";

function Nav() {
  return (
    <>
      <ul className="Nav">
        <li className="itemnav">
          <a href="/ins">
            <img
              src="../src/icons/ins.png"
              className="img_menu"
              alt="img_menu"
            />
          </a>
        </li>
        <li className="itemnav">
          <a href="/traje">
            <img
              src="../src/icons/mask.png"
              className="img_menu"
              alt="img_menu"
            />
          </a>
        </li>
        <li className="itemnav">
          <a href="/pagos">
            <img
              src="../src/icons/tarjeta.png"
              className="img_menu"
              alt="img_menu"
            />
          </a>
        </li>
        <li className="itemnav">
          <a href="/Perfil">
            <img
              src="../src/icons/avatarDefault.png"
              className="img_menu"
              alt="img_menu"
            />
          </a>
        </li>
      </ul>
    </>
  );
}

export default Nav;
