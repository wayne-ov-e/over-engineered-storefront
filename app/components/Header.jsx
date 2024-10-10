import { Await, Link, NavLink, useLoaderData } from '@remix-run/react';
import { Suspense, useState } from 'react';
import { useLocation } from '@remix-run/react';
import { useRootLoaderData } from '~/root';
import styles from '~/styles/components/Header.module.css';
import NavigationMenu from './NavigationMenu';
import NavigationMenuMobile from './NavigationMenuMobile';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @param {HeaderProps}
 */
export function Header({ header, isLoggedIn, cart }) {
    const [navOpen, setNavOpen] = useState(false);
    const { shop, menu } = header;
    const { productList } = useLoaderData();
    const { products } = productList;

    function closeNavigationMenu() {
        if (!navOpen) {
            return;
        }

        setNavOpen(false);
        document.body.style.overflow = navOpen ? 'auto' : 'hidden';
    }

    function isMobile() {
        return window.innerWidth <= 900;
    }

    function toggleMobileMenu() {
        document.body.style.overflow = navOpen ? 'auto' : 'hidden';

        if (navOpen) {
            setNavOpen(false);
            return;
        }

        setNavOpen(true);
    }

    const headerMotion = {
        animate: {
            color: navOpen ? '#F1F0EC' : '#000',
            transition: {
                duration: 0.3,
                ease: [0.8, 0.1, 0, 0.8],
            }
        },
    }

    const blockMotion = {
        animate: {
            backgroundColor: navOpen ? '#F1F0EC' : '#000',
            transition: {
                duration: 0.3,
                ease: [0.8, 0.1, 0, 0.8],
            }
        },
    }

    return (
        <AnimatePresence>
            <motion.header
                className={`${styles.header}`}
                onMouseLeave={closeNavigationMenu}
                variants={headerMotion}
                animate='animate'
            >
                <motion.div className={`${styles.header_cube_left} max-[900px]:hidden`} variants={blockMotion} animate='animate'></motion.div>
                <div className={`${styles.header_grid} items-center`}>
                    <Link
                        className="logo col-span-2"
                        prefetch="intent"
                        to="/"
                        onClick={closeNavigationMenu}
                    >
                        <span className="max-[900px]:hidden">{shop.name}</span>
                        <span className="min-[901px]:hidden">ov_e</span>
                    </Link>
                    <HeaderMenu
                        menu={menu}
                        navOpen={navOpen}
                        setNavOpen={setNavOpen}
                        productCount={products.nodes.length}
                        viewport="desktop"
                        primaryDomainUrl={header.shop.primaryDomain.url}
                    />

                    <CartButton cart={cart} />
                </div>
                <motion.div
                    className={`${styles.header_cube_right} max-[900px]:mr-[1.6rem] max-[900px]:w-[1.68rem]`}
                    onMouseDown={isMobile ? toggleMobileMenu : undefined}
                    variants={blockMotion}
                    animate='animate'
                >
                </motion.div>

                <NavigationMenu
                    navOpen={navOpen}
                    products={products}
                    closeNavigationMenu={closeNavigationMenu}
                />

                <NavigationMenuMobile
                    menu={menu}
                    navOpen={navOpen}
                    products={products}
                    closeNavigationMenu={closeNavigationMenu}
                />
            </motion.header>
        </AnimatePresence>
    );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 * }}
 */
export function HeaderMenu({ menu, primaryDomainUrl, viewport, navOpen, setNavOpen, productCount }) {
    const { publicStoreDomain } = useRootLoaderData();
    const className = `col-start-4 col-span-2 flex max-[900px]:hidden`;
    const currentURL = useLocation().pathname;

    function openNavigationMenu() {
        if (navOpen) {
            return;
        }

        setNavOpen(true);
    }

    return (
        <nav className={className} role="navigation">
            {menu.items.map((item) => {
                if (!item.url) return null;

                // if the url is internal, we strip the domain
                const url =
                    item.url.includes('myshopify.com') ||
                        item.url.includes(publicStoreDomain) ||
                        item.url.includes(primaryDomainUrl)
                        ? new URL(item.url).pathname
                        : item.url;
                return (
                    <NavLink
                        className={`${styles.header_menu_item} mr-[1.5rem]`}
                        end
                        key={item.id}
                        onMouseEnter={item.title == 'Products' ? openNavigationMenu : undefined}
                        prefetch="intent"
                        to={item.title === 'Products' ? currentURL : url}
                    >
                        <div className={`relative ${item.title == 'Products' && 'mr-[0.4em]'} `}>
                            {item.title}
                            {item.title === 'Products' && (<div className="absolute text-[0.6em] top-[-0.8em] right-[-0.8em]">{productCount}</div>)}
                        </div>
                    </NavLink>
                );
            })}
        </nav>
    );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartButton({ cart }) {
    return (
        <NavLink className={`${styles.header_menu_item} col-start-8 flex justify-end relative mr-[0.5em] max-[900px]:mr-15`} to="/cart" prefetch='intent' end>
            <div>Cart<div className={`absolute text-[0.6em] top-[-1em] right-[-0.8em]`}>{cart?.totalQuantity || 0}</div></div>
        </NavLink>
    );
}


// /**
//  * @param {{
//  *   isActive: boolean;
//  *   isPending: boolean;
//  * }}
//  */
// function activeLinkStyle({isActive, isPending}) {
//   return {
//     fontWeight: isActive ? 'bold' : undefined,
//     color: isPending ? 'grey' : 'black',
//   };
// }

/** @typedef {Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>} HeaderProps */
/** @typedef {'desktop' | 'mobile'} Viewport */

/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('./Layout').LayoutProps} LayoutProps */
