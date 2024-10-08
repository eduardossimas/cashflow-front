import CashFlowPro from '../assets/CashFlowPro.svg';

export function Footer() {
    return (
        <footer className='flex-shrink-0 mt-4 bg-white pt-6 pb-11 pr-10 pl-10'>
            <div className='lg:grid lg:grid-cols-2'>
                <div className='lg:col-span-1 flex flex-col'>
                    <img src={CashFlowPro} alt="CashFlowPro" className="w-44 h-9 mb-7" />
                    <p>Cuidando da sua empresa</p>
                    <p>com nosso sistema de finanças</p>
                    <p>Simplificando a Complexidade, Maximizando a Eficiência.</p>
                </div>
                <div className='lg:col-span-1'>
                    <div className='flex flex-col gap-10 justify-end mt-8 lg:flex-row'>
                        <a href="#">Dashboard</a>
                        <a href="#">Transações</a>
                        <a href="#">Bancos</a>
                        <a href="#">Relatórios</a>
                    </div>
                </div>
            </div>
            <div className='border mt-4 mb-9'></div>
            <div className='flex justify-center'>
                <p className='text-center'>© 2024 Universidade Federal de Juiz de Fora</p>
            </div>
        </footer>
    );
}