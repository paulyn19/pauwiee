import React, { useContext } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppContext } from './AppContext';

export default function SettingsTab() {
  const { theme, isSaving, updateTheme } = useContext(AppContext);
  const isDark = theme === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDark ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, isDark && styles.lightText]}>
          Settings
        </Text>
        <Text style={[styles.message, isDark && styles.lightText]}>
          Current theme: {theme}
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => updateTheme(isDark ? 'light' : 'dark')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Switch to {isDark ? 'light' : 'dark'} theme
          </Text>
        </Pressable>

        {isSaving && (
          <Text accessibilityLiveRegion="polite" style={[styles.status, isDark && styles.lightText]}>
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
  content: {
    alignItems: 'center',
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
  },
  message: {
    fontSize: 18,
    marginBottom: 24,
  },
  lightText: {
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 16,
    marginTop: 16,
  },
});