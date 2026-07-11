import { Room, RoomId } from '../types/scene';

const BASE = import.meta.env.BASE_URL;

/** The interior scenes you walk into from the outdoor realm. */
export const ROOMS: readonly Room[] = [
  {
    id: 'hobbit-house',
    title: 'Portfolio Projects',
    subtitle: 'Everything built and shipped — pull up a chair by the fire',
    image: `${BASE}images/hobbit-house.jpg`,
    aspect: 1672 / 941,
    content: 'projects',
  },
  {
    id: 'tree',
    title: 'About Me',
    subtitle: 'The person behind the projects',
    image: `${BASE}images/in-the-tree.jpg`,
    aspect: 1672 / 941,
    content: 'about',
  },
  {
    id: 'castle',
    title: 'Resume & Contact',
    subtitle: 'The formal records, and how to reach me',
    image: `${BASE}images/in-castle.jpg`,
    aspect: 1672 / 941,
    content: 'resume-contact',
  },
] as const;

export const getRoom = (id: string | undefined): Room | undefined =>
  ROOMS.find((r) => r.id === id);

export const roomPath = (id: RoomId): string => `/in/${id}`;
