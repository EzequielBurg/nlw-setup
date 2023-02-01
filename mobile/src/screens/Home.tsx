import { useCallback, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";
import { Alert, ScrollView, Text, View } from "react-native";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>

export function Home() {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const datesFromYearStart = generateDatesFromYearBeginning()

  const minimumSummaryDatesSizes = 18 * 5

  const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

  const [loading, setLoading] = useState(true)

  const [summary, setSummary] = useState<Summary>([])

  const { navigate } = useNavigation()

  function fetchData() {
    try {
      setLoading(true)
      api.get('/summary').then(res => setSummary(res.data))
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível carregar os dados.')
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData()
  }, []))

  if (loading) return <Loading />

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay}-${index}`}
            style={{ width: DAY_SIZE }}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map(date => {
            const dayWithHabits = summary.find(item => dayjs(date).isSame(item.date, 'day'))

            return (
              <HabitDay
                key={date.toString()}
                onPress={() => navigate('habit', { date: date.toISOString() })}
                amount={dayWithHabits?.amount}
                completed={dayWithHabits?.completed}
                date={date}
              />
            )
          })}

          {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill })
            .map((_, index) => (
              <HabitDay key={index} disabled />
            ))
          }
        </View>
      </ScrollView>
    </View>
  )
}
