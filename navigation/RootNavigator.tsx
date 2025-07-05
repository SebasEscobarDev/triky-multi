import { useAuth } from '@/context/AuthContext';
import { GameMatchProvider } from '@/context/GameMatchContext';
import AppTabs from '@/navigation/AppTabs';
import AuthStack from '@/navigation/AuthStack';
import MatchSearchAlert from '@/components/ui/MatchSearchAlert';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

export default function RootNavigator() {
  const { user, loading } = useAuth();
  const theme = useTheme();

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <GameMatchProvider>
      <>
        {user ? (
          <>
            <AppTabs />
            <MatchSearchAlert />
          </>
        ) : (
          <AuthStack />
        )}
      </>
    </GameMatchProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});