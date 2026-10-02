import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Modal
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function HomeHeader() {
   
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.header}>

      {/* Logo + App name */}
      <View style={styles.brandContainer}>

        <Image
          source={require('../assets/green.png')}
          style={styles.logo}
        />

        <View>
            <Text style={styles.appName}>AgriMithra</Text>
            {/* <Text style={styles.tagline}>Smart farming companion</Text> */}
        </View>
      </View>


      {/* settings button */}
      <Pressable
        style={styles.settingsButton}
        onPress={() => setShowMenu(!showMenu)}
        >
        <Ionicons
            name="ellipsis-vertical"
            size={22}
            color="#0f100f"
        />
       </Pressable>
       <Modal
            visible={showMenu}
            transparent
            animationType="fade"
            onRequestClose={() => setShowMenu(false)}
        >
            <Pressable
                style={styles.modalOverlay}
                onPress={() => setShowMenu(false)}
            >
                <View style={styles.dropdown}>
                <Pressable
                    style={styles.dropdownItem}
                    onPress={() => {
                    setShowMenu(false);
                    // Settings action
                    }}
                >
                    <Text style={styles.dropdownText}>Settings</Text>
                </Pressable>

                <Pressable
                    style={styles.dropdownItem}
                    onPress={() => {
                    setShowMenu(false);
                    // Help action
                    }}
                >
                    <Text style={styles.dropdownText}>Help</Text>
                </Pressable>

                <Pressable
                    style={styles.dropdownItem}
                    onPress={() => {
                    setShowMenu(false);
                    // About action
                    }}
                >
                    <Text style={styles.dropdownText}>About</Text>
                </Pressable>
                </View>
            </Pressable>
            </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 15,          // Cleaned up: applies 15 to top and bottom
  borderBottomWidth: 1,         // Fixed typo: added the 'r'
  borderBottomColor: '#bbb9b99a', // Added: pick any color you want here
  paddingLeft: 28,
  paddingRight: 33,
  marginBottom: 8,
},
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 15,
  },

  appName: {
    fontSize: 20,
    fontWeight: '600',
    // color: 'rgb(53, 170, 71)',
    // fontStyle : 'italic',
    align : 'right'
  },

  tagline: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },

  settingsButton: {     
    width: 45,     
    height: 45,     
    justifyContent: 'center',     
    alignItems: 'flex-end',   
    overflow: 'hidden',       // Crucial for keeping child components inside the circle
    },
    modalOverlay: {
  flex: 1,
  backgroundColor: 'transparent',
},

dropdown: {
  position: 'absolute',
  top: 70,
  right: 20,
  width: 160,
  backgroundColor: '#fff',
  borderRadius: 10,
  paddingVertical: 6,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 5,

  elevation: 5,
},

dropdownItem: {
  paddingVertical: 12,
  paddingHorizontal: 16,
},

dropdownText: {
  fontSize: 16,
  color: '#222',
},
    
});