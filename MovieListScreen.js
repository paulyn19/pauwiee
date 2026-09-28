// MovieListScreen.js
import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, FlatList,
  TouchableOpacity, ScrollView, StatusBar,
} from 'react-native';
import styles, { COLORS } from './globalStyles';
import MOVIES, { GENRES } from './mockData';

export default function MovieListScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [genre,  setGenre]  = useState('All');

  const filtered = useMemo(() => {
    return MOVIES.filter(m => {
      const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
      const matchGenre  = genre === 'All' || m.genre.includes(genre);
      return matchSearch && matchGenre;
    });
  }, [search, genre]);

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
    >
      <View style={styles.posterBox}>
        <Text style={styles.posterLabel}>{item.year}</Text>
      </View>
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieGenre}>{item.genre}</Text>
        <View style={styles.ratingRow}>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{item.rating} / 10</Text>
          </View>
          <Text style={styles.yearText}>{item.duration}</Text>
        </View>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.card} />

      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
        >
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>Home</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          All <Text style={styles.headerAccent}>Movies</Text>
        </Text>
        <Text style={styles.headerSub}>{filtered.length} of {MOVIES.length} films</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title..."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={{ fontSize: 16, color: COLORS.textMuted }}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Genre filter */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {GENRES.map(g => (
            <TouchableOpacity
              key={g}
              style={[styles.filterChip, genre === g && styles.filterChipActive]}
              onPress={() => setGenre(g)}
            >
              <Text style={[styles.filterChipText, genre === g && styles.filterChipTextActive]}>
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Movie list */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderMovie}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>No movies found</Text>
            <Text style={styles.emptyText}>
              Try a different search term or genre filter.
            </Text>
          </View>
        }
      />
    </View>
  );
}
