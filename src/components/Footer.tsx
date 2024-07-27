import CashFlowPro from '../assets/CashFlowPro.svg';

export function Footer() {
    return (
        <footer className='flex-grow mt-4 bg-white pt-6 pb-11 pr-10 pl-10 h-full'>
            <div className='lg:grid lg:grid-cols-2'>
                <div className='lg:col-span-1 flex flex-col'>
                    <img src={CashFlowPro} alt="CashFlowPro" className="w-44 h-9 mb-7" />
                    <p>Cuidando da sua empresa</p>
                    <p>com nosso sistema de finanças</p>
                    <p>Simplificando a Complexidade, Maximizando a Eficiência.</p>
                </div>
                <div className='lg:col-span-1'>
                    <div className='flex gap-10 justify-end'>
                        <a href="#">Dashboard</a>
                        <a href="#">Transações</a>
                        <a href="#">Bancos</a>
                        <a href="#">Relatórios</a>
                    </div>
                </div>
            </div>
            <div className='border mt-4 mb-9'></div>
            <div className='flex justify-center'>
                <p>© 2024 Universidade Federal de Juiz de Fora</p>
            </div>
        </footer>
    );
}