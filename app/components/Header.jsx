import { Await, Link, NavLink } from '@remix-run/react';
import { Suspense } from 'react';
import { useRootLoaderData } from '~/root';
import styles from '~/styles/components/Header.module.css';

/**
 * @param {HeaderProps}
 */
export function Header({ header, isLoggedIn, cart }) {
	const { shop, menu } = header;
	return (
		<header className={`${styles.header}`}>
			<div className={`${styles.header_cube_left} max-[900px]:hidden`}></div>
			<div className={`${styles.header_grid} items-center`}>
				<Link
					className="logo"
					prefetch="intent"
					to="/"
				>
					<span className="max-[900px]:hidden">{shop.name}</span>
					<span className="min-[901px]:hidden">ov_e</span>
				</Link>
				<HeaderMenu
					menu={menu}
					viewport="desktop"
					primaryDomainUrl={header.shop.primaryDomain.url}
				/>
			</div>
			<div className={`${styles.header_cube_right} max-[900px]:mr-[1.6rem] max-[900px]:w-[1.68rem]`}></div>
		</header>
	);
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 * }}
 */
export function HeaderMenu({ menu, primaryDomainUrl, viewport }) {
	const { publicStoreDomain } = useRootLoaderData();
	const className = `col-start-3 col-span-2 flex max-[900px]:hidden`;

	function closeAside(event) {
		if (viewport === 'mobile') {
			event.preventDefault();
			window.location.href = event.currentTarget.href;
		}
	}

	return (
		<nav className={className} role="navigation">
			{viewport === 'mobile' && (
				<NavLink
					onClick={closeAside}
					prefetch="intent"
					to="/"
					end
				>
					Home
				</NavLink>
			)}
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
						onClick={closeAside}
						prefetch="intent"
						to={url}
					>
						<div className={`relative ${item.title == 'Products' && 'mr-[0.5rem]'} `}>
							{item.title}
							{item.title == 'Products' && (<div className="absolute text-[0.8rem] top-[-0.8rem] right-[-0.5rem]">2</div>)}
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
function CartToggle({ cart }) {
	return (
		<Suspense fallback={<CartBadge count={0} />}>
			<Await resolve={cart}>
				{(cart) => {
					if (!cart) return <CartBadge count={0} />;
					return <CartBadge count={cart.totalQuantity || 0} />;
				}}
			</Await>
		</Suspense>
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
