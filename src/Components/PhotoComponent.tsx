import React from 'react'
import { Pressable, View, Image } from 'react-native'
import { getConfig } from '../Config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@/Theme'
import { useAppSelector } from '@/Store/store'

/**
 * Input object for the PhotoComponent component
 * @property {any} item - The item to be displayed
 * @property {number} index - The index of the item in the list
 * @property {any} section - The section that the item belongs to
 */
type Input = {
  item: any
  index: number
  section: any
}

/**
 * Props object for the PhotoComponent component
 * @property {Input} input - The input object for the component
 * @property {(item: any, index: number, section: any) => void} handleImagePress - The callback function to be called when the image is pressed
 */
type Props = {
  input: Input
  handleImagePress: (item: any, index: number, section: any) => void
}

/**
 * Component to display a photo
 * @param {Props} props - The props object for the component
 * @returns The PhotoComponent component
 */
export const PhotoComponent = (props: Props) => {
  const { input, handleImagePress } = props
  const { item, index, section } = input

  const { Common, Layout } = useTheme()
  const config = useAppSelector(state => state.config)

  const authToken = useAppSelector(state => state.auth.access?.token)

  return (
    <Pressable
      style={[Common.timeline.photoItem]}
      onPress={() => handleImagePress(item, index, section)}
    >
      {!item.isTemp && (
        <View>
          <Icon
            name={
              item.syncStatus === 'local'
                ? 'cloud-upload-outline'
                : item.syncStatus === 'synced'
                ? 'cloud-check-outline'
                : 'cloud-outline'
            }
            size={20}
            color={'rgba(0,0,0,0.5)'}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 20,
              zIndex: 1,
            }}
          />
          {
            // To-Do: this is weird but it works
          }
          <Image
            style={{ width: '300%', height: '100%' }}
            source={
              item.syncStatus
                ? { uri: item.url }
                : {
                    uri:
                      getConfig(config.baseurl).MEDIA_URL +
                      '/square_thumbnails/' +
                      item.url,
                    method: 'GET',
                    headers: {
                      Authorization: 'Bearer ' + authToken,
                    },
                  }
            }
          />
        </View>
      )}
      {item.isTemp && <View style={Layout.fullSize} />}
    </Pressable>
  )
}
