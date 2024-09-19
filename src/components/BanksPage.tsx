import { useState } from 'react';
import { CardsBanco } from "./banks/CardsBanco";
import { Title } from "./Title";
import { ListaTransacaoBanco } from "./banks/ListaTransacaoBanco";
import { CategoriaGastosBanco } from "./banks/CategoriaGastosBanco";

export function BanksPage() {
    // Estado para armazenar o índice do banco selecionado
    const [bancoSelecionado, setBancoSelecionado] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-4 mt-4">
            <Title title="Bancos" />
            <CardsBanco onSelectBanco={setBancoSelecionado} />
            <div className='flex flex-col gap-4 lg:grid lg:grid-cols-12'>
                {bancoSelecionado !== null && (
                    <div className="lg:col-span-8">
                        <ListaTransacaoBanco selectedBank={bancoSelecionado} />
                    </div>
                )}
                {bancoSelecionado !== null && (
                    <div className="lg:col-span-4">
                        <CategoriaGastosBanco selectedBank={bancoSelecionado} />
                    </div>
                )}
            </div>
        </div>
    );
}
