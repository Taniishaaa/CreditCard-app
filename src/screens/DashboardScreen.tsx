import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '../services/supabaseClient';

export default function DashboardScreen() {
  const [profile, setProfile] = useState(null);
  const [expenses, setExpenses] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.log('Auth error:', userError?.message);
        return;
      }

      const user_id = user.id;

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user_id)
        .single();

      const { data: expenseData, error: expenseError } = await supabase
  .from('user_monthly_expenses')
  .select('*')
  .eq('user_id', user_id)
  .order('year', { ascending: false })
  .order('month', { ascending: false })
  .limit(1);

      if (profileError) console.log('Profile error:', profileError.message);
      if (expenseError) console.log('Expense error:', expenseError.message);

      setProfile(profileData);
      setExpenses(expenseData?.[0]);

    };

    fetchData();
  }, []);

  if (!profile || !expenses) {
  return (
    <View style={styles.container}>
      <Text>Loading dashboard or no expenses found...</Text>
    </View>
  );
}


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👤 Welcome, {profile.full_name}</Text>
      <Text style={styles.label}>📍 City: {profile.city}</Text>
      <Text style={styles.label}>🎂 DOB: {profile.dob}</Text>
      <Text style={styles.label}>💰 Income: ₹{profile.income_range_monthly}</Text>
      <Text style={styles.label}>🏦 Bank: {profile.primary_bank}</Text>

     <Text style={styles.label}>🏠 Rent: ₹{expenses.rent}</Text>
<Text style={styles.label}>🚗 Travel: ₹{expenses.travel}</Text>
<Text style={styles.label}>🛒 Groceries: ₹{expenses.groceries}</Text>
<Text style={styles.label}>💡 Bills: ₹{expenses.bills}</Text>
<Text style={styles.label}>📦 Subscriptions: ₹{expenses.subscriptions}</Text>
<Text style={styles.label}>🥘 Others: ₹{expenses.others}</Text>
<Text style={styles.label}>🧮 Total: ₹{expenses.total}</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  label: { fontSize: 16, marginBottom: 5 },
});
