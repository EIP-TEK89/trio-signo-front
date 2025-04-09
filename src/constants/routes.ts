export const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  COURSES: '/courses',
  COURSES_JOURNEY: {
    HOME: '/coursesJourney/home',
    QUESTS: '/coursesJourney/quests',
    LEAGUE: '/coursesJourney/league',
    PROFILE: '/coursesJourney/profile',
    TRAINING: '/coursesJourney/training',
    SHOP: '/coursesJourney/shop',
    DICTIONARY: '/coursesJourney/dictionary',
    DICTIONARY_DETAILS: '/coursesJourney/dictionary/:signId',
    LETTER_DETAILS: '/coursesJourney/dictionary/letter/:letter',
  },
} as const; 