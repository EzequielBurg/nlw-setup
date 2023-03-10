import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import { Checkbox } from "./Checkbox";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if (!title || !weekDays.length) return

    api.post('/habits', {
      title,
      weekDays
    }).then(() => {
      alert('Hábito criado com sucesso!')
      setTitle('')
      setWeekDays([])
    })
  }

  function handleToggleWeekDays(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays(prev => prev.filter(item => item !== weekDay))
    } else {
      setWeekDays(prev => [...prev, weekDay])
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        id="title"
        type="text"
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
        placeholder="Ex.: exercícios, dormir bem, etc . . ."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            label={weekDay}
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDays(index)}
          />
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
