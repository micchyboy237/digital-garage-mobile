import PropTypes from "prop-types"
import React, { useImperativeHandle, useRef, useState } from "react"
import type { FlatListProps, StyleProp, ViewStyle } from "react-native"
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { ListView, ListViewProps } from "./ListView"
import { TextField, TextFieldProps } from "./TextField"

export type SelectTextFieldProps<T> = TextFieldProps & {
  containerStyle?: StyleProp<ViewStyle>
  hideResults?: boolean
  inputContainerStyle?: StyleProp<ViewStyle>
  listContainerStyle?: StyleProp<ViewStyle>
  onShowResults?: (showResults: boolean) => void
  renderResultList?: (props: ListViewProps<T>) => React.ReactElement
  renderTextInput?: (props: TextFieldProps) => React.ReactElement
  flatListProps?: Partial<Omit<FlatListProps<T>, "data">>
  data: readonly T[]
  onSelect?: (item: T) => void
  onFocus?: () => void
  onBlur?: () => void
  maxItems?: number // New prop to limit the number of items shown
}

function SelectTextFieldComponent<Item, Ref>(
  props: SelectTextFieldProps<Item>,
  ref: React.ForwardedRef<Ref>,
): React.ReactElement {
  const {
    data,
    containerStyle,
    hideResults,
    inputContainerStyle,
    listContainerStyle,
    onShowResults,
    onStartShouldSetResponderCapture = () => false,
    onFocus,
    onBlur,
    flatListProps,
    value,
    maxItems, // Destructure the new prop
    ...textFieldProps
  } = props

  const inputRef = useRef<TextInput>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState(value || "")

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => inputRef.current?.clear(),
    isFocused: () => inputRef.current?.isFocused(),
    // Spread the entire TextInput instance
    ...inputRef.current,
  }))

  const showResults = isFocused && data?.length > 0
  onShowResults && onShowResults(showResults)

  const filteredData = data.filter((item) =>
    String(item).toLowerCase().includes(inputValue.toLowerCase()),
  )
  const displayedData = maxItems ? filteredData.slice(0, maxItems) : filteredData

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputContainer, inputContainerStyle]}>
        <TextField
          ref={inputRef}
          value={inputValue}
          onChangeText={setInputValue}
          onFocus={() => {
            setIsFocused(true)
            onFocus?.()
          }}
          onBlur={() => {
            setIsFocused(false)
            onBlur?.()
          }}
          {...textFieldProps}
        />
      </View>
      {!hideResults && (
        <View
          style={listContainerStyle}
          onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
        >
          {showResults && (
            <View style={[styles.list, flatListProps?.style]}>
              <ListView
                data={displayedData}
                estimatedItemSize={displayedData.length}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <RectButton
                      style={{ padding: 10, flex: 1 }}
                      onPress={() => {
                        props.onSelect?.(item)
                        setIsFocused(false) // Hide the list on select
                        inputRef.current?.blur()
                        setInputValue(String(item)) // Update input value with selected item
                      }}
                    >
                      <Text
                        style={styles.itemText}
                        numberOfLines={1} // Ensures long text doesn't overflow
                      >
                        {String(item)}
                      </Text>
                    </RectButton>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  inputContainer: {},
  input: {
    height: 40,
    paddingLeft: 3,
  },
  list: {
    borderColor: "#b9b9b9",
    borderRadius: 1,
    borderWidth: 1,
    backgroundColor: "white",
    borderTopWidth: 0,
    left: 0,
    position: "absolute",
    right: 0,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
})

export const SelectTextField = React.forwardRef<TextFieldProps, SelectTextFieldProps<unknown>>(
  SelectTextFieldComponent,
) as typeof SelectTextFieldComponent

export default SelectTextField
;(SelectTextField as React.FC).propTypes = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ...TextInput.propTypes,
  containerStyle: PropTypes.object,
  data: PropTypes.array,
  flatListProps: FlatList.propTypes || PropTypes.object,
  hideResults: PropTypes.bool,
  inputContainerStyle: PropTypes.object,
  listContainerStyle: PropTypes.object,
  onShowResults: PropTypes.func,
  onStartShouldSetResponderCapture: PropTypes.func,
  renderTextInput: PropTypes.func,
  renderResultList: PropTypes.func,
  maxItems: PropTypes.number, // Add prop type for maxItems
}
