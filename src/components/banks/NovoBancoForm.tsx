import { useNavigate } from "react-router-dom"

export function NovoBancoForm() {
    const navigate = useNavigate()
    const returnBanco = () => {
        navigate('/banks')
    }

    const saveBanco = () => {
        navigate('/banks')
        //MUDAR PARA SALVAR NO BANCO DE DADOS, DEIXEI ASSIM PRA TESTAR A NAVEGAÇÃO
    }
    
    return (
        <div className="p-4 bg-white rounded-lg shadow-lg w-full lg:w-[175vh]">
            <form action="">
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="">Nome do Banco</label>
                        <input type="text" className="w-full border p-2 rounded-lg mb-4" />
                    </div>
                    <div className="lg:flex lg:flex-row lg:gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="">Data de Início</label>
                            <input type="date" className="w-full border p-2 rounded-lg mb-4" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Saldo Inicial</label>
                            <input type="number" className="w-full border p-2 rounded-lg mb-4" />
                        </div>
                    </div>
                    <div className="lg:flex lg:flex-row lg:gap-4">
                        <button onClick={saveBanco} className="bg-green-500 text-white p-2 rounded-lg w-1/6">Salvar</button>
                        <button onClick={returnBanco} className="bg-red-500 text-white p-2 rounded-lg w-1/6">Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}