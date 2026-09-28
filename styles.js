import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1115',
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    color: '#8A8F98',
    fontSize: 14,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 2,
  },

  // Portfolio balance card
  balanceCard: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: '#1B1E24',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#272B33',
  },
  balanceLabel: {
    color: '#8A8F98',
    fontSize: 13,
  },
  balanceValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 6,
  },
  balanceChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  balanceChangeBadge: {
    backgroundColor: 'rgba(52, 199, 89, 0.15)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
  },
  balanceChangeText: {
    color: '#34C759',
    fontSize: 13,
    fontWeight: '600',
  },
  balancePeriodText: {
    color: '#8A8F98',
    fontSize: 13,
  },

  // Quick actions
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 18,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1B1E24',
    borderRadius: 14,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#272B33',
  },
  actionIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  actionLabel: {
    color: '#D0D3D9',
    fontSize: 12,
    fontWeight: '600',
  },

  // Section
  section: {
    marginTop: 26,
    paddingHorizontal: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  seeAllText: {
    color: '#5B8DEF',
    fontSize: 13,
    fontWeight: '600',
  },

  // Category chips
  chipsRow: {
    flexDirection: 'row',
  },
  chip: {
    backgroundColor: '#1B1E24',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#272B33',
  },
  chipActive: {
    backgroundColor: '#5B8DEF',
    borderColor: '#5B8DEF',
  },
  chipText: {
    color: '#8A8F98',
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },

  // Market list rows
  assetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1E24',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#272B33',
  },
  assetIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assetIconText: {
    fontSize: 18,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  assetSymbol: {
    color: '#8A8F98',
    fontSize: 12,
    marginTop: 2,
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  assetPrice: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  assetChangePositive: {
    color: '#34C759',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  assetChangeNegative: {
    color: '#FF453A',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },

  // Bottom nav (static)
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#1B1E24',
    borderTopWidth: 1,
    borderTopColor: '#272B33',
  },
  navIcon: {
    fontSize: 20,
  },
  navIconActive: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 11,
    color: '#8A8F98',
    marginTop: 2,
  },
  navLabelActive: {
    fontSize: 11,
    color: '#5B8DEF',
    marginTop: 2,
    fontWeight: '600',
  },
});

export default styles;
