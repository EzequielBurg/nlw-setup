import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean;
  title?: string;
}

export function Checkbox({ title, checked = false, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity {...rest} activeOpacity={.7} className="flex flex-row mb-2 items-center">
      {checked ? (
        <View className="h-6 w-6 bg-green-500 rounded-lg items-center justify-center">
          <Feather name="check" size={20} color={colors.white} />
        </View>
      ) : (
        <View className="h-6 w-6 bg-zinc-900 rounded-lg" />
      )}

      <Text className="text-white text-lg ml-3 font-semibold">{title}</Text>
    </TouchableOpacity>
  )
}
