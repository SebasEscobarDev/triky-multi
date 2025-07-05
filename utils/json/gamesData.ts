// Tipo para representar una partida en juego
export interface Game {
  id: string;
  player1: {
    name: string;
    photo?: string;
  };
  player2: {
    name: string;
    photo?: string;
  };
  isAI: boolean; // indica si el jugador 2 es la IA
  lastMove: string; // cuando fue el último movimiento
  yourTurn?: boolean; // true si es el turno del usuario actual
}

// Datos de partidas en juego
export const gamesData: Game[] = [
  {
    id: '1',
    player1: { name: 'Alex', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
    player2: { name: 'Sofia', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
    isAI: false,
    lastMove: 'hace 10 min',
    yourTurn: true,
  },
  {
    id: '2',
    player1: { name: 'Juan' },
    player2: { name: 'IA' },
    isAI: true,
    lastMove: 'hace 5 min',
    yourTurn: false,
  },
  {
    id: '3',
    player1: { name: 'Marta', photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
    player2: { name: 'IA' },
    isAI: true,
    lastMove: 'hace 30 min',
    yourTurn: true,
  },
  {
    id: '4',
    player1: { name: 'Carlos' },
    player2: { name: 'Ana', photo: 'https://randomuser.me/api/portraits/women/22.jpg' },
    isAI: false,
    lastMove: 'hace 1 hr',
    yourTurn: false,
  },
  {
    id: '5',
    player1: { name: 'Lucia', photo: 'https://randomuser.me/api/portraits/women/56.jpg' },
    player2: { name: 'IA' },
    isAI: true,
    lastMove: 'hace 3 hrs',
    yourTurn: false,
  },
  {
    id: '6',
    player1: { name: 'Roberto', photo: 'https://randomuser.me/api/portraits/men/91.jpg' },
    player2: { name: 'Maria', photo: 'https://randomuser.me/api/portraits/women/33.jpg' },
    isAI: false,
    lastMove: 'hace 15 min',
    yourTurn: true,
  },
  {
    id: '7',
    player1: { name: 'Daniela', photo: 'https://randomuser.me/api/portraits/women/27.jpg' },
    player2: { name: 'IA' },
    isAI: true,
    lastMove: 'hace 45 min',
    yourTurn: false,
  },
  {
    id: '8',
    player1: { name: 'Miguel' },
    player2: { name: 'Laura', photo: 'https://randomuser.me/api/portraits/women/62.jpg' },
    isAI: false,
    lastMove: 'hace 2 hrs',
    yourTurn: true,
  },
  {
    id: '9',
    player1: { name: 'Pedro', photo: 'https://randomuser.me/api/portraits/men/54.jpg' },
    player2: { name: 'IA' },
    isAI: true,
    lastMove: 'hace 20 min',
    yourTurn: false,
  },
  {
    id: '10',
    player1: { name: 'Carmen', photo: 'https://randomuser.me/api/portraits/women/18.jpg' },
    player2: { name: 'Gabriel', photo: 'https://randomuser.me/api/portraits/men/78.jpg' },
    isAI: false,
    lastMove: 'hace 8 min',
    yourTurn: true,
  },
];
