import styles from '~/styles/components/NavigationMenuMobile.module.css';
import { NavLink } from '@remix-run/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavigationMenuMobile({ menu, navOpen, products }) {
    const menuMotion = {
        initial: {
            scaleY: 0,
        },
        animate: {
            scaleY: 1,
            transition: {
                duration: 0.4,
                ease: [0.8, 0.1, 0, 0.8],
            }
        },
        exit: {
            scaleY: 0,
            transition: {
                duration: 0.3,
                ease: [0.7, 0.5, 0.3, 0.1],
            }
        }
    }

    const containerVars = {
        initial: {
        },
        animate: {
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.05,
                staggerDirection: 1,
            }
        },
        exit: {
            transition: {
                staggerDirection: -1,
            }
        }
    }

    const productLinkMotion = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: [0.6, 0.1, 1, 0.5],
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.1,
            }
        }
    }

    return (
        <>
            <AnimatePresence>
                {navOpen && (
                    <motion.div
                        className={`${styles.mobile_menu} -z-10 origin-top min-[901px]:hidden pt-[11.7rem]`}
                        variants={menuMotion}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                    >
                        <motion.div variants={containerVars} initial='initial' animate='animate' exit='exit'>
                            <div className='overflow-hidden mb-[1rem]'>
                                <motion.div
                                    className={`${styles.mobile_menu_name_row} flex justify-between text-drizzle pb-[0.6rem]`}
                                    variants={productLinkMotion}
                                >
                                    <h3 className='translate-y-[0.15rem]'>Unique Identifier</h3>
                                    <h3 className='translate-y-[0.15rem]'>Production Stage</h3>
                                </motion.div>
                            </div>

                            {products.nodes.map((product) => {
                                return (
                                    <div className='overflow-hidden' key={product.id}>
                                        <motion.div
                                            className={`${styles.mobile_menu_item_row} pt-[0.6rem] pb-[0.6rem] flex justify-between`}
                                            variants={productLinkMotion}
                                        >
                                            <h3-n> className='translate-y-[0.15rem]'>{product.title}</h3-n>
                                            <h3 className={`translate-y-[0.15rem] ${product.productionStage.value == 'In stock' ? 'text-orange-016-c' : ''}`}>{product.productionStage.value}</h3>
                                        </motion.div>
                                    </div>
                                );
                            })}

                            <div className='mt-[5.5rem] text-[2.4rem] leading-[2.4rem]'>
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
                                        item.title !== 'Products' && (
                                            <div className='overflow-hidden' key={item.id}>
                                                <motion.div
                                                    className='pb-[0.5rem] pt-[0.5rem]'
                                                    variants={productLinkMotion}
                                                >
                                                    <NavLink
                                                        end
                                                        prefetch="intent"
                                                        to={url}
                                                    >
                                                        <div className={`relative ${item.title == 'Products' && 'mr-[0.5rem]'} `}>
                                                            {item.title}
                                                            {item.title == 'Products' && (<div className="absolute text-[0.8rem] top-[-0.8rem] right-[-0.5rem]">{productCount}</div>)}
                                                        </div>
                                                    </NavLink>
                                                </motion.div>
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}