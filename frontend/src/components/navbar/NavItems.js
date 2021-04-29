import {
  AiOutlineHome,
  AiOutlineUserAdd,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineUsergroupDelete,
} from 'react-icons/ai';
import {
  RiDashboardLine,
  RiLogoutCircleLine,
  RiLoginCircleLine,
} from 'react-icons/ri';
//import useCartCount from '../../hooks/useCartCount.hook';

export const getNavItems = (props) => ({
  common: [
    {
      label: 'Home',
      href: '/home',
      type: 'button',
      icon: <AiOutlineHome fontSize={28} />,
    },
  ],
  noAuth: [
    {
      label: 'Login',
      href: '/signin',
      type: 'button',
      buttonType: 'outlined',
      class: props.classes.signInButton,
      icon: <RiLoginCircleLine fontSize={28} />,
    },
    {
      label: 'Sign Up',
      href: '/signup',
      type: 'button',
      icon: <AiOutlineUserAdd fontSize={28} />,
      buttonType: 'contained',
      class: props.classes.signUpButton,
    },
  ],
  auth: [
    {
      label: (props.user && props.user.name) || 'User',
      icon: <AiOutlineUser fontSize={28} />,
      showInNavbar: false,
    },
    {
      label: 'Dashboard',
      icon: <RiDashboardLine fontSize={28} />,
      type: 'button',
      href: '/dashboard',
    },
    {
      label: `Cart`,
      icon: <RiDashboardLine fontSize={28} />,
      type: 'button',
      href: '/cart',
    },
    {
      label: 'Logout',
      icon: <RiLogoutCircleLine fontSize={28} />,
      type: 'button',
      buttonType: 'contained',
      class: props.classes.signUpButton,
      onClick: () => props.dispatch(props.logout()),
    },
  ],
  admin: [
    {
      label: (props.user && props.user.name) || 'User',
      icon: <AiOutlineUser fontSize={28} />,
      showInNavbar: false,
    },
    {
      label: 'Manage Chefs',
      icon: <AiOutlineUsergroupDelete fontSize={28} />,
      type: 'button',
      href: '/admin/chefs',
    },
    {
      label: 'Logout',
      icon: <RiLogoutCircleLine fontSize={28} />,
      type: 'button',
      buttonType: 'contained',
      class: props.classes.signUpButton,
      onClick: () => props.dispatch(props.logout()),
    },
  ],
});
