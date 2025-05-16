// components/CustomButton.tsx
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function CustomButton({ title, onPress, variant = 'primary' }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, variant === 'secondary' && styles.secondaryButton]}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  secondaryText: {
    color: '#007AFF',
  },
});
