import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { icons } from '@/constants/icons'

const STATIC_SAVED = [
  {
    id: 76341,
    title: 'Mad Max: Fury Road',
    poster_path: '/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
    release_date: '2015-05-13',
    rating: 8.1,
  },
  {
    id: 27205,
    title: 'Inception',
    poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    release_date: '2010-07-16',
    rating: 8.8,
  },
  {
    id: 597,
    title: 'Titanic',
    poster_path: '/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
    release_date: '1997-11-18',
    rating: 7.9,
  },
]

const Saved = () => {
  const [items, setItems] = useState<any[]>(STATIC_SAVED)

  const remove = (id: string | number) => {
    setItems((prev) => prev.filter((i) => String(i.id) !== String(id)))
  }

  if (!items.length) {
    return (
      <View className="bg-primary flex-1 px-10">
        <View className="flex justify-center items-center flex-1 flex-col gap-5">
          <Image source={icons.save} className="size-10" tintColor="#fff" />
          <Text className="text-gray-400 text-base">No saved movies yet</Text>
          <Text className="text-gray-400 text-sm text-center px-6">Tap the Save button on a movie detail to pin it here for quick access.</Text>
        </View>
      </View>
    )
  }

  return (
    <View className="bg-primary flex-1 px-4 pt-6">
      <Text className="text-white font-bold text-xl px-2 mb-4">Saved Movies</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-white rounded-xl p-3 mb-3 shadow-md">
            {item.poster_path ? (
              <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} className="w-20 h-28 rounded-lg mr-3" />
            ) : (
              <View className="w-20 h-28 bg-gray-200 rounded-lg mr-3" />
            )}

            <View className="flex-1">
              <Text className="text-dark-100 font-semibold text-lg">{item.title}</Text>
              <View className="flex-row items-center gap-x-3 mt-1">
                <Text className="text-light-200 text-sm">{item.release_date?.split('-')[0]}</Text>
                <View className="bg-yellow-400 px-2 py-0.5 rounded-md">
                  <Text className="text-dark-100 text-sm font-medium">★ {item.rating}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={() => remove(item.id)} className="ml-3 px-3 py-1">
              <Text className="text-red-500 font-medium">Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

export default Saved
