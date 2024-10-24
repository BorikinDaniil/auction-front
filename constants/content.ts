// Types
import { AuthDescriptionType } from '@Types/content';

export const LOGIN_DESCRIPTION:AuthDescriptionType = {
  title: 'Welcome back!',
  description: "Welcome back! We're thrilled to see you again. Log in to Bidbuyy and resume your journey into the world of exclusive auctions. Your next winning bid could be just a click away. Happy bidding!",
  linkAnswer: 'Don’t have an account?',
  linkText: 'Signup here',
  link: '/auth/registration',
};

export const REGISTRATION_DESCRIPTION:AuthDescriptionType = {
  title: 'Create Account',
  description: 'Create an account to dive into the world of auctions and unveil hidden treasures. As a member of Bidbuyy, you\'ll gain exclusive access to bid on unique, one-of-a-kind items, from vintage gems to intriguing antiques. Don\'t miss out on the excitement – sign up now and embark on a journey where every bid is a step closer to uncovering extraordinary finds! Join the auction adventure today!',
  linkAnswer: 'Already have an account?',
  linkText: 'Login here',
  link: '/auth/login',
};