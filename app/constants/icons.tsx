import {
  Home,
  LogOut,
  Settings,
  User,
  MessageCircle,
  Book,
} from "lucide-react-native";

export const icons = {
  home: (props: any) => <Home size={24} {...props} />,
  chat: (props: any) => <MessageCircle size={24} {...props} />,
  blog: (props: any) => <Book size={24} {...props} />,
  settings: (props: any) => <Settings size={24} {...props} />,
  profile: (props: any) => <User size={24} {...props} />,
  logout: (props: any) => <LogOut size={24} {...props} />,
};
