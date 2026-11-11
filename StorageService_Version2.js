import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_STORAGE_KEY = '@my_notes';

export async function loadNotes() {
  const storedValue = await AsyncStorage.getItem(NOTES_STORAGE_KEY);

  if (storedValue === null) {
    return [];
  }

  const parsedValue = JSON.parse(storedValue);

  if (!Array.isArray(parsedValue)) {
    throw new Error('Stored notes have an invalid format.');
  }

  return parsedValue;
}

export async function saveNotes(notes) {
  await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}