import React, { ChangeEvent, useState } from 'react';
import { createUseStyles } from 'react-jss';

interface Ingredient {
    ingredient_id: number;
    name: string;
    img: string;
    availableQuantity: number;
}

interface ProductContainerProps {
    ingredient: Ingredient;
    onAdd: (availableIngredientId: number, quantity: string, unit: string) => void;
}

const useStyles = createUseStyles({
    productContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '80%',
        height: '250px',
        alignItems: 'center',
        padding: '10px',
        marginLeft: '50px',
        marginRight: '50px',
        backgroundColor: '#B19470',
        color: '#000',
        borderRadius: '10px',
        marginBottom: '10px',
        marginTop: '70px',
    },
    image: {
        width: '120px',
        borderRadius: '10px',
        backgroundColor: '#76453B',
        padding: '10px',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20px',
        justifyContent: 'center',
    },
    productName: {
        fontSize: '24px',
        marginBottom: '10px',
        color: '#76453B',
    },
    productInputWrapper: {
        display: 'flex',
        alignItems: 'center',

    },
    recipeText: {
        fontSize: '16px',
        marginRight: '10px',
    },
    productInput: {
        width: '60px',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #76453B',
        backgroundColor: '#76453B',
        marginBottom: '10px',
        color: '#FFF',
    },
    selectUnit: {
        marginLeft: '10px',
        borderRadius: '5px',
        backgroundColor: '#76453B',
        color: '#FFF',
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#76453B',
        color: '#FFF',
        border: 'none',
        fontSize: '17px',
        borderRadius: '5px',
        padding: '7px 15px',
        cursor: 'pointer',
        alignSelf: 'flex-end',
        marginTop: '40px',
    },
    wrapperUpper: {
        display: 'flex',
        width: '95%',
        justifyContent: 'space-around',
        color: '#76453B',
    },
    wrapperBottom: {
        display: 'flex',
    },
});

const ProductContainer: React.FC<ProductContainerProps> = ({ ingredient, onAdd }) => {
    const classes = useStyles();
    const [quantity, setQuantity] = useState<string>('');
    const [unit, setUnit] = useState<string>('g');

    const handleAdd = () => {
        if (quantity && unit) {
            onAdd(ingredient.ingredient_id, quantity, unit);
            console.log(ingredient.ingredient_id, quantity, unit);
            setQuantity('');
            setUnit('g');
        }
    };

    return (
        <div className={classes.productContainer}>
            <div className={classes.wrapperUpper}>
                <div className={classes.image}>
                    <img src={process.env.PUBLIC_URL + ingredient.img} alt={ingredient.name}/>
                </div>
                <div className={classes.info}>
                    <div className={classes.productName}>{ingredient.name}</div>
                    <div className={classes.productInputWrapper}>
                        <span className={classes.recipeText}>To recipe:</span>
                        <input
                            type="number"
                            className={classes.productInput}
                            value={quantity}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}
                        />
                        <select className={classes.selectUnit} value={unit} onChange={(e: ChangeEvent<HTMLSelectElement>) => setUnit(e.target.value)}>
                            <option value="g">g</option>
                            <option value="pcs">pcs</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={classes.wrapperBottom}>
                <button className={classes.addButton} onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
};


export default ProductContainer;
