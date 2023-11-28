import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import { motion } from 'framer-motion';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
// import {CartMain} from '~/components/Cart';

const layoutVariants = {
  initial: (custom)=>({
    opacity: 0,
  }),
  animate: (custom)=>({
    opacity: 1,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      delay: custom * 0.5,
      duration: 0.5,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
    },
  }
};

const MotionHeader = motion(Header);

/**
 * @param {LayoutProps}
 */
export function Layout({cart, children = null, footer, header, isLoggedIn}) {
  return (
    <>
      <motion.div
        variants={layoutVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={0}
      >
        <Header
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
        />
      </motion.div>

      <motion.main
          className="pt-[9.302rem] max-[900px]:pt-[5.68rem]"
          variants={layoutVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={1}
      >
        {children}
      </motion.main>
      <Suspense>
        <Await resolve={footer}>
          {(footer) =>
            <motion.div
              variants={layoutVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0}
            >
              <Footer menu={footer.menu} shop={header.shop} />
            </motion.div>
          }
        </Await>
      </Suspense>
    </>
  );
}

// /**
// /**
//  * @param {{cart: LayoutProps['cart']}}
//  */
// function CartAside({cart}) {
//   return (
//     <Aside id="cart-aside" heading="CART">
//       <Suspense fallback={<p>Loading cart ...</p>}>
//         <Await resolve={cart}>
//           {(cart) => {
//             return <CartMain cart={cart} layout="aside" />;
//           }}
//         </Await>
//       </Suspense>
//     </Aside>
//   );
// }

/**
 * @typedef {{
 *   cart: Promise<CartApiQueryFragment | null>;
 *   children?: React.ReactNode;
 *   footer: Promise<FooterQuery>;
 *   header: HeaderQuery;
 *   isLoggedIn: boolean;
 * }} LayoutProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
