import { Dimensions, TouchableOpacity } from "react-native";

interface HabitDayProps {
  disabled?: boolean;
}

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

export function HabitDay({ disabled }: HabitDayProps) {
  const className = `bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 ${disabled && 'opacity-40'}`

  return (
    <TouchableOpacity
      className={className}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={.7}
    />
  )
}
