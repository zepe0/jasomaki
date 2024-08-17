import "./Todo.css";
import { PiPantsThin } from "react-icons/pi";
import { GiSkirt } from "react-icons/gi";
import { FaVest } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { GiTiara } from "react-icons/gi";

function Todo() {

  return (
    <section>
      <button>
        <GiTiara className="prenda" />
      </button>
      <div>
        <button>
          <FaVest className="prenda" />
        </button>
        <button>
          <FaTshirt className="prenda" />
        </button>
        <button>
          <img
            className="img"
            src="../../src/img/body2.png
          "
          />
        </button>
      </div>
      <button>
        <PiPantsThin className="prenda" />
      </button>
      <button>
        <GiSkirt className="prenda" />
      </button>
     
    </section>
  );
}

export default Todo;
