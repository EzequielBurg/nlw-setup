import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Checkbox } from "./Checkbox";

interface HabitsListProps {
  date?: Date;
  onCompletedChanged: (completed: number) => void
}

type HabitsInfo = {
  completedHabits: string[];
  possibleHabits: Array<{
    id: string;
    title: string;
    creaeted_at: string
  }>
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)

    const isHabitAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      // '!.' força o typescript a entender que aquela variável não estará undefined
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    onCompletedChanged(completedHabits.length)

    setHabitsInfo({
      possibleHabits: [...habitsInfo!.possibleHabits],
      completedHabits
    })
  }

  useEffect(() => {
    if (date) {
      api.get('/day', { params: { date: date?.toISOString() } })
        .then(res => setHabitsInfo(res.data))
    }
  }, [])

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map(habit => (
        <Checkbox
          key={habit.id}
          textEffect
          label={habit.title}
          disabled={isDateInPast}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          checked={habitsInfo?.completedHabits.includes(habit.id)}
        />
      ))}
    </div>
  )
}
