import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"

export type IconTypes = keyof typeof iconRegistry | keyof typeof Ionicons.glyphMap

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

/**
 * A component to render a registered icon or Ionicon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper = (WrapperProps?.onPress ? TouchableOpacity : View) as ComponentType<
    TouchableOpacityProps | ViewProps
  >

  // Check if the icon is in the iconRegistry
  if (icon in iconRegistry) {
    const $imageStyle: StyleProp<ImageStyle> = [
      $imageStyleBase,
      color !== undefined && { tintColor: color },
      size !== undefined && { width: size, height: size },
      $imageStyleOverride,
    ]

    return (
      <Wrapper
        accessibilityRole={isPressable ? "imagebutton" : undefined}
        {...WrapperProps}
        style={$containerStyleOverride}
      >
        <Image style={$imageStyle} source={iconRegistry[icon]} />
      </Wrapper>
    )
  }

  // Otherwise, assume it is an Ionicons icon
  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={size}
        color={color}
        style={$imageStyleOverride as any}
      />
    </Wrapper>
  )
}

export const iconRegistry = {
  back: require("../../assets/icons/back.png"),
  bell: require("../../assets/icons/bell.png"),
  caretLeft: require("../../assets/icons/caretLeft.png"),
  caretRight: require("../../assets/icons/caretRight.png"),
  check: require("../../assets/icons/check.png"),
  clap: require("../../assets/icons/demo/clap.png"), // @demo remove-current-line
  community: require("../../assets/icons/demo/community.png"), // @demo remove-current-line
  components: require("../../assets/icons/demo/components.png"), // @demo remove-current-line
  debug: require("../../assets/icons/demo/debug.png"), // @demo remove-current-line
  github: require("../../assets/icons/demo/github.png"), // @demo remove-current-line
  heart: require("../../assets/icons/demo/heart.png"), // @demo remove-current-line
  hidden: require("../../assets/icons/hidden.png"),
  ladybug: require("../../assets/icons/ladybug.png"),
  lock: require("../../assets/icons/lock.png"),
  menu: require("../../assets/icons/menu.png"),
  more: require("../../assets/icons/more.png"),
  pin: require("../../assets/icons/demo/pin.png"), // @demo remove-current-line
  podcast: require("../../assets/icons/demo/podcast.png"), // @demo remove-current-line
  settings: require("../../assets/icons/settings.png"),
  slack: require("../../assets/icons/demo/slack.png"), // @demo remove-current-line
  view: require("../../assets/icons/view.png"),
  x: require("../../assets/icons/x.png"),
  // add more icons here
  homeGarage: require("../../assets/icons/user/Home garage.png"),
  book: require("../../assets/icons/user/Book.png"),
  email: require("../../assets/icons/user/Email.png"),
  dataShare: require("../../assets/icons/user/Data share.png"),
  search: require("../../assets/icons/user/Search.png"),
  shareKnowledge: require("../../assets/icons/user/Share knowledge.png"),
  camera: require("../../assets/icons/user/Camera.png"),
  notificationNew: require("../../assets/icons/user/Notification new.png"),
  car: require("../../assets/icons/user/Car.png"),
  // tab icons
  tabHomeGarage: require("../../assets/icons/user/Tab_Home garage.png"),
  tabCurrencyPound: require("../../assets/icons/user/Currency pound.png"),
  tabMostlyCloudy: require("../../assets/icons/user/Mostly cloudy.png"),
  tabEvents: require("../../assets/icons/user/Events.png"),
}

const $imageStyleBase: ImageStyle = {
  resizeMode: "contain",
}
