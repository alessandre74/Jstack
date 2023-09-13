import { Outlet } from 'react-router-dom'
import illustration from '../../assets/illustration.png'
import { Logo } from '../components/Logo'

export function AuthLayout() {
  return (
    <div className="flex w-full h-full ">
      <div className="w-full h-full flex justify-center items-center flex-col gap-16 min-[1460px]:w-1/2 min-[1460px]: transition-all">
        <Logo className="h-6 text-gray-500" />

        <div className="w-full max-w-[504px] px-8 ">
          <Outlet />
        </div>
      </div>

      <div className="w-1/2 h-full  justify-center items-center hidden min-[1460px]:flex min-[1460px]: transition-all">
        <div>
          <img
            src={illustration}
            className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
          />

          <div className="max-w-[656px] bg-white absolute -mt-48 p-10 rounded-b-[32px] ">
            <Logo className="text-teal-900 h-8" />
            <p className="text-gray-700 font-medium text-xl mt-6">
              Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor,
              totalmente de graça!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
