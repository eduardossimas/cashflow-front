import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export function BotaoPlanoDeContas() {
    return (
        <Link to={"/settings/new-plan"} className='bg-orange-500 text-white p-2 rounded-lg focus:outline-none hover:bg-orange-600 flex flex-row items-center lg:w-max'>
            <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
            <p>Novo Plano</p>
        </Link>
    )
}