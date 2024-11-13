import { SlotType } from '@autospace/network/src/gql/generated'
import {
  IconBike,
  IconMotorbike,
  IconCar,
  IconTir,
  IconMoonStars,
  IconSunset,
  IconSun,
  IconSunrise,
} from '@tabler/icons-react'

export const IconTypes = {
  [SlotType.Bicycle]: (
    <span className="w-6 h-6 text-gray-500 font-bold">L1</span>
  ),
  [SlotType.Bike]: <span className="w-6 h-6 text-gray-500 font-bold">L2</span>,
  [SlotType.Car]: <span className="w-6 h-6 text-gray-500 font-bold">L3</span>,
  [SlotType.Heavy]: <span className="w-6 h-6 text-gray-500 font-bold">L4</span>,
}

export const IconType = ({
  time,
  className,
}: {
  time: string
  className?: string
}) => {
  const date = new Date(time)
  const hour = date.getHours() // get the hour in UTC

  if (hour >= 4 && hour < 10) return <IconSunrise className="w-5 h-5" />
  if (hour >= 10 && hour < 16) return <IconSun className="w-5 h-5" />
  if (hour >= 16 && hour < 20) return <IconSunset className="w-5 h-5" />
  return <IconMoonStars className={`w-5 h-5 ${className}`} />
}
