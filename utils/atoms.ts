import { ticket } from '@/utils/types';
import { atom } from 'jotai';

export const ticketsAtom = atom<ticket[]>([]);