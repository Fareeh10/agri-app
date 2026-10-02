import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PostCard({ post }) {
  return (
    <View style={styles.card}>

      {/* User information */}
      <View style={styles.userRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {post.user.name.charAt(0)}
          </Text>
        </View>

        <View>
          <Text style={styles.userName}>
            {post.user.name}
          </Text>

          <Text style={styles.time}>
            {post.time}
          </Text>
        </View>
      </View>

      {/* Post content */}
      <Text style={styles.content}>
        {post.content}
      </Text>

      {post.image && (
        <Image
            source={post.image}
            style={styles.postImage}
        />
      )}

      {/* Actions */}
      <View style={styles.actions}>

        <Pressable style={styles.action}>
          <Ionicons
            name="heart-outline"
            size={22}
            color="#555"
          />
          <Text style={styles.actionText}>
            {post.likes}
          </Text>
        </Pressable>

        <Pressable style={styles.action}>
          <Ionicons
            name="chatbubble-outline"
            size={21}
            color="#555"
          />
          <Text style={styles.actionText}>
            {post.comments}
          </Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF7EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#35AA47',
  },

  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },

  time: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },

  content: {
    fontSize: 16,
    lineHeight: 23,
    color: '#222',
    marginBottom: 16,
  },

  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    gap: 25,
  },

  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  actionText: {
    fontSize: 14,
    color: '#555',
  },

  postImage: {
  width: '100%',
  height: 200,
  borderRadius: 12,
  resizeMode: 'cover',
  marginBottom: 14,
},
});