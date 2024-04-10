import styles from '~/styles/components/NavigationMenu.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoaderData } from '@remix-run/react';

export default function NavigationMenu({ navOpen }) {
    const { productList } = useLoaderData();
    const { products } = productList;

    const menuMotion = {
        initial: {
            scaleY: 0,
        },
        animate: {
            scaleY: 1,
            transition: {
                duration: 0.3,
                ease: [0.12, 0, 0.39, 0]
            }
        },
        exit: {
            scaleY: 0,
        }
    }

    const productLinkMotion = {
        initial: {
            y: '-30vh',
            transition: {
                duration: 0.5,
            }
        },
        animate: {
            y: 0,
            transition: {
                duration: 0.5,
            }
        }
    }

    const containerVars = {
        initial: {
            transition: {
                staggerChildren: 0,
            }
        },
        animate: {
            transition: {
                staggerChildren: 0.05,
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
                        <motion.div variants={containerVars} initial='initial' animate='animate'>
                            <div className={`${styles.row_wrapper} overflow-hidden`}>
                                <motion.div
                                    variants={productLinkMotion}
                                    initial='initial'
                                    animate='animate'
                                    className={`${styles.table_name_row} mb-[0.625rem]`}
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
                                    <div className={`${styles.row_wrapper} overflow-hidden`} key={product.id}>
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