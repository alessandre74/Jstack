import { iconsMap } from './iconsMap'

interface CategoryIconProps {
  type: keyof typeof iconsMap //'income' | 'expense'
  category?: keyof typeof iconsMap.expense // string
}

export function CategoryIcon({ type, category }: CategoryIconProps) {
  const Icon =
    iconsMap[type][
      (category as keyof (typeof iconsMap.expense | typeof iconsMap.income)) ?? 'default'
    ] ?? iconsMap[type].default

  return <Icon />
}
