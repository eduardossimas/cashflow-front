import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export function BotaoCategoria() {
    return (
        <Link to={"/settings/new-category"} className='bg-orange-500 text-white p-2 rounded-lg focus:outline-none hover:bg-orange-600 flex flex-row items-center lg:w-max'>
            <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
            <p>Nova Categoria</p>
        </Link>
    )
}