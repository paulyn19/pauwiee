import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import styles from './styles';

// Static placeholder data — UI layout only, no backend/API involved
const QUICK_ACTIONS = [
  { icon: '➕', label: 'Deposit' },
  { icon: '➖', label: 'Withdraw' },
  { icon: '🔄', label: 'Swap' },
  { icon: '📊', label: 'Stats' },
];

const CATEGORIES = ['All', 'Crypto', 'Stocks', 'ETFs', 'Watchlist'];

const ASSETS = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    bg: '#F7931A22',
    price: '$67,240.50',
    change: '+2.4%',
    positive: true,
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'Ξ',
    bg: '#627EEA22',
    price: '$3,412.10',
    change: '+1.1%',
    positive: true,
  },
  {
    id: '3',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    icon: '🍎',
    bg: '#A2AAAD22',
    price: '$228.75',
    change: '-0.6%',
    positive: false,
  },
  {
    id: '4',
    name: 'Solana',
    symbol: 'SOL',
    icon: '◎',
    bg: '#9945FF22',
    price: '$142.88',
    change: '-1.8%',
    positive: false,
  },
  {
    id: '5',
    name: 'Tesla, Inc.',
    symbol: 'TSLA',
    icon: '⚡',
    bg: '#E82127 22',
    price: '$254.30',
    change: '+3.2%',
    positive: true,
  },
];

export default function MarketScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good evening, Maya</Text>
          <Text style={styles.headerTitle}>Markets</Text>
        </View>

        {/* Portfolio balance card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Portfolio Value</Text>
          <Text style={styles.balanceValue}>$24,891.32</Text>
          <View style={styles.balanceChangeRow}>
            <View style={styles.balanceChangeBadge}>
              <Text style={styles.balanceChangeText}>+$482.10 (1.98%)</Text>
            </View>
            <Text style={styles.balancePeriodText}>past 24h</Text>
          </View>
        </View>

        {/* Quick actions */}
        <View style={styles.actionsRow}>
          {QUICK_ACTIONS.map((action) => (
            <View key={action.label} style={styles.actionButton}>
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </View>
          ))}
        </View>

        {/* Category chips */}
        <View style={styles.section}>
          <View style={styles.chipsRow}>
            {CATEGORIES.map((category, index) => (
              <View
                key={category}
                style={[styles.chip, index === 0 && styles.chipActive]}
              >
                <Text
                  style={[
                    styles.chipText,
                    index === 0 && styles.chipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Market list */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Top Assets</Text>
            <Text style={styles.seeAllText}>See all</Text>
          </View>

          {ASSETS.map((asset) => (
            <View key={asset.id} style={styles.assetCard}>
              <View
                style={[styles.assetIconWrap, { backgroundColor: asset.bg }]}
              >
                <Text style={styles.assetIconText}>{asset.icon}</Text>
              </View>
              <View style={styles.assetInfo}>
                <Text style={styles.assetName}>{asset.name}</Text>
                <Text style={styles.assetSymbol}>{asset.symbol}</Text>
              </View>
              <View style={styles.assetRight}>
                <Text style={styles.assetPrice}>{asset.price}</Text>
                <Text
                  style={
                    asset.positive
                      ? styles.assetChangePositive
                      : styles.assetChangeNegative
                  }
                >
                  {asset.change}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Static bottom nav */}
      <View style={styles.bottomNav}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.navIconActive}>📈</Text>
          <Text style={styles.navLabelActive}>Markets</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.navIcon}>💼</Text>
          <Text style={styles.navLabel}>Portfolio</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navLabel}>Settings</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
