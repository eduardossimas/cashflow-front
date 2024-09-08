import { Title } from "../Title";
import { NovaCategoriaForm } from "./NovaCategoriaForm";

export function NovaCategoriaPag() {
    return (
        <div>
            <div className="mt-4 flex flex-col gap-10">
                <Title title="Nova Categoria" />
                <strong className="text-2xl">Nova Categoria</strong>
                <NovaCategoriaForm />
            </div>
        </div>
    )
}