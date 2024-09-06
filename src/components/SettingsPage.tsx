import { Categorias } from "./options/Categorias";
import { FormUserSettings } from "./options/FormUserSettings";
import { PlanoDeContas } from "./options/PlanoDeContas";
import { Title } from "./Title";

export function SettingsPage() {
    return(
        <div className="flex flex-col gap-4 mt-4">
            <Title title="Configurações" />
            <FormUserSettings />
            <div className="flex flex-col lg:flex-row gap-4">
                <PlanoDeContas />
                <Categorias />
            </div>
        </div>
    )
}