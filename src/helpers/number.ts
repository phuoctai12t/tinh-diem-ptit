export default {
  random: (min: number, max?: number) => {
    return max
      ? Math.floor(Math.random() * (max - min + 1)) + min
      : Math.floor(Math.random() * (min + 1))
  },
}
