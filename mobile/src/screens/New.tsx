import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function New() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekday(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prev => prev.filter(item => item !== weekDayIndex))
    } else {
      setWeekDays(prev => [...prev, weekDayIndex])
    }
  }

  function handleCreateHabit() {
    try {
      if (!title || !weekDays.length) {
        Alert.alert('Novo hábito', 'Informe o nome do hábito e a periodicidade')
        return
      }

      api.post('/habits', { title, weekDays })
        .then(() => {
          setTitle('')
          setWeekDays([])
          Alert.alert('Novo hábito', 'Hábito criado com sucesso!')
        })
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não possível criar o hábito')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">Criar hábito</Text>

        <Text className="mt-6 text-white font-semibold text-base">Qual seu comprometimento?</Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder="Ex.: exercícios, dormir bem, etc . . ."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">Qual a recorrência?</Text>

        {availableWeekDays.map((item, index) => (
          <Checkbox
            key={item}
            title={item}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekday(index)}
          />
        ))}

        <TouchableOpacity
          onPress={handleCreateHabit}
          activeOpacity={.7}
          className="flex-row items-center justify-center w-full h-14 mt-6 rounded-lg bg-green-600"
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="text-white text-base font-semibold ml-2">Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
