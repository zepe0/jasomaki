import "./Nav.css";

function Nav() {
  return (
    <>
      <ul className="Nav">
        <li className="itemnav">
          <a href="/ins">
            <img
              src="../public/icons/ins.png"
              className="img_menu"
              alt="img_menu"
            />
          </a>
        </li>
        <li className="itemnav">
          <a href="">
            <img
              src="../public/icons/mask.png"
              className="img_menu"
              alt="img_menu"
            />
          </a>
        </li>
        <li className="itemnav">
          <a href="">
            <img
              src="../public/icons/tarjeta.png"
              className="img_menu"
              alt="img_menu"
            />
          </a>
        </li>
        <li className="itemnav">
          <a href="">
            <img
              src="../public/icons/avatarDefault.png"
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
