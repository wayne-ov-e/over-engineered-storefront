import styles from '~/styles/components/NavigationMenu.module.css';
import { Link } from '@remix-run/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavigationMenu({ navOpen, products, closeNavigationMenu }) {
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

    return (
        <>
            <AnimatePresence>
                {navOpen && (
                    <motion.div
                        className={`${styles.table} -z-10 origin-top max-[900px]:hidden`}
                        variants={menuMotion}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                    >
                        <motion.div variants={containerVars} initial='initial' animate='animate' exit='exit'>

                            <div className={`overflow-hidden mb-[0.625rem]`}>
                                <motion.div
                                    variants={productLinkMotion}
                                    className={`${styles.table_name_row} pb-[0.375rem]`}
                                >
                                    <h3 className='translate-y-[0.15rem]'>Unique Identifier</h3>
                                    <h3 className='translate-y-[0.15rem] col-start-4'>Description</h3>
                                    <h3 className='translate-y-[0.15rem] col-start-6'>Product System</h3>
                                    <h3 className='translate-y-[0.15rem] col-start-7'>Year</h3>
                                    <h3 className='translate-y-[0.15rem] col-start-8'>Production Stage</h3>
                                </motion.div>
                            </div>
                            {products.nodes.map((product) => {
                                return (
                                    <div className={`overflow-hidden`} key={product.id}>
                                        <Link to={`/products/${product.title}`} prefetch='intent' onClick={closeNavigationMenu}>

                                            <motion.div
                                                variants={productLinkMotion}
                                                className={`${styles.table_item_row} pt-[0.375rem] pb-[0.375rem]`}
                                            >
                                                <h4 className='translate-y-[0.15rem]'>{product.title}</h4>
                                                <h3 className='translate-y-[0.15rem] col-start-4 col-span-2'>{product.shortDescription.value}</h3>
                                                <h3 className='translate-y-[0.15rem] col-start-6'>{product.productSystem.value}</h3>
                                                <h3 className='translate-y-[0.15rem] col-start-7'>{product.productYear.value}</h3>
                                                <h3 className={`translate-y-[0.15rem] col-start-8 ${product.productionStage.value == 'In stock' ? 'text-orange-016-c' : ''}`}>{product.productionStage.value}</h3>
                                            </motion.div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};