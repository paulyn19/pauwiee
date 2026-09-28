// globalStyles.js
import { StyleSheet } from 'react-native';

export const COLORS = {
  bg:        '#0d0d1a',
  card:      '#1a1a2e',
  accent:    '#e50914',
  gold:      '#f5c518',
  text:      '#ffffff',
  textSub:   '#a0a0b0',
  textMuted: '#55556a',
  border:    '#2a2a3e',
  inputBg:   '#13132a',
  success:   '#2ecc71',
};

export default StyleSheet.create({
  screen:           { flex: 1, backgroundColor: '#0d0d1a' },

  // Header
  header:           { paddingTop: 56, paddingBottom: 20, paddingHorizontal: 20,
                      backgroundColor: '#1a1a2e', borderBottomWidth: 1, borderBottomColor: '#2a2a3e' },
  headerTitle:      { fontSize: 28, fontWeight: '800', color: '#ffffff' },
  headerAccent:     { color: '#e50914' },
  headerSub:        { fontSize: 13, color: '#a0a0b0', marginTop: 4 },

  // Search
  searchWrap:       { flexDirection: 'row', alignItems: 'center', backgroundColor: '#13132a',
                      borderRadius: 12, borderWidth: 1.5, borderColor: '#2a2a3e',
                      paddingHorizontal: 14, marginHorizontal: 20, marginVertical: 14 },
  searchInput:      { flex: 1, paddingVertical: 11, fontSize: 14, color: '#ffffff' },

  // Genre filter
  filterRow:        { paddingHorizontal: 20, marginBottom: 10 },
  filterChip:       { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
                      borderWidth: 1.5, borderColor: '#2a2a3e', backgroundColor: '#1a1a2e',
                      marginRight: 8 },
  filterChipActive: { borderColor: '#e50914', backgroundColor: '#e50914' },
  filterChipText:   { fontSize: 12, fontWeight: '600', color: '#a0a0b0' },
  filterChipTextActive: { color: '#ffffff' },

  // Movie card
  movieCard:        { flexDirection: 'row', backgroundColor: '#1a1a2e', borderRadius: 14,
                      marginHorizontal: 20, marginBottom: 10, padding: 14,
                      borderWidth: 1, borderColor: '#2a2a3e' },
  posterBox:        { width: 52, height: 70, borderRadius: 10, backgroundColor: '#13132a',
                      alignItems: 'center', justifyContent: 'center',
                      marginRight: 14, borderWidth: 1, borderColor: '#2a2a3e' },
  posterLabel:      { fontSize: 11, fontWeight: '800', color: '#e50914' },
  movieInfo:        { flex: 1, justifyContent: 'center' },
  movieTitle:       { fontSize: 15, fontWeight: '700', color: '#ffffff', marginBottom: 4 },
  movieGenre:       { fontSize: 12, color: '#a0a0b0', marginBottom: 6 },
  ratingRow:        { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ratingBadge:      { backgroundColor: '#f5c51822', borderRadius: 6,
                      paddingHorizontal: 7, paddingVertical: 2 },
  ratingText:       { fontSize: 12, fontWeight: '700', color: '#f5c518' },
  yearText:         { fontSize: 12, color: '#55556a' },
  chevron:          { fontSize: 20, color: '#55556a', marginLeft: 8, alignSelf: 'center' },

  // List
  listContent:      { paddingTop: 10, paddingBottom: 40 },

  // Empty
  emptyWrap:        { alignItems: 'center', paddingTop: 80, paddingHorizontal: 40 },
  emptyTitle:       { fontSize: 18, fontWeight: '700', color: '#a0a0b0',
                      textAlign: 'center', marginBottom: 6 },
  emptyText:        { fontSize: 14, color: '#55556a', textAlign: 'center', lineHeight: 20 },

  // Back button
  backArrow:        { fontSize: 22, color: '#e50914', marginRight: 8 },
  backText:         { fontSize: 16, fontWeight: '600', color: '#e50914' },

  // Detail
  detailScroll:     { flex: 1, backgroundColor: '#0d0d1a' },
  detailHero:       { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20,
                      backgroundColor: '#1a1a2e', borderBottomWidth: 1, borderBottomColor: '#2a2a3e' },
  detailPoster:     { width: 90, height: 120, borderRadius: 16, backgroundColor: '#13132a',
                      alignItems: 'center', justifyContent: 'center',
                      marginBottom: 16, borderWidth: 1, borderColor: '#2a2a3e' },
  detailPosterLabel:{ fontSize: 13, fontWeight: '800', color: '#e50914' },
  detailTitle:      { fontSize: 24, fontWeight: '800', color: '#ffffff',
                      textAlign: 'center', marginBottom: 6 },
  detailGenre:      { fontSize: 14, color: '#a0a0b0', marginBottom: 14, textAlign: 'center' },
  detailBadgeRow:   { flexDirection: 'row', gap: 10 },
  detailBadge:      { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5 },
  detailBadgeText:  { fontSize: 13, fontWeight: '700' },

  detailBody:       { padding: 24 },
  sectionLabel:     { fontSize: 11, fontWeight: '700', letterSpacing: 1.2,
                      color: '#55556a', textTransform: 'uppercase', marginBottom: 8 },
  sectionText:      { fontSize: 15, color: '#c0c0d0', lineHeight: 24, marginBottom: 24 },
  metaCard:         { backgroundColor: '#1a1a2e', borderRadius: 14, padding: 18,
                      borderWidth: 1, borderColor: '#2a2a3e', marginBottom: 24 },
  metaRow:          { flexDirection: 'row', justifyContent: 'space-between',
                      paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#2a2a3e' },
  metaRowLast:      { borderBottomWidth: 0 },
  metaKey:          { fontSize: 13, color: '#55556a', fontWeight: '600' },
  metaVal:          { fontSize: 13, color: '#ffffff', fontWeight: '600',
                      textAlign: 'right', flex: 1, marginLeft: 12 },
});
