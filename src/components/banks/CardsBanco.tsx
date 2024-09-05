import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface CardsBancoProps {
    onSelectBanco: (index: number) => void;
}

export function CardsBanco({ onSelectBanco }: CardsBancoProps) {
    // Estado para armazenar o banco selecionado
    const [bancoSelecionado, setBancoSelecionado] = useState<number | null>(null);

    // Array de testes de bancos cadastrados
    const bancosTeste = [
        { nome: 'Caixinha', saldo: 1500.50 },
        { nome: 'Nubank', saldo: 3200.00 },
    ];

    // Função para lidar com a seleção do banco
    const selecionarBanco = (index: number) => {
        setBancoSelecionado(index);
        onSelectBanco(index); // Chama a função passada via props
    };

    return (
        <div className="flex flex-wrap gap-4">
            {bancosTeste.length > 0 &&
                bancosTeste.map((banco, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-lg shadow-xl w-full lg:w-64 cursor-pointer 
                        ${bancoSelecionado === index ? 'bg-orange-100 border-2 border-orange-500' : 'bg-white'}`}
                        onClick={() => selecionarBanco(index)}
                    >
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-bold">{banco.nome}</h2>
                            <div className="border-t border-gray-400"></div>
                            <p>Saldo: R$ {banco.saldo.toFixed(2)}</p>
                        </div>
                    </div>
                ))
            }

            {/* Card vazio para adicionar um novo banco */}
            <Link
                to={'/banks/new-bank'}
                className="p-6 rounded-lg bg-white shadow-xl w-full lg:w-1/6 flex justify-center items-center cursor-pointer hover:bg-gray-200"
            >
                <FontAwesomeIcon icon={faCirclePlus} className="text-orange-500 text-4xl" />
            </Link>
        </div>
    );
}
