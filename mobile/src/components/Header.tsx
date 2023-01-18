import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import Logo from '../assets/logo.svg';

export function Header() {
  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />

      <TouchableOpacity activeOpacity={.7} className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center">
        <Feather name="plus" size={25} color={colors.violet[500]} />
        <Text className="text-white ml-1 font-semibold text-lg">Novo</Text>
      </TouchableOpacity>
    </View>
  )
}
