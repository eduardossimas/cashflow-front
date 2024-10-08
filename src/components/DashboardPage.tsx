import { InputsOutputs } from './dashboards/InputsOutputs'
import { Resume } from './dashboards/Resume'
import { Title } from './Title'
import { Welcome } from './dashboards/Welcome'
import { Cashflow } from './dashboards/Cashflow'
import { ExpenseCategory } from './dashboards/ExpenseCategory'

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

      <div className='xl:h-[90vh]'>
        <div className='lg:flex lg:flex-col lg:gap-4 lg:mt-2 lg:mb-4 hidden'>
          <Welcome />
          <Title title='Visão Geral' />
        </div>
        <div className='lg:grid lg:grid-cols-12 lg:gap-4 hidden'>
          <div className="lg:col-span-8 lg:row-span-2 flex flex-col space-y-4">
            <InputsOutputs />
            <Cashflow />
          </div>
          <div className="lg:col-span-4 lg:row-span-2 flex flex-col space-y-4">
            <Resume />
            <ExpenseCategory />
          </div>
        </div>
      </div>
    </div>
  )
}