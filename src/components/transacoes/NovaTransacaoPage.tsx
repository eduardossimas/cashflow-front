import { Title } from "../Title"
import { NovaTransacaoForm } from "./NovaTransacaoForm"

export function NovaTransacaoPage() {
    return (
        <div className="mt-4 flex flex-col gap-10">
            <Title title="Transações" />
            <strong className="text-2xl">Nova Transação</strong>
            <NovaTransacaoForm />
        </div>

    )
}