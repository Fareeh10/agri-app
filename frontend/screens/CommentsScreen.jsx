import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function CommentsScreen({ route, navigation }) {
  const { postId } = route.params;

  const [comments, setComments] = useState([]);
  const [expandedReplies, setExpandedReplies] = useState({});
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/comments/${postId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  // This function toggles the visibility of a comment's replies.
  // It updates the expandedReplies state object by flipping the boolean
  // for the given comment ID. If a comment was collapsed, it becomes open,
  // and if it was open, it becomes collapsed.
  // Example: { "abc123": true } means the replies for comment abc123 are visible.
  const toggleReplies = (commentId) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const getReplies = (commentId) => {
    return comments.filter(
      (comment) => comment.parentCommentId === commentId
    );
  };

  const formatTimestamp = (value) => {
    
    const date = new Date(value);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000); //1000 miliseconds in 1 second

    // 1. Seconds
    if (diffInSeconds < 60) return 'Just now';

    // 2. Minutes
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    // 3. Hours
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    // 4. Days (Up to 6 days)
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    // 5. Weeks (7 days up to 27 days)
    const weeks = Math.floor(days / 7);
    if (days < 28) return `${weeks}w ago`;

    // 6. Months (28 days up to 11 months)
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    // 7. Years Fallback
    const years = Math.floor(months / 12);
    return `${years}y ago`;
      //return date.toLocaleDateString();
      // The date.toLocaleDateString() method converts a Date object into a human-readable date string formatted according to the user's specific location and language settings (locale).
      // While a standard JavaScript Date object tracks the exact hour, minute, and second, toLocaleDateString() completely ignores the time and only returns the calendar date.
    
  };

  const renderComment = ({ item }) => {
    // Replies are rendered underneath their parent comment,
    // so only top-level comments belong in the main list.
    if (item.parentCommentId) return null;

    const replies = getReplies(item._id);
    const isExpanded = expandedReplies[item._id];

    return (
      <View style={styles.commentWrapper}>
        {/* Main comment */}
        <View style={styles.comment}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={20} color="#777" />
          </View>

          <View style={styles.commentBody}>
            <View style={styles.commentHeader}>
              <Text style={styles.userName}>
                @{item.authorId?.name || 'Unknown user'}
              </Text>

              <Text style={styles.time}>  {formatTimestamp(item.createdAt)}</Text>
            </View>

            <Text style={styles.commentText}>
              {item.content}
            </Text>

            <View style={styles.actions}>
              <Pressable style={styles.actionButton}
                onPress={() => {
                  // Handle like action here
                }}
              >
                <Ionicons
                  name="heart-outline"
                  size={22}
                  color="#555"
                />
                <Text style={styles.actionText}>{item.likes?.length ?? 0}</Text>
              </Pressable>

              <Pressable style={styles.replyButton}
                onPress={() => {
                  // Handle reply action here
                }}
              >
                <Text style={styles.replyText}>Reply</Text>
              </Pressable>
            </View>

            {/* Replies toggle */}
            {replies.length > 0 && (
              <Pressable
                style={styles.repliesButton}
                onPress={() => toggleReplies(item._id)}
              >
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={17}
                  color="#35AA47"
                />
                <Text style={styles.repliesText}>
                  {isExpanded
                    ? 'Hide replies'
                    : `View ${replies.length} ${
                        replies.length === 1 ? 'reply' : 'replies'
                      }`}
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Replies */}
        {isExpanded && replies.length > 0 && (
          <View style={styles.repliesContainer}>
            {replies.map((reply) => (
              <View key={reply._id} style={styles.replyComment}>
                <View style={styles.replyLine} />

                <View style={styles.avatarSmall}>
                  <Ionicons name="person" size={16} color="#777" />
                </View>

                <View style={styles.commentBody}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.userName}>
                      @{reply.authorId?.name || 'Unknown user'}
                    </Text>

                    <Text style={styles.time}>  {formatTimestamp(reply.createdAt)}</Text>
                  </View>

                  <Text style={styles.commentText}>
                    {reply.content}
                  </Text>

                  <View style={styles.actions}>
                    <Pressable style={styles.actionButton}
                      onPress={() => {
                        // Handle like action here
                      }}
                    >
                      <Ionicons
                        name="heart-outline"
                        size={20}
                        color="#555"
                      />
                      <Text style={styles.actionText}>{reply.likes?.length ?? 0}</Text>
                    </Pressable>

                    <Pressable style={styles.replyButton}>
                      <Text style={styles.replyText}>Reply</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={25} color="#222" />
          </Pressable>

          <Text style={styles.title}>Comments</Text>

        </View>

        {/* Comments */}
        <FlatList
          data={comments.filter((comment) => !comment.parentCommentId)}
          keyExtractor={(item) => item._id}
          renderItem={renderComment}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !loading ? (
              <View style={styles.empty}>
                <Ionicons
                  name="chatbubble-outline"
                  size={42}
                  color="#aaa"
                />
                <Text style={styles.emptyText}>
                  No comments yet
                </Text>
                <Text style={styles.emptySubtext}>
                  Be the first to comment!
                </Text>
              </View>
            ) : null
          }
        />

        {/* Comment input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write a comment..."
            placeholderTextColor="#999"
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />

          <Pressable style={styles.sendButton}>
            <Ionicons name="send" size={20} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  commentWrapper: {
    width: '100%',
  },

  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap : 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  title: {
    fontSize: 19,
    fontWeight: '700',
    color: '#222',
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerButton: {
    marginLeft: 16,
  },

  list: {
    paddingVertical: 8,
    paddingHorizontal: 0,
    flexGrow: 1,
  },

  comment: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  commentBody: {
    flex: 1,
  },

  userName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },

  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 20,
  },

  time: {
    fontSize: 12,
    color: '#777',
  },

  moreButton: {
    marginLeft: 'auto',
    paddingLeft: 12,
  },

  commentText: {
    fontSize: 15,
    color: '#222',
    lineHeight: 21,
    marginTop: 4,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
    minHeight: 28,
  },

  actionText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 5,
  },

  replyButton: {
    paddingHorizontal: 4,
    paddingVertical: 5,
  },

  replyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },

  repliesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 7,
    paddingVertical: 4,
    paddingRight: 8,
  },

  repliesText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#35AA47',
    marginLeft: 4,
  },

  repliesContainer: {
    marginLeft: 68,
    marginBottom: 4,
  },

  replyComment: {
    flexDirection: 'row',
    paddingRight: 16,
    paddingVertical: 9,
    position: 'relative',
  },

  replyLine: {
    position: 'absolute',
    left: -15,
    top: 0,
    bottom: 18,
    width: 2,
    backgroundColor: '#ddd',
  },

  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 10,
  },

  emptySubtext: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 100,
    backgroundColor: '#f1f1f1',
    borderRadius: 21,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#222',
    marginRight: 8,
  },

  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#35AA47',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
  },
});