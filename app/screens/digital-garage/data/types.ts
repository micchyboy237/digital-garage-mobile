export type Car = {
  id: string
  brand: string
  name: string
  about: string
  rent: RentDetails
  fuelType: string
  thumbnail: string
  accessories: Accessory[]
  photos: Photo[]
}

export type RentDetails = {
  period: string
  price: number
}

export type Accessory = {
  type: string
  name: string
}

export type Photo = {
  id: string
  photo: string
}

export type CarList = {
  cars: Car[]
}

export type ScheduleByCar = {
  id: string
  unavailable_dates: string[]
}

export type ScheduleByUser = {
  user_id: number
  car: Car
  startDate: string
  endDate: string
  id: number
}

export type CarsData = {
  cars: Car[]
  schedules_bycars: ScheduleByCar[]
  schedules_byuser: ScheduleByUser[]
}
