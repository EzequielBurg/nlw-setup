import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"

export function SumaryTable() {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const sumaryDates = generateDatesFromYearBeginning()

  const minimumSumaryDatesSize = 18 * 7 // 18 weeks

  const amountOfDaysToFill = minimumSumaryDatesSize - sumaryDates.length

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => (
          <div
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {sumaryDates.map(sumaryDate => (
          <HabitDay key={sumaryDate.toString()} />
        ))}

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => (
          <HabitDay key={index} disabled />
        ))}
      </div>
    </div>
  )
}
