import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AppContext } from './AppContext';

export default function HomeTab() {
  const { theme, isSaving } = useContext(AppContext);
  const isDark = theme === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDark ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <View>
        <Text style={[styles.title, isDark && styles.lightText]}>
          Home
        </Text>
        <Text style={[styles.message, isDark && styles.lightText]}>
          The shared theme is {theme}.
        </Text>
        {isSaving && (
          <Text style={[styles.status, isDark && styles.lightText]}>
            Saving…
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  lightBackground: {
    backgroundColor: '#ffffff',
  },
  darkBackground: {
    backgroundColor: '#222222',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
  status: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  lightText: {
    color: '#ffffff',
  },
});