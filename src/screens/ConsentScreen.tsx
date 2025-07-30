import React, { useState } from 'react';
import { View, Text, Button, Alert, ScrollView, Switch } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { useNavigation } from '@react-navigation/native';

const ConsentScreen = () => {
  const [agreed, setAgreed] = useState(false);
  const navigation = useNavigation();

  const handleContinue = async () => {
    if (!agreed) {
      Alert.alert('Consent Required', 'Please agree to the terms before continuing.');
      return;
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      Alert.alert('Error', 'User not found or session expired.');
      return;
    }

    // insert or update profile row
    const { error: insertError } = await supabase.from('profiles').upsert([
      {
        user_id: user.id,
        consent_accepted: true,
        full_name: '',        // optional placeholder
        dob: null,
        city: '',
        income_range_monthly: null,
        primary_bank: '',
        updated_at: new Date()
      }
    ]);

    if (insertError) {
      console.error(insertError);
      Alert.alert('Database Error', 'Failed to update consent data.');
      return;
    }

    navigation.navigate('Profile');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Consent & Terms</Text>

      <Text style={{ marginBottom: 20 }}>
        By proceeding, you agree to our privacy policy and terms of use regarding how we handle your data.
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Switch value={agreed} onValueChange={setAgreed} />
        <Text style={{ marginLeft: 10 }}>I agree</Text>
      </View>

      <Button title="Continue" onPress={handleContinue} />
    </ScrollView>
  );
};

export default ConsentScreen;
