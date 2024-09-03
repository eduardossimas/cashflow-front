import { InputsOutputs } from './InputsOutputs'
import { Resume } from './Resume'
import { Title } from './Title'
import { Welcome } from './Welcome'
import { Cashflow } from './Cashflow'
import { ExpenseCategory } from './ExpenseCategory'

export function DashboardPage() {
  return (
    <div>
      <div className='lg:hidden'>
        <div className='flex flex-col gap-4 mt-4'>
          <Welcome />
          <Title title='Visão Geral' />
          <Resume />
          <InputsOutputs />
          <Cashflow />
          <ExpenseCategory />
        </div>
      </div>

      <div>
        <div className='lg:flex lg:flex-col lg:gap-4 lg:mt-2 lg:mb-4 hidden'>
          <Welcome />
          <Title title='Visão Geral' />
        </div>
        <div className='lg:grid lg:grid-cols-10 lg:gap-4 hidden'>
          <div className="lg:col-span-7 lg:row-span-2 flex flex-col space-y-4">
            <InputsOutputs />
            <Cashflow />
          </div>
          <div className="lg:col-span-3 lg:row-span-2 flex flex-col space-y-4">
            <Resume />
            <ExpenseCategory />
          </div>
        </div>
      </div>
    </div>
  )
}