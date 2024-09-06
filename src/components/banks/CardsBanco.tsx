import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface CardsBancoProps {
    onSelectBanco: (id: number) => void;
}

interface Banco {
    id: number;
    nome: string;
    saldo: number;
}

export function CardsBanco({ onSelectBanco }: CardsBancoProps) {
    // Estado para armazenar o banco selecionado
    const [bancoSelecionado, setBancoSelecionado] = useState<number | null>(null);

    // Estado para armazenar os bancos carregados da API
    const [bancos, setBancos] = useState<Banco[]>([]);

    // Função para buscar os bancos da API
    useEffect(() => {
        axios.get('http://localhost:3000/bancos') // URL do json-server ou API back-end
            .then(response => {
                setBancos(response.data); // Salva os dados no estado
            })
            .catch(error => {
                console.error('Erro ao buscar os bancos:', error);
            });
    }, []);

    // Função para lidar com a seleção do banco
    const selecionarBanco = (index: number) => {
        setBancoSelecionado(index);
        onSelectBanco(index); // Chama a função passada via props
    };



    return (
        <div className="flex flex-wrap gap-4">
            {bancos.length > 0 &&
                bancos.map((banco, index) => (
                    <div
                        key={banco.id}
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
