import { onGoogleButtonPress } from '@/utils/GoogleSignIn'
import React, { useState } from 'react'
import { Button, View, Text } from 'react-native'

export default function LoginScreen() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  
  const handleLogin = async () => {
    setLoading(true)
    onGoogleButtonPress().catch(setError).finally(() => setLoading(false))
  }

  return (
    <View>
      <Text>{JSON.stringify(error)}</Text>
      <Button title="Login" onPress={handleLogin} disabled={loading} />
    </View>
  )
}