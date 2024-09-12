import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

interface Transacao {
    id: number;
    data: string;
    descricao: string;
    categoria: string;
    valor: number;
    tipo: string;
}

interface Banco {
    id: string; 
    nome: string;
    saldo: number;
    transacoes: Transacao[];
}

interface PlanoDeContas {
    id: string;
    nome: string;
    categoria: string;
    faixa: string;
}

export function NovaTransacaoForm() {
    const [bancos, setBancos] = useState<Banco[]>([]);
    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoriaId, setCategoriaId] = useState<string | null>(null);
    const [valor, setValor] = useState<number>(0);
    const [tipo, setTipo] = useState('');
    const [bancoId, setBancoId] = useState<string | null>(null);
    const [planoDeContas, setPlanoDeContas] = useState<PlanoDeContas[]>([]);

    const navigate = useNavigate();

    // Carregar os bancos ao montar o componente
    useEffect(() => {
        axios.get('http://localhost:3000/bancos')
            .then(response => {
                console.log('Bancos carregados:', response.data);
                setBancos(response.data); // Salvar os dados de bancos
            })
            .catch(error => {
                console.error('Erro ao buscar os bancos:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/planoDeContas')
            .then(response => {
                console.log('Plano de Contas carregado:', response.data);
                setPlanoDeContas(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar o plano de contas:', error);
            });
    }, []);

    // Função para retornar à página de transações
    const returnTransacao = () => {
        navigate('/transactions');
    };

    // Função para salvar uma nova transação
    const saveTransacao = async (e: React.FormEvent) => {
        e.preventDefault();

        if (bancoId === null || categoriaId === null) {
            console.error('Banco ou categoria não selecionados');
            return;
        }

        const categoriaSelecionada = planoDeContas.find(p => p.id === categoriaId)?.nome;
        console.log('Categoria ID selecionada:', categoriaId);
        console.log('Categoria selecionada:', categoriaSelecionada);
        console.log('Plano de Contas:', planoDeContas);

        if (!categoriaSelecionada) {
            console.error('Categoria não encontrada');
            return;
        }

        const novaTransacao: Transacao = {
            id: Date.now(), // Gerando ID temporário
            data,
            descricao,
            categoria: categoriaSelecionada,
            valor,
            tipo
        };

        try {
            console.log('Banco ID selecionado:', bancoId); // Adicione este log
            console.log('Lista de Bancos:', bancos); // Adicione este log
            const banco = bancos.find(b => b.id === bancoId);
            console.log('Banco encontrado:', banco); // Adicione este log

            if (banco) {
                if (novaTransacao.tipo === 'entrada') {
                    banco.saldo += novaTransacao.valor;
                } else if (novaTransacao.tipo === 'saida') {
                    banco.saldo -= novaTransacao.valor;
                }

                // Adicionando a nova transação ao array de transações do banco
                banco.transacoes.push(novaTransacao);

                // Atualizando o banco no servidor
                await axios.put(`http://localhost:3000/bancos/${bancoId}`, banco);

                console.log('Banco atualizado com nova transação:', banco);

                // Limpar os campos do formulário após salvar
                setData('');
                setDescricao('');
                setCategoriaId(null);
                setValor(0);
                setTipo('');
                setBancoId(null);

                // Navegar de volta para a página de transações
                navigate('/transactions');
            } else {
                console.error('Banco não encontrado');
            }
        } catch (error) {
            console.error('Erro ao salvar a transação:', error);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg w-full lg:w-[175vh]">
            <form onSubmit={saveTransacao}>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col w-min">
                        <label htmlFor="data">Data</label>
                        <input
                            type="date"
                            id="data"
                            className="w-full border p-2 rounded-lg mb-4"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="descricao">Descrição</label>
                        <input
                            type="text"
                            id="descricao"
                            className="w-full border p-2 rounded-lg mb-4"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="categoria">Categoria</label>
                        <select
                            id="categoria"
                            className="w-full border p-2 rounded-lg mb-4"
                            value={categoriaId ?? ""}
                            onChange={(e) => setCategoriaId(e.target.value ? e.target.value : null)}
                        >
                            <option value="" disabled>Selecione uma Categoria</option>
                            {planoDeContas.map(plano => (
                                <option key={plano.id} value={plano.id}>
                                    {plano.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="lg:flex lg:flex-row lg:gap-8">
                        <div>
                            <label htmlFor="valor">Valor</label>
                            <input
                                type="number"
                                id="valor"
                                className="w-full border p-2 rounded-lg mb-4"
                                value={valor}
                                onChange={(e) => setValor(parseFloat(e.target.value))}
                            />
                        </div>
                        <div>
                            <label htmlFor="tipo">Tipo</label>
                            <select
                                id="tipo"
                                className="w-full border p-2 rounded-lg mb-4"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <option value="" disabled>Selecione o tipo</option>
                                <option value="entrada">Entrada</option>
                                <option value="saida">Saída</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="banco">Banco</label>
                            <select
                                id="banco"
                                className="w-full border p-2 rounded-lg mb-4"
                                value={bancoId ?? ""}
                                onChange={(e) => setBancoId(e.target.value ? e.target.value : null)}
                            >
                                <option value="" disabled>Selecione um banco</option>
                                {bancos.map(banco => (
                                    <option key={banco.id} value={banco.id}>
                                        {banco.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row gap-8">
                        <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">Salvar</button>
                        <button type="button" onClick={returnTransacao} className="bg-red-500 text-white p-2 rounded-lg">Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
