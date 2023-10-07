import { useSwiper } from 'swiper/react'
import { cn } from '../../../../../app/utils/cn'

type SliderOptionProps = {
  month: string
  index: number
  isActive: boolean
}

export function SliderOption({ month, index, isActive }: SliderOptionProps) {
  const swiper = useSwiper()

  return (
    <button
      onClick={() => swiper.slideTo(index)}
      className={cn(
        'w-full rounded-full h-12 text-sm text-gray-800 tracking-[-0.5px] font-medium',
        isActive && 'bg-white'
      )}
    >
      {month}
    </button>
  )
}
