import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export function HabitsEmpty() {
  const { navigate } = useNavigation()

  function handleNavigate() {
    navigate('new')
  }

  return (
    <Text className="text-zinc-400 text-base">
      Não há nenhum hábito para mostrar. {' '}

      <Text className="text-violet-400 text-base underline" onPress={handleNavigate}>
        Crie um hábito agora
      </Text>
    </Text>
  )
}
