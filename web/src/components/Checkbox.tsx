import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

interface CheckboxProps extends CheckboxRadix.CheckboxProps {
  textEffect?: boolean;
  label: string
}

export function Checkbox({ label, textEffect = false, ...rest }: CheckboxProps) {
  const textClassName = !textEffect ?
    'text-white leadind-tight' :
    'font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'

  return (
    <CheckboxRadix.Root {...rest} className='flex items-center gap-3 group focus:outline-none'>
      <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
        <CheckboxRadix.Indicator>
          <Check size={20} className="text-white" />
        </CheckboxRadix.Indicator>
      </div>

      <span className={textClassName}>
        {label}
      </span>
    </CheckboxRadix.Root>
  )
}
