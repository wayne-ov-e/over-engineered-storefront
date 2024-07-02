import { NavLink, Link } from '@remix-run/react';
import { useRootLoaderData } from '~/root';
import styles from '~/styles/components/Footer.module.css';

/**
 * @param {FooterQuery & {shop: HeaderQuery['shop']}}
 */
export function Footer({ menu, secondaryMenu, shop }) {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.footer_grid} items-center`}>

                <div className='col-span-2'><p className="text-cloud-dancer leading-none max-[900px]:text-[1.2rem]">© 2023 OVER-ENGINEERED</p></div>
                <SecondaryFooterMenu menu={secondaryMenu} primaryDomainUrl={shop.primaryDomain.url} />
                <FooterMenu menu={menu} primaryDomainUrl={shop.primaryDomain.url} />
                <MobileFooter menu={menu} primaryDomainUrl={shop.primaryDomain.url} />
            </div>
        </footer>
    );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 * }}
 */
function FooterMenu({ menu, primaryDomainUrl }) {
    const { publicStoreDomain } = useRootLoaderData();

    return (
        <nav className={`${styles.footer_menu} col-start-7 col-span-2 max-[900px]:hidden`} role="navigation">
            {menu.items.map((item) => {
                if (!item.url) return null;
                // if the url is internal, we strip the domain
                const url =
                    item.url.includes('myshopify.com') ||
                        item.url.includes(publicStoreDomain) ||
                        item.url.includes(primaryDomainUrl)
                        ? new URL(item.url).pathname
                        : item.url;
                const isExternal = !url.startsWith('/');
                return isExternal ? (
                    <a href={url} key={item.id} rel="noopener noreferrer" target="_blank" className={`mr-3`}>
                        {item.title}
                    </a>
                ) : (
                    <NavLink
                        end
                        key={item.id}
                        prefetch="intent"
                        to={url}
                        className={`mr-3`}
                    >
                        {item.title}
                    </NavLink>
                );
            })}
        </nav>
    );
}

/**
 * @param {{
 *   menu: SecondaryFooterMenu['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 * }}
 */
function SecondaryFooterMenu({ menu, primaryDomainUrl }) {
    const { publicStoreDomain } = useRootLoaderData();

    return (
        <nav className={`${styles.footer_menu} col-start-4 col-span-2 max-[900px]:hidden`} role="navigation">
            {menu.items.map((item) => {
                if (!item.url) return null;
                // if the url is internal, we strip the domain
                const url =
                    item.url.includes('myshopify.com') ||
                        item.url.includes(publicStoreDomain) ||
                        item.url.includes(primaryDomainUrl)
                        ? new URL(item.url).pathname
                        : item.url;
                const isExternal = !url.startsWith('/');
                return isExternal ? (
                    <a href={url} key={item.id} rel="noopener noreferrer" target="_blank" className={`mr-3`}>
                        {item.title}
                    </a>
                ) : (
                    <NavLink
                        end
                        key={item.id}
                        prefetch="intent"
                        to={url}
                        className={`mr-3`}
                    >
                        <span className="font-normal">{item.title}</span>
                    </NavLink>
                );
            })}
        </nav>
    );
}

/**
 * @param {{
 *   menu: SecondaryFooterMenu['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 * }}
 */
function MobileFooter({ menu, primaryDomainUrl }) {
    const { publicStoreDomain } = useRootLoaderData();

    return (
        <Link className="text-cloud-dancer leading-none max-[900px]:text-[1.2rem] min-[901px]:hidden">More+</Link>
    );
}

/**
const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};
*/

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
// function activeLinkStyle({isActive, isPending}) {
//   return {
//     fontWeight: isActive ? 'bold' : undefined,
//     color: isPending ? 'grey' : 'white',
//   };
// }

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
