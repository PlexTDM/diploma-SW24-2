import React from 'react'
import { View, Text } from 'react-native'
import { ThemeView } from '@/components'
import { Button } from 'react-native-paper'
import { useRouter } from "expo-router";
import { Pressable } from 'react-native'
import Camera from "@/components/cameraTracking"

export default function test() {
    const router = useRouter();
  return (
    <ThemeView>
    <Camera/>
        
    </ThemeView>
  )
}
