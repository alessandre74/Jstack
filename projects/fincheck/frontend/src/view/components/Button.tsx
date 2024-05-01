import { ComponentProps } from 'react'
import { cn } from '../../app/utils/cn'
import { Spinner } from './Spinner'

type ButtonProps = ComponentProps<'button'> & {
  isLoading?: boolean
  danger?: boolean
}

export function Button({
  className,
  isLoading,
  disabled,
  children,
  danger,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 px-6 h-12 rounded-2xl  font-medium text-white transition-all flex justify-center items-center',
        danger && 'bg-red-900 hover:bg-red-800',
        className,
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  )
}
