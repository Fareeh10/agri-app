import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import PostCard from '../components/PostCard';

const posts = [
  {
    id: '1',
    user: {
      name: 'Rahul',
    },
    time: '2 hours ago',
    content: 'My tomato plants are growing really well this season! 🍅',
    image: require('../assets/posts/image.png'),
    likes: 24,
    comments: 5,
  },

  {
    id: '2',
    user: {
      name: 'Anu',
    },
    time: '5 hours ago',
    content:
      'What fertilizer would you recommend for rice during the early growth stage?',
    image: null,
    likes: 12,
    comments: 8,
  },

  {
    id: '3',
    user: {
      name: 'Midhun',
    },
    time: 'Yesterday',
    content:
      'Sharing a photo of my new vegetable garden. 🌱',
    image: require('../assets/posts/garden.png'),
    likes: 31,
    comments: 6,
  },

  {
    id: '4',
    user: {
      name: 'Fathima',
    },
    time: 'Yesterday',
    content:
      'Has anyone dealt with pests attacking their chilli plants? Looking for some advice.',
    image: null,
    likes: 17,
    comments: 11,
  },
];

export default function CommunityScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Community</Text>

            <Text style={styles.subtitle}>
              Connect, share and learn from farmers
            </Text>
          </View>

          <Pressable style={styles.addButton}>
            <Ionicons
              name="add"
              size={26}
              color="#fff"
            />
          </Pressable>
        </View>

        {/* Posts */}
        <View style={styles.posts}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 22,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#35AA47',
    justifyContent: 'center',
    alignItems: 'center',
  },

  posts: {
    gap: 0,
  },
});