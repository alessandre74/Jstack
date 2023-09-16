import { ComponentProps } from 'react'
import { Spinner } from './Spinner'
import { cn } from '../../app/utils/cn'

type ButtonProps = ComponentProps<'button'> & {
  isLoading?: boolean
}

export function Button({ className, isLoading, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 px-6 h-12 rounded-2xl  font-medium text-white transition-all flex justify-center items-center',
        className
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  )
}
