import React from 'react';
import { StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { colors } from './src/constants/colors';
import { fontSizes } from './src/constants/fonts';
import PageHome from './src/pages/Home';
import PageSettings from './src/pages/Settings';

Navigation.registerComponent('Home', () => PageHome);
Navigation.registerComponent('Settings', () => PageSettings);

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: colors.statusBarColor
  },
  topBar: {
    title: {
      color: colors.white
    },
    backButton: {
      color: colors.white
    },
    background: {
      color: colors.statusBarColor
    }
  },
  bottomTab: {
    fontSize: fontSizes.large,
    selectedFontSize: fontSizes.extraLarge
  }
});

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Home'
                  }
                },
              ]
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Settings'
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});