import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
} from 'react-native';
import { supabase } from '../services/supabaseClient';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [income, setIncome] = useState('');
  const [bank, setBank] = useState('');
  const [expenses, setExpenses] = useState({
    rent: '',
    travel: '',
    groceries: '',
    bills: '',
    subscriptions: '',
    others: '',
  });

  const navigation = useNavigation();

  const handleNext = async () => {
    if (
      !name ||
      !dob ||
      !city ||
      !income ||
      !bank ||
      Object.values(expenses).some((val) => val === '')
    ) {
      Alert.alert('Incomplete Form', 'Please fill out all fields.');
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      Alert.alert('Auth Error', 'Could not get user information.');
      return;
    }

    const user_id = user.id;

    const { error: profileError } = await supabase.from('profiles').upsert({
      user_id,
      full_name: name,
      dob,
      city,
      income_range_monthly: parseFloat(income),
      primary_bank: bank,
      consent_accepted: true,
    });

    if (profileError) {
      Alert.alert('Database Error', 'Failed to save profile info.');
      return;
    }

    const cleanedExpenses = {
      rent: Number(expenses.rent) || 0,
      groceries: Number(expenses.groceries) || 0,
      travel: Number(expenses.travel) || 0,
      bills: Number(expenses.bills) || 0,
      subscriptions: Number(expenses.subscriptions) || 0,
      others: Number(expenses.others) || 0,
    };

    const { error: expenseError } = await supabase
      .from('user_monthly_expenses')
      .insert([
        {
          user_id,
          month: new Date().toLocaleString('default', { month: 'long' }),
          year: new Date().getFullYear(),
          ...cleanedExpenses,
        },
      ]);

    if (expenseError) {
      console.log('Insert Expense Error:', expenseError.message);
      Alert.alert('Database Error', 'Failed to save expenses.');
      return;
    }

    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Monthly Income"
        value={income}
        onChangeText={setIncome}
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Primary Bank"
        value={bank}
        onChangeText={setBank}
      />

      <Text style={styles.sectionTitle}>Monthly Expenses</Text>
      {Object.entries(expenses).map(([key, val]) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} Expense`}
          value={val}
          onChangeText={(text) =>
            setExpenses((prev) => ({ ...prev, [key]: text }))
          }
          keyboardType="decimal-pad"
        />
      ))}

      <Button title="Next" onPress={handleNext} />

      {/* Debug display */}
      <Text style={styles.debugLabel}>
        Debug Expense State: {JSON.stringify(expenses, null, 2)}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  debugLabel: {
    marginTop: 20,
    fontSize: 12,
    color: 'gray',
  },
});
