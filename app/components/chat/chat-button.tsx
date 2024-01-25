import { MessageSquare } from 'lucide-react';
import { Button } from '../(ui)/button';

export function ChatButton() {
  const unreadCount = 0;

  return (
    <Button variant="toolbar" className="relative">
      <MessageSquare className="h-5" />
      {unreadCount > 0 && (
        <span
          role="status"
          aria-label={`Es gibt ${
            unreadCount < 10 ? unreadCount : ''
          } ungelesene Nachricht(en).`}
          className="absolute -top-2 -right-3 bg-ca-solid rounded-full h-5 w-5 text-app-accent text-sm font-semibold"
        >
          {unreadCount < 10 ? unreadCount : '!'}
        </span>
      )}
    </Button>
  );
}
