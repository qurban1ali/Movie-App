import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { icons } from '@/constants/icons'

const Profile = () => {
  return (
    <ScrollView className="flex-1 bg-primary pt-20">
      {/* Header / Avatar */}
      <View className="px-6 pt-12 pb-8 bg-primary">
        <View className="items-center">
          <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh83d7IjmJI8dKkodM9AcMGisRjhNldad3WQ&s"}} className="w-28 h-28 rounded-full" />
          <Text className="text-white text-2xl font-bold mt-4">John Doe</Text>
          <Text className="text-white/70 text-center mt-3 px-6">Movie lover • Curator of favourites • Sharing short reviews</Text>

          <TouchableOpacity className="mt-6 mb-4 bg-white/10 px-6 py-2 rounded-full">
            <Text className="text-white font-semibold ">Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Card with stats and actions */}
      <View className="px-6 -mt-6">
        <View className="bg-white rounded-lg p-4 shadow-md">
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-xl font-bold">128</Text>
              <Text className="text-dark-100 text-sm">Saved</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold">54</Text>
              <Text className="text-dark-100 text-sm">Reviews</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold">1.2k</Text>
              <Text className="text-dark-100 text-sm">Followers</Text>
            </View>
          </View>
        </View>

        <View className="mt-4 space-y-3">
          <TouchableOpacity className="flex-row mb-7 items-center justify-between bg-white p-4 rounded-lg">
            <Text className="text-base text-dark-100">Saved Movies</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row mb-7 items-center justify-between bg-white p-4 rounded-lg">
            <Text className="text-base text-dark-100">Settings</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row mb-7 items-center justify-between bg-white p-4 rounded-lg">
            <Text className="text-base text-red-500">Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Profile