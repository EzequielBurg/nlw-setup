export function calculatePercentage(num?: number, den?: number) {
  if (!num || !den) return 0

  return num > 0 ? Math.round((den / num) * 100) : 0
}
