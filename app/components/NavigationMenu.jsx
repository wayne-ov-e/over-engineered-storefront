import styles from '~/styles/components/NavigationMenu.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavigationMenu({ navOpen, products }) {
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
                        className={`${styles.table} -z-10 origin-top`}
                        variants={menuMotion}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                    >
                        <motion.div variants={containerVars} initial='initial' animate='animate' exit='exit'>
                            <div className={`overflow-hidden mb-[0.625rem]`}>
                                <motion.div
                                    variants={productLinkMotion}
                                    className={`${styles.table_name_row}`}
                                >
                                    <h3 className='translate-y-[0.15rem]'>Unique Identifier</h3>
                                    <h3 className='translate-y-[0.15rem] col-start-3'>Description</h3>
                                    <h3 className='translate-y-[0.15rem] col-start-5'>Product System</h3>
                                    <h3 className='translate-y-[0.15rem] col-start-6'>Year</h3>
                                    <h3 className='translate-y-[0.15rem] col-start-7'>Production Stage</h3>
                                </motion.div>
                            </div>

                            {products.nodes.map((product) => {
                                return (
                                    <div className={`overflow-hidden`} key={product.id}>
                                        <motion.div
                                            variants={productLinkMotion}
                                            className={`${styles.table_item_row} pt-[0.375rem]`}
                                            key={product.id}
                                        >
                                            <h4 className='translate-y-[0.15rem]'>{product.title}</h4>
                                            <h3 className='translate-y-[0.15rem] col-start-3 col-span-2'>{product.shortDescription.value}</h3>
                                            <h3 className='translate-y-[0.15rem] col-start-5'>{product.productSystem.value}</h3>
                                            <h3 className='translate-y-[0.15rem] col-start-6'>{product.productYear.value}</h3>
                                            <h3 className='translate-y-[0.15rem] col-start-7'>{product.productionStage.value}</h3>
                                        </motion.div>
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