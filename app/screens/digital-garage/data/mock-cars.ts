import { CarsData } from "app/screens/digital-garage/data/types"

export const MOCK_CARS_DATA: CarsData = {
  cars: [
    {
      id: "535e8de8-721b-4bac-8b72-7d29be7da467",
      brand: "Audi",
      name: "RS 5 Coupé",
      about:
        "The car also has a quattro all-wheel drive system with a standard sport rear differential. According to Audi, it does the same in 3.8 seconds in the Sportback.",
      rent: {
        period: "Per day",
        price: 120,
      },
      fuelType: "electric",
      thumbnail: "https://storage.googleapis.com/golden-wind/ignite/react-native/thumbnails/1.png",
      accessories: [
        {
          type: "speed",
          name: "250km/h",
        },
        {
          type: "acceleration",
          name: "3.8s",
        },
        {
          type: "turning_diameter",
          name: "800 HP",
        },
        {
          type: "electric_motor",
          name: "Electric",
        },
        {
          type: "exchange",
          name: "Auto",
        },
        {
          type: "seats",
          name: "5 people",
        },
      ],
      photos: [
        {
          id: "1",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/1.png",
        },
        {
          id: "2",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/2.png",
        },
        {
          id: "3",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/3.png",
        },
      ],
    },
    {
      id: "ffb71f55-818a-48b1-b7d2-2efc406ede25",
      brand: "Porsche",
      name: "Panamera",
      about:
        "The Panamera is a large luxury coupe. It has front V6 and V8 engines. The drive is all-wheel with a seven-speed PDK gearbox and dual clutch.",
      rent: {
        period: "Per day",
        price: 340,
      },
      fuelType: "gasoline_motor",
      thumbnail: "https://storage.googleapis.com/golden-wind/ignite/react-native/thumbnails/2.png",
      accessories: [
        {
          type: "speed",
          name: "315km/h",
        },
        {
          type: "acceleration",
          name: "2.9s",
        },
        {
          type: "turning_diameter",
          name: "700 HP",
        },
        {
          type: "gasoline_motor",
          name: "Gasoline",
        },
        {
          type: "exchange",
          name: "Auto",
        },
        {
          type: "seats",
          name: "4 people",
        },
      ],
      photos: [
        {
          id: "4",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/4.png",
        },
        {
          id: "5",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/5.png",
        },
      ],
    },
    {
      id: "52930821-cbea-4b05-9f45-7c02b1bb0d8c",
      brand: "Chevrolet",
      name: "Corvette Z06",
      about:
        "The Chevrolet Corvette Z06 includes high-performance Brembo brakes with larger front calipers, aerodynamic components with a carbon fiber hood, and a high-performance suspension.",
      rent: {
        period: "Per day",
        price: 620,
      },
      fuelType: "gasoline_motor",
      thumbnail: "https://storage.googleapis.com/golden-wind/ignite/react-native/thumbnails/3.png",
      accessories: [
        {
          type: "speed",
          name: "330km/h",
        },
        {
          type: "acceleration",
          name: "6.2s",
        },
        {
          type: "turning_diameter",
          name: "900 HP",
        },
        {
          type: "gasoline_motor",
          name: "Gasoline",
        },
        {
          type: "exchange",
          name: "Auto",
        },
        {
          type: "seats",
          name: "2 people",
        },
      ],
      photos: [
        {
          id: "6",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/6.png",
        },
        {
          id: "7",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/7.png",
        },
        {
          id: "8",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/8.png",
        },
      ],
    },
    {
      id: "49983f6c-a46a-4dfd-a86e-425b8c72e086",
      brand: "Lamborghini",
      name: "Huracan",
      about:
        "This is a sports car. It comes from the legendary fighting bull pardoned in the Real Maestranza de Sevilla arena. It's a beautiful car for those who love speed.",
      rent: {
        period: "Per day",
        price: 120,
      },
      fuelType: "electric_motor",
      thumbnail: "https://storage.googleapis.com/golden-wind/ignite/react-native/thumbnails/4.png",
      accessories: [
        {
          type: "speed",
          name: "380km/h",
        },
        {
          type: "acceleration",
          name: "3.2s",
        },
        {
          type: "turning_diameter",
          name: "800 HP",
        },
        {
          type: "electric_motor",
          name: "Electric",
        },
        {
          type: "exchange",
          name: "Auto",
        },
        {
          type: "seats",
          name: "2 people",
        },
      ],
      photos: [
        {
          id: "9",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/9.png",
        },
        {
          id: "10",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/10.png",
        },
        {
          id: "11",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/11.png",
        },
      ],
    },
    {
      id: "508e7193-0078-4615-9071-920b59038fda",
      brand: "Volvo",
      name: "XC40",
      about:
        "The powerful combination of a high-performance electric motor and a combustion engine. Compact and innovative. With expressive design, intuitive technologies, and urban style.",
      rent: {
        period: "Per day",
        price: 120,
      },
      fuelType: "gasoline_motor",
      thumbnail: "https://storage.googleapis.com/golden-wind/ignite/react-native/thumbnails/5.png",
      accessories: [
        {
          type: "speed",
          name: "180km/h",
        },
        {
          type: "acceleration",
          name: "1.5s",
        },
        {
          type: "turning_diameter",
          name: "600 HP",
        },
        {
          type: "gasoline_motor",
          name: "Gasoline",
        },
        {
          type: "exchange",
          name: "Auto",
        },
        {
          type: "seats",
          name: "5 people",
        },
      ],
      photos: [
        {
          id: "12",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/12.png",
        },
        {
          id: "13",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/13.png",
        },
        {
          id: "14",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/14.png",
        },
      ],
    },
    {
      id: "59626707-88c5-4877-9350-07f372c0905a",
      brand: "Mitsubishi",
      name: "Lancer",
      about:
        "The Mitsubishi Lancer is a beautiful and aggressive car. Moreover, it is captivating with its comfort and efficiency. Very firm and stable for driving with tranquility and safety.",
      rent: {
        period: "Per day",
        price: 220,
      },
      fuelType: "hybrid_motor",
      thumbnail: "https://storage.googleapis.com/golden-wind/ignite/react-native/thumbnails/6.png",
      accessories: [
        {
          type: "speed",
          name: "180km/h",
        },
        {
          type: "acceleration",
          name: "2.0s",
        },
        {
          type: "turning_diameter",
          name: "600 HP",
        },
        {
          type: "hybrid_motor",
          name: "Hybrid",
        },
        {
          type: "exchange",
          name: "Auto",
        },
        {
          type: "seats",
          name: "5 people",
        },
      ],
      photos: [
        {
          id: "15",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/15.png",
        },
        {
          id: "16",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/16.png",
        },
        {
          id: "17",
          photo: "https://storage.googleapis.com/golden-wind/ignite/react-native/images/17.png",
        },
      ],
    },
  ],
  schedules_bycars: [
    {
      id: "535e8de8-721b-4bac-8b72-7d29be7da467",
      unavailable_dates: [
        "2021-06-01",
        "2021-06-02",
        "2021-06-09",
        "2021-05-25",
        "2021-07-16",
        "2021-07-17",
        "2021-07-18",
        "2021-05-28",
        "2021-05-29",
        "2021-05-30",
        "2021-05-28",
        "2021-05-29",
        "2021-05-30",
        "2021-05-28",
        "2021-05-29",
        "2021-05-30",
        "2021-06-16",
        "2021-06-17",
        "2021-06-18",
        "2022-09-13",
        "2022-09-14",
        "2022-09-15",
        "2022-09-16",
        "2022-09-17",
        "2022-09-18",
        "2022-09-13",
        "2022-09-14",
        "2022-09-15",
        "2022-09-16",
        "2022-09-17",
        "2022-09-18",
        "2022-09-13",
        "2022-09-14",
        "2022-09-15",
        "2022-09-16",
        "2022-09-17",
      ],
    },
    {
      id: "ffb71f55-818a-48b1-b7d2-2efc406ede25",
      unavailable_dates: [
        "2021-06-15",
        "2021-06-16",
        "2021-06-17",
        "2021-06-01",
        "2021-06-02",
        "2021-06-03",
        "2021-06-04",
        "2021-05-29",
        "2021-05-30",
        "2021-05-29",
        "2021-05-30",
        "2022-09-13",
        "2022-09-14",
        "2022-09-15",
        "2022-09-16",
        "2022-09-17",
      ],
    },
    {
      id: "52930821-cbea-4b05-9f45-7c02b1bb0d8c",
      unavailable_dates: [
        "2021-08-01",
        "2021-08-21",
        "2021-08-22",
        "2021-06-19",
        "2021-06-20",
        "2021-07-15",
        "2021-07-16",
        "2021-07-17",
        "2021-07-18",
        "2021-05-28",
        "2021-05-29",
        "2021-05-30",
        "2022-09-13",
        "2022-09-14",
        "2022-09-15",
        "2022-09-16",
        "2022-09-17",
        "2022-09-18",
        "2022-09-13",
        "2022-09-14",
        "2022-09-15",
        "2022-09-16",
        "2022-09-17",
        "2022-09-18",
      ],
    },
    {
      id: "49983f6c-a46a-4dfd-a86e-425b8c72e086",
      unavailable_dates: [
        "2021-06-19",
        "2021-06-20",
        "2021-06-21",
        "2022-09-14",
        "2022-09-15",
        "2022-09-16",
        "2022-09-17",
        "2022-09-18",
      ],
    },
    {
      id: "508e7193-0078-4615-9071-920b59038fda",
      unavailable_dates: [
        "2021-06-01",
        "2021-06-02",
        "2021-06-03",
        "2021-06-10",
        "2021-06-11",
        "2021-06-12",
        "2021-06-17",
        "2021-06-18",
        "2021-06-19",
      ],
    },
    {
      id: "59626707-88c5-4877-9350-07f372c0905a",
      unavailable_dates: ["2021-06-28", "2021-06-29"],
    },
  ],
  schedules_byuser: [
    {
      user_id: 1,
      car: {
        id: "52930821-cbea-4b05-9f45-7c02b1bb0d8c",
        brand: "Chevrolet",
        name: "Corvette Z06",
        about:
          "O Chevrolet Corvette Z06 inclui freios Brembo de alto desempenho com pinças maiores no conjunto dianteiro, itens aerodinâmicos com capô de fibra de carbono, suspensão para alto desempenho.",
        rent: {
          period: "Ao dia",
          price: 620,
        },
        fuelType: "gasoline_motor",
        thumbnail:
          "https://storage.googleapis.com/golden-wind/ignite/react-native/thumbnails/3.png",
        accessories: [
          {
            type: "speed",
            name: "330km/h",
          },
          {
            type: "acceleration",
            name: "6.2s",
          },
          {
            type: "turning_diameter",
            name: "900 HP",
          },
          {
            type: "gasoline_motor",
            name: "Gasoline",
          },
          {
            type: "exchange",
            name: "Auto",
          },
          {
            type: "seats",
            name: "2 pessoas",
          },
        ],
        photos: [
          "https://storage.googleapis.com/golden-wind/ignite/react-native/images/6.png",
          "https://storage.googleapis.com/golden-wind/ignite/react-native/images/7.png",
          "https://storage.googleapis.com/golden-wind/ignite/react-native/images/8.png",
        ],
      },
      startDate: "13/09/2022",
      endDate: "18/09/2022",
      id: 1,
    },
    {
      user_id: 1,
      car: {
        id: "535e8de8-721b-4bac-8b72-7d29be7da467",
        brand: "Audi",
        name: "RS 5 Coupé",
        about:
          "O carro ainda tem sistema de tração nas quatro rodas Quattro com diferencial traseiro esportivo de série. De acordo com a Audi, ele faz o mesmo em 3,8 segundos na Sportback.",
        rent: {
          period: "Ao dia",
          price: 120,
        },
        fuelType: "electric",
        thumbnail:
          "https://storage.googleapis.com/golden-wind/ignite/react-native/thumbnails/1.png",
        accessories: [
          {
            type: "speed",
            name: "250km/h",
          },
          {
            type: "acceleration",
            name: "3.8s",
          },
          {
            type: "turning_diameter",
            name: "800 HP",
          },
          {
            type: "electric_motor",
            name: "Elétrico",
          },
          {
            type: "exchange",
            name: "Auto",
          },
          {
            type: "seats",
            name: "5 pessoas",
          },
        ],
        photos: [
          "https://storage.googleapis.com/golden-wind/ignite/react-native/images/1.png",
          "https://storage.googleapis.com/golden-wind/ignite/react-native/images/2.png",
          "https://storage.googleapis.com/golden-wind/ignite/react-native/images/3.png",
        ],
      },
      startDate: "13/09/2022",
      endDate: "18/09/2022",
      id: 2,
    },
    {
      user_id: 1,
      car: {
        id: "535e8de8-721b-4bac-8b72-7d29be7da467",
        brand: "Audi",
        name: "RS 5 Coupé",
        about:
          "O carro ainda tem sistema de tração nas quatro rodas Quattro com diferencial traseiro esportivo de série. De acordo com a Audi, ele faz o mesmo em 3,8 segundos na Sportback.",
        rent: {
          period: "Ao dia",
          price: 120,
        },
        fuelType: "electric",
        thumbnail:
          "https://storage.googleapis.com/golden-wind/ignite/react-native/thumbnails/1.png",
        accessories: [
          {
            type: "speed",
            name: "250km/h",
          },
          {
            type: "acceleration",
            name: "3.8s",
          },
          {
            type: "turning_diameter",
            name: "800 HP",
          },
          {
            type: "electric_motor",
            name: "Elétrico",
          },
          {
            type: "exchange",
            name: "Auto",
          },
          {
            type: "seats",
            name: "5 pessoas",
          },
        ],
        photos: [
          "https://storage.googleapis.com/golden-wind/ignite/react-native/images/1.png",
          "https://storage.googleapis.com/golden-wind/ignite/react-native/images/2.png",
          "https://storage.googleapis.com/golden-wind/ignite/react-native/images/3.png",
        ],
      },
      startDate: "13/09/2022",
      endDate: "17/09/2022",
      id: 3,
    },
    {
      user_id: 1,
      car: {
        id: "49983f6c-a46a-4dfd-a86e-425b8c72e086",
        brand: "Lamborghini",
        name: "Huracan",
        about:
          "Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.",
        rent: {
          period: "Ao dia",
          price: 120,
        },
        fuelType: "electric_motor",
        thumbnail:
          "https://storage.googleapis.com/golden-wind/ignite/react-native/thumbnails/4.png",
        accessories: [
          {
            type: "speed",
            name: "380km/h",
          },
          {
            type: "acceleration",
            name: "3.2s",
          },
          {
            type: "turning_diameter",
            name: "800 HP",
          },
          {
            type: "electric_motor",
            name: "Elétrico",
          },
          {
            type: "exchange",
            name: "Auto",
          },
          {
            type: "seats",
            name: "2 pessoas",
          },
        ],
        photos: [
          "https://storage.googleapis.com/golden-wind/ignite/react-native/images/9.png",
          "https://storage.googleapis.com/golden-wind/ignite/react-native/images/10.png",
          "https://storage.googleapis.com/golden-wind/ignite/react-native/images/11.png",
        ],
      },
      startDate: "14/09/2022",
      endDate: "18/09/2022",
      id: 4,
    },
  ],
}
