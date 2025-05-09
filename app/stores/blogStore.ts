import { create } from 'zustand';
import { formatDistanceToNow } from 'date-fns';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  likes: string[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  author: User;
  createdAt: string;
  likes: string[];
  comments: Comment[];
  isBookmarked: boolean;
}

interface BlogState {
  currentUser: User;
  posts: Post[];
  getPostById: (id: string) => Post | undefined;
  addPost: (postData: { title: string; content: string; imageUrl: string | null }) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  toggleBookmark: (postId: string) => void;
}

// Mock data
const currentUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  username: 'alexj',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'
};

const users: User[] = [
  currentUser,
  {
    id: 'user2',
    name: 'Sara Wilson',
    username: 'saraw',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'user3',
    name: 'Miguel Rodriguez',
    username: 'miguelr',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const initialPosts: Post[] = [
  {
    id: 'post1',
    title: 'The Art of React Native',
    content: 'React Native has transformed the way we build mobile applications. With a single codebase, developers can create apps for both iOS and Android platforms. This cross-platform approach not only saves time but also ensures consistency across different devices.',
    imageUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: users[1],
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), 
    likes: ['user1', 'user3'],
    comments: [
      {
        id: 'comment1',
        content: 'Great insights! Looking forward to more articles on this topic.',
        author: users[2],
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        likes: ['user1']
      }
    ],
    isBookmarked: true
  },
  {
    id: 'post2',
    title: 'Mastering Tailwind CSS',
    content: 'Tailwind CSS has revolutionized the way developers style their applications. Its utility-first approach allows for rapid UI development without leaving your HTML (or JSX). By leveraging Tailwind, you can build custom designs without writing custom CSS.',
    imageUrl: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: users[2],
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    likes: ['user2'],
    comments: [],
    isBookmarked: false
  },
  {
    id: 'post3',
    title: 'The Future of Mobile Development',
    content: 'The mobile development landscape is continuously evolving. From cross-platform frameworks to native technologies, developers have a wide range of options to choose from. Understanding the strengths and weaknesses of each approach is crucial for making informed decisions.',
    imageUrl: null,
    author: users[0],
    createdAt: new Date(Date.now() - 86400000).toISOString(), 
    likes: [],
    comments: [
      {
        id: 'comment2',
        content: 'What are your thoughts on Flutter vs React Native?',
        author: users[1],
        createdAt: new Date(Date.now() - 43200000).toISOString(), 
        likes: []
      },
      {
        id: 'comment3',
        content: 'Both have their strengths. React Native has a larger community, while Flutter offers more consistent rendering.',
        author: users[0],
        createdAt: new Date(Date.now() - 21600000).toISOString(),
        likes: ['user2']
      }
    ],
    isBookmarked: false
  }
];

export const useBlogStore = create<BlogState>((set, get) => ({
  currentUser,
  posts: initialPosts,
  
  getPostById: (id) => {
    return get().posts.find(post => post.id === id);
  },
  
  addPost: (postData) => {
    const newPost: Post = {
      id: `post${Date.now()}`,
      title: postData.title,
      content: postData.content,
      imageUrl: postData.imageUrl,
      author: currentUser,
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      isBookmarked: false
    };
    
    set(state => ({
      posts: [newPost, ...state.posts]
    }));
  },
  
  toggleLike: (postId) => {
    set(state => {
      const updatedPosts = state.posts.map(post => {
        if (post.id === postId) {
          const isLiked = post.likes.includes(currentUser.id);
          return {
            ...post,
            likes: isLiked
              ? post.likes.filter(id => id !== currentUser.id)
              : [...post.likes, currentUser.id]
          };
        }
        return post;
      });
      
      return { posts: updatedPosts };
    });
  },
  
  addComment: (postId, content) => {
    set(state => {
      const newComment: Comment = {
        id: `comment${Date.now()}`,
        content,
        author: currentUser,
        createdAt: new Date().toISOString(),
        likes: []
      };
      
      const updatedPosts = state.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      });
      
      return { posts: updatedPosts };
    });
  },
  
  toggleBookmark: (postId) => {
    set(state => {
      const updatedPosts = state.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isBookmarked: !post.isBookmarked
          };
        }
        return post;
      });
      
      return { posts: updatedPosts };
    });
  }
}));