import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import PostCard from '../components/PostCard';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function CommunityScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    const content = (post.content || '').toLowerCase();
    const author = (post.authorId?.name || '').toLowerCase();

    return content.includes(query) || author.includes(query);
  });


  useEffect(() => {
    const fetchPosts = async () => {
// async function fetchPosts() { alternative way to write function
//   // ...
// }
      try {

          const response = await fetch(`${API_URL}/api/posts`); //The backend sends an HTTP response back.

          // response.status.  eg:404,200
          // response.ok.  //For successful HTTP statuses ok is true
          // response.headers
          // response.json()

          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }

          const data = await response.json(); //becoz backend sends data as JSON.

          setPosts(data);
        } 
        catch (error) {
          console.error('Error fetching posts:', error);
          setError(error.message);
        } 
        finally {
          setLoading(false);
      }
    };

    fetchPosts(); //The fetchPosts function is called when the component mounts. It fetches posts from the backend API and updates the state accordingly.
  }, []); //The empty dependency array means this effect runs only once when the component mounts.

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text>Loading posts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text>Failed to load posts</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#7b7b7b" />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search posts or people..."
          placeholderTextColor="#8a8a8a"
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.posts}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={post._id}
                post={{
                  id: post._id,
                  user: {
                    name: post.authorId?.name || 'Unknown user',
                  },
                  time: new Date(post.createdAt).toLocaleString(),
                  content: post.content,
                  image: post.image || null,
                  likes: post.likes?.length || 0,
                  comments: 0,
                }}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No matching posts found</Text>
            </View>
          )}
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

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#111',
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },

  emptyText: {
    color: '#666',
    fontSize: 14,
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

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});