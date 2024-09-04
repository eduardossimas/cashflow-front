import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export function NovaTransacaoBotao() {
    return (
        <div>
            <Link to={"/transactions/new-transaction"} className='bg-orange-500 text-white p-2 rounded-lg focus:outline-none hover:bg-orange-600'>
                <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
                Nova Transação
            </Link>
        </div>
    )
}