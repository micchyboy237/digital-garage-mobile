import { Accessory, Photo } from "app/screens/digital-garage/data/types"

class CarModel {
  id: string
  name: string
  brand: string
  about: string
  fuelType: string
  rent: { period: string; price: number }
  thumbnail: string
  accessories: Accessory[]
  photos: Photo[]

  constructor(
    id: string,
    name: string,
    brand: string,
    about: string,
    fuelType: string,
    period: string,
    price: number,
    thumbnail: string,
    accessories: Accessory[],
    photos: Photo[],
  ) {
    this.id = id
    this.name = name
    this.brand = brand
    this.about = about
    this.fuelType = fuelType
    this.rent = { period, price }
    this.thumbnail = thumbnail
    this.accessories = accessories
    this.photos = photos
  }
}

export { CarModel }
