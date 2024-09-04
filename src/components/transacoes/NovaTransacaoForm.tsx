import { useNavigate } from "react-router-dom"

export function NovaTransacaoForm() {
    const navigate = useNavigate()
    const returnTransacao = () => {
        navigate('/transactions')
    }

    const saveTransacao = () => {
        navigate('/transactions')
        //MUDAR PARA SALVAR NO BANCO DE DADOS, DEIXEI ASSIM PRA TESTAR A NAVEGAÇÃO
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg w-full lg:w-[175vh]">
            <form action="">
                <div className="flex flex-col gap-3">
                    <div className="lg:flex lg:flex-row lg:gap-8">
                        <div className="flex flex-col">
                            <label htmlFor="">Data</label>
                            <input type="date" className="w-full border p-2 rounded-lg mb-4" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Data do Vencimento</label>
                            <input type="date" className="w-full border p-2 rounded-lg mb-4" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Descrição</label>
                        <input type="text" className="w-full border p-2 rounded-lg mb-4" />
                    </div>
                    <div>
                        <label htmlFor="">Categoria</label>
                        <select name="" id="" className="w-full border p-2 rounded-lg mb-4">
                            <option value="1">Categoria 1</option>
                            <option value="2">Categoria 2</option>
                            <option value="3">Categoria 3</option>
                        </select>
                    </div>
                    <div className="lg:flex lg:flex-row lg:gap-8">
                        <div>
                            <label htmlFor="">Valor</label>
                            <input type="number" className="w-full border p-2 rounded-lg mb-4" />
                        </div>
                        <div>
                            <label htmlFor="">Tipo</label>
                            <select name="" id="" className="w-full border p-2 rounded-lg mb-4">
                                <option value="entrada">Entrada</option>
                                <option value="saida">Saída</option>
                                <option value="transferencia">Transferência</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="">Banco</label>
                            <select name="" id="" className="w-full border p-2 rounded-lg mb-4">
                                <option value="1">Banco 1</option>
                                <option value="2">Banco 2</option>
                                <option value="3">Banco 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row gap-8">
                        <button onClick={saveTransacao} className="bg-green-500 text-white p-2 rounded-lg">Salvar</button>
                        <button onClick={returnTransacao} className="bg-red-500 text-white p-2 rounded-lg">Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}