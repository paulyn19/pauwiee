import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { loadNotes, saveNotes } from './StorageService';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const notesRef = useRef([]);
  const writeQueue = useRef(Promise.resolve());

  useEffect(() => {
    let isMounted = true;

    async function readSavedNotes() {
      try {
        const savedNotes = await loadNotes();
        if (isMounted) {
          notesRef.current = savedNotes;
          setNotes(savedNotes);
        }
      } catch {
        if (isMounted) {
          setError('Could not load saved notes. Please try again.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    readSavedNotes();
    return () => {
      isMounted = false;
    };
  }, []);

  // Queue writes so rapid edits cannot overwrite each other with stale data.
  const updateStoredNotes = useCallback((transform) => {
    const operation = writeQueue.current.then(async () => {
      const nextNotes = transform(notesRef.current);
      await saveNotes(nextNotes);
      notesRef.current = nextNotes;
      setNotes(nextNotes);
      setError('');
    });

    writeQueue.current = operation.catch(() => {});
    return operation;
  }, []);

  async function addNote() {
    const text = draft.trim();
    if (!text) return;

    try {
      await updateStoredNotes((current) => [
        ...current,
        { id: `${Date.now()}-${Math.random()}`, text },
      ]);
      setDraft('');
    } catch {
      setError('Could not save the note. Please try again.');
    }
  }

  async function saveEdit(id) {
    const text = editDraft.trim();
    if (!text) return;

    try {
      await updateStoredNotes((current) =>
        current.map((note) => (note.id === id ? { ...note, text } : note)),
      );
      setEditingId(null);
      setEditDraft('');
    } catch {
      setError('Could not update the note. Please try again.');
    }
  }

  async function deleteNote(id) {
    try {
      await updateStoredNotes((current) =>
        current.filter((note) => note.id !== id),
      );
    } catch {
      setError('Could not delete the note. Please try again.');
    }
  }

  function renderNote({ item }) {
    const isEditing = editingId === item.id;

    return (
      <View style={styles.note}>
        {isEditing ? (
          <TextInput
            accessibilityLabel="Edit note"
            style={[styles.input, styles.editInput]}
            value={editDraft}
            onChangeText={setEditDraft}
            autoFocus
          />
        ) : (
          <Text style={styles.noteText}>{item.text}</Text>
        )}

        <View style={styles.actions}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => saveEdit(item.id)}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, styles.cancelButton]}
                onPress={() => setEditingId(null)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => {
                  setEditingId(item.id);
                  setEditDraft(item.text);
                }}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, styles.deleteButton]}
                onPress={() => deleteNote(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Notes</Text>

      <View style={styles.addRow}>
        <TextInput
          accessibilityLabel="New note"
          style={styles.input}
          value={draft}
          onChangeText={setDraft}
          placeholder="Write a note..."
          onSubmitEditing={addNote}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addNote}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={renderNote}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>No notes yet. Add one above.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    color: '#202438',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },
  addRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    minHeight: 46,
    backgroundColor: '#ffffff',
    borderColor: '#d9dce5',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#3659c9',
    borderRadius: 8,
    justifyContent: 'center',
    marginLeft: 8,
    paddingHorizontal: 18,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  list: {
    paddingBottom: 24,
  },
  note: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 14,
  },
  noteText: {
    color: '#202438',
    fontSize: 16,
    marginBottom: 12,
  },
  editInput: {
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  smallButton: {
    alignItems: 'center',
    backgroundColor: '#3659c9',
    borderRadius: 6,
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cancelButton: {
    backgroundColor: '#727789',
  },
  deleteButton: {
    backgroundColor: '#c83e4d',
  },
  error: {
    color: '#b42332',
    marginBottom: 12,
  },
  loader: {
    marginTop: 32,
  },
  empty: {
    color: '#727789',
    marginTop: 32,
    textAlign: 'center',
  },
});