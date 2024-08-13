import AccelerationSvg from "assets/svgs/acceleration.svg"
import EnergySvg from "assets/svgs/energy.svg"
import ForceSvg from "assets/svgs/force.svg"
import GasolineSvg from "assets/svgs/gasoline.svg"
import HybridSvg from "assets/svgs/hybrid.svg"
import SpeedSvg from "assets/svgs/speed.svg"

import CarSvg from "assets/svgs/car.svg"
import ExchangeSvg from "assets/svgs/exchange.svg"
import PeopleSvg from "assets/svgs/people.svg"

export function getAccessoryIcon(type: string) {
  switch (type) {
    case "speed":
      return SpeedSvg
    case "acceleration":
      return AccelerationSvg
    case "turning_diameter":
      return ForceSvg
    case "gasoline_motor":
      return GasolineSvg
    case "electric_motor":
      return EnergySvg
    case "hybrid_motor":
      return HybridSvg
    case "exchange":
      return ExchangeSvg
    case "seats":
      return PeopleSvg
    default:
      return CarSvg
  }
}
