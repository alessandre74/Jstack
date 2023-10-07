import { Swiper, SwiperSlide } from 'swiper/react'

import { AccountCard } from './AccountCard'
import { SliderNavigation } from './SliderNavigation'
import { useAccountController } from './useAccountController'
import { EyeIcon } from '../../../../components/icons/EyeIcon'

import 'swiper/css'

export function Accounts() {
  const { sliderState, setSlideState, windowWidth } = useAccountController()

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      <div className="">
        <span className="tracking-[-0.5px] text-white block">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">R$ 1000,00</strong>

          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={windowWidth >= 500 ? 2.1 : 1.1}
            onSlideChange={(swiper) => {
              setSlideState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd
              })
            }}
          >
            <div className="flex items-center justify-between mb-4" slot="container-start">
              <strong className="text-white tracking-[-1px] text-lg font-bold">
                Minhas contas
              </strong>

              <SliderNavigation isBeginning={sliderState.isBeginning} isEnd={sliderState.isEnd} />
            </div>

            <SwiperSlide>
              <AccountCard color="#7950F2" name="Nubank" balance={1000.23} type="CASH" />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard color="#333" name="XP" balance={1000.23} type="INVESTMENT" />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard color="#0F0" name="Carteira" balance={1000.23} type="CASH" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  )
}
