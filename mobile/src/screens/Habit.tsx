import { useRoute } from "@react-navigation/native";
import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { HabitsEmpty } from "../components/HabitsEmpty";
import { Loading } from "../components/Loading";
import { ProgressBar } from "../components/ProgressBar";
import { api } from "../lib/axios";
import { calculatePercentage } from "../utils/calculate-percentage";

interface Params {
  date: string
}

type DayInfo = {
  completedHabits: string[]
  possibleHabits: Array<{
    id: string;
    title: string
  }>
}

export function Habit() {
  const [loading, setLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfo>()

  const route = useRoute()

  const { date } = route.params as Params

  const parsedDate = dayjs(date)

  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())

  const dayOfWeek = parsedDate.format('dddd')

  const dayAndMonth = parsedDate.format('DD/MM')

  const habitsProgress = calculatePercentage(dayInfo?.possibleHabits.length, dayInfo?.completedHabits.length)

  function fetchHabits() {
    try {
      setLoading(true)

      api.get('/day', { params: { date } }).then(res => setDayInfo(res.data))
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível carregar as informações do hábito')
    } finally {
      setLoading(false)
    }
  }

  async function toggleHabit(id: string) {
    try {
      if (!dayInfo) return;

      await api.patch(`/habits/${id}/toggle`)

      let updatedCompletedHabits = [...dayInfo.completedHabits]

      if (updatedCompletedHabits.includes(id)) {
        updatedCompletedHabits = updatedCompletedHabits.filter(habit => habit !== id)
      } else {
        updatedCompletedHabits.push(id)
      }

      setDayInfo({
        possibleHabits: [...dayInfo.possibleHabits],
        completedHabits: [...updatedCompletedHabits]
      })
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível atualizar o hábito')
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (loading) return <Loading />

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitsProgress} />

        <View className={clsx("mt-6", { ['opacity-50']: isDateInPast })}>
          {dayInfo && dayInfo?.possibleHabits.length > 0 ?
            dayInfo?.possibleHabits.map(habit => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                disabled={isDateInPast}
                onPress={() => toggleHabit(habit.id)}
                checked={dayInfo.completedHabits.includes(habit.id)}
              />
          )) : (
            <HabitsEmpty />
          )}
        </View>

        {isDateInPast && (
          <Text className="text-white mt-10 text-center">
            Você não pode atualizar hábitos passados.
          </Text>
        )}
      </ScrollView>
    </View>
  )
}
