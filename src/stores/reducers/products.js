import { actionType } from "../actions/type";

const initialState = {
    productList: [
        {
            id: 1,
            productName: "Iphone 11",
            price: 1200,
            quantity: 10,
        },
        {
            id: 2,
            productName: "Iphone 12",
            price: 1800,
            quantity: 10,
        },
        {
            id: 3,
            productName: "Iphone 13",
            price: 2300,
            quantity: 10,
        },
        {
            id: 4,
            productName: "Samsung",
            price: 1000,
            quantity: 10,
        },
    ],
    selectedId: null,
    isEdit : false,
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.DELETE_PRODUCT: {
            const newProductList = state.productList.filter(product => product.id !== payload)
            return { ...state, productList: newProductList }
        }
        case actionType.INCREASE_PRODUCT: {
            const cloneProductList = [...state.productList];
            const index = cloneProductList.findIndex(product => product.id === payload)
            if (index !== -1) {
                cloneProductList[index].quantity++
            }
            return { ...state, productList: cloneProductList }
        }
        case actionType.DECREASE_PRODUCT: {
            const cloneProductList = [...state.productList];
            const index = cloneProductList.findIndex(product => product.id === payload)
            if (index !== -1) {
                if (cloneProductList[index].quantity === 1) {
                    cloneProductList.splice(index, 1);
                } else {
                    cloneProductList[index].quantity--
                }
            }
            return { ...state, productList: cloneProductList }
        }
        case actionType.ADD_PRODUCT : {
            const id = state.productList[state.productList.length -1].id + 1
            const productName = `Newproduct${id}`
            const price = 1200;
            const quantity = 10;
            state.productList.push({id, productName, price, quantity})
            return {...state};
        }
        case actionType.EDIT_PRODUCT : {
            const cloneProductList = [...state.productList];
            const product = cloneProductList.find(item => item.id === payload)
            if(product && !state.isEdit){
                state.isEdit = true
                state.selectedId = product.id;
            }else if(state.isEdit) {
                state.isEdit = false
                state.selectedId = null
            }
            return {...state}
        }
        case actionType.CHANGE_PRODUCT : {
            const newProductList = state.productList.map((product) => {
                if (product.id === state.selectedId){
                    const cloneProduct = {...product}
                    switch (payload.field) {
                        case 'productName':
                            cloneProduct.productName = payload.value
                            break;
                        case 'price':
                            cloneProduct.price = payload.value
                            break;
                        case 'quantity':
                            cloneProduct.quantity = payload.value
                            break;
                        default: return cloneProduct
                    }
                    return cloneProduct
                }
                return product
            })
            return { ...state, productList: newProductList }
            
        }


        default: return { ...state }
    }
}

export default reducer;