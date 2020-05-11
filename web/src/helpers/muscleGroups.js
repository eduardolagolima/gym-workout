import { sortBy } from 'lodash'

function muscleGroups() {
  const values = [
    'abs',
    'back',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstring',
    'quads',
    'shoulder',
    'triceps',
  ]

  const muscleGroups = []

  for (const value of values) {
    muscleGroups.push({
      value,
      description: this.$t(`generics.muscle_groups.${value}`),
    })
  }

  return sortBy(muscleGroups, ['description'])
}

export default muscleGroups
