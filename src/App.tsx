import { InputsOutputs } from './components/InputsOutputs'
import { Header } from './components/Header'
import { Resume } from './components/Resume'
import { Title } from './components/Title'
import { Welcome } from './components/Welcome'
import { Cashflow } from './components/Cashflow'


export function App() {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='p-4 md:p-8'>
        <div className='lg:flex'>
          <Header />
          <div>
            <Welcome />
            <Title title='Visão Geral' />
            <div className='lg:hidden'>
              <Resume />
              <InputsOutputs />
              <Cashflow />
            </div>

            <div className="lg:grid lg:grid-cols-5 lg:gap-4 hidden">
              <div className="lg:col-span-3 flex flex-col space-y-4">
                <InputsOutputs />
                <Cashflow />
              </div>
              <div className="lg:col-span-2">
                <Resume />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}