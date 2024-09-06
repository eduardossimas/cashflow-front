import { BotaoCategoria } from "./BotaoCategoria";
import { ListaCategorias } from "./ListaCategorias";

export function Categorias() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-xl lg:w-1/2">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Categorias</h2>
                <ListaCategorias />
                <BotaoCategoria />
            </div>
        </div>
    )
}