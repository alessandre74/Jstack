import { iconsMap } from './iconsMap'

interface CategoryIconProps {
  type: keyof typeof iconsMap
  category?: string
}

export function CategoryIcon({ type, category }: CategoryIconProps) {
  const Icon =
    iconsMap[type][
      (category as keyof (typeof iconsMap.expense | typeof iconsMap.income)) ?? 'default'
    ] ?? iconsMap[type].default

  return <Icon />
}
