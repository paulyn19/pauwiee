import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import globalStyles from './globalStyles';

// Simple unique id generator (no backend, so timestamp + random is enough)
let idCounter = 0;
const generateId = () => {
  idCounter += 1;
  return `${Date.now()}-${idCounter}`;
};

export default function GroceryList() {
  // Holds the array of grocery items: { id, name, checked }
  const [items, setItems] = useState([]);
  // Holds the current text typed into the input field
  const [inputText, setInputText] = useState('');

  const handleAddItem = () => {
    const trimmed = inputText.trim();
    if (trimmed.length === 0) return; // ignore empty submissions

    const newItem = {
      id: generateId(),
      name: trimmed,
      checked: false,
    };

    setItems((prevItems) => [newItem, ...prevItems]);
    setInputText(''); // clear input after adding
  };

  const handleToggleItem = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const remainingCount = items.filter((item) => !item.checked).length;

  const renderItem = ({ item }) => (
    <View style={[globalStyles.row, item.checked && globalStyles.rowChecked]}>
      <TouchableOpacity
        style={[
          globalStyles.checkCircle,
          item.checked && globalStyles.checkCircleFilled,
        ]}
        onPress={() => handleToggleItem(item.id)}
        accessibilityLabel={`Mark ${item.name} as ${
          item.checked ? 'not bought' : 'bought'
        }`}
      >
        {item.checked && <Text style={globalStyles.checkMark}>✓</Text>}
      </TouchableOpacity>

      <Text
        style={[
          globalStyles.itemText,
          item.checked && globalStyles.itemTextChecked,
        ]}
      >
        {item.name}
      </Text>

      <TouchableOpacity
        style={globalStyles.deleteButton}
        onPress={() => handleDeleteItem(item.id)}
        accessibilityLabel={`Delete ${item.name}`}
      >
        <Text style={globalStyles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>🛒 Grocery Tracker</Text>

      <View style={globalStyles.inputRow}>
        <TextInput
          style={globalStyles.input}
          placeholder="Add a grocery item..."
          placeholderTextColor="#A0A4A8"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAddItem}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={globalStyles.addButton}
          onPress={handleAddItem}
          accessibilityLabel="Add item"
        >
          <Text style={globalStyles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {items.length > 0 && (
        <Text style={globalStyles.counterText}>
          {remainingCount} item{remainingCount !== 1 ? 's' : ''} left to buy
        </Text>
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={globalStyles.listContent}
        ListEmptyComponent={
          <Text style={globalStyles.emptyText}>
            Your list is empty. Add your first item above!
          </Text>
        }
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}
