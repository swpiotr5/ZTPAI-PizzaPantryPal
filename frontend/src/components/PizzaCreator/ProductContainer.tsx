import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    leftPart: {
        backgroundColor: '#76453B',
        height: '100%',
        width: '100px',
        borderRadius: '10px',
        '@media (max-width: 600px)': {
            display: 'none',
        }
    },
    textHolder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    productContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '50%',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px',
        marginLeft: '50px',
        marginRight: '50px',
        color: '#F8FAE5'
    },
    rightPart: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        '@media (max-width: 600px)': {
            alignItems: 'center',
            width: '100%',
        }
    },
    productName: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px',
        '@media (max-width: 600px)': {
            fontSize: '25px',
        }
    },
    productAvailable: {
        fontSize: '16px',
        marginBottom: '20px',
    },
    productInput: {
        width: '100px',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginRight: '10px',
        marginLeft: '10px',
    },
});

const ProductContainer: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.productContainer}>
            <div className={classes.leftPart}>
            </div>
            <div className={classes.rightPart}>
                <div className={classes.productName}>Product Name</div>
                <div className={classes.productAvailable}>Available: 0.2kg</div>
                <div className={classes.textHolder}>
                    <span>To recipe: </span>
                    <input type="number" className={classes.productInput} placeholder="Quantity"/>
                </div>
            </div>
        </div>
    );
};

export default ProductContainer;