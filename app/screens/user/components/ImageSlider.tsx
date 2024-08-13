import { Bullet } from "app/screens/user/components/Bullet"
import React, { useRef, useState } from "react"
import { Dimensions, FlatList, Image, StyleSheet, View, ViewToken } from "react-native"

interface Props {
  imageUrl: {
    photo: string
    id: string
  }[]
}

interface ChangeImageProps {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

export function ImageSlider({ imageUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0)

  const IndexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!
    setImageIndex(index)
  })

  return (
    <View style={styles.container}>
      <View style={styles.imageIndex}>
        {imageUrl.map((item, index) => (
          <Bullet key={String(item.id)} active={index === imageIndex} />
        ))}
      </View>

      <FlatList
        data={imageUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.carImageWrapper}>
            <Image source={{ uri: item.photo }} style={styles.carImage} resizeMode="contain" />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={IndexChanged.current}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // backgroundColor: "black",
  },
  imageIndex: {
    flexDirection: "row",
    alignSelf: "center",
    paddingRight: 24,
  },
  carImageWrapper: {
    width: Dimensions.get("window").width,
    height: 132,
    justifyContent: "center",
    alignItems: "center",
  },
  carImage: {
    width: 280,
    height: 123,
  },
})
