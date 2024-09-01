import { useEffect, useState } from "react";
import Guitar from "./assets/components/Guitar";
import Header from "./assets/components/Header";
import { db } from "./assets/data/data";

function App() {
  const initialCart=()=>{
    const localState= localStorage.getItem("cart")
    return localState? JSON.parse(localState) : []
  }
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])
  // El item que recive addToCart son los elemento del objeto guitarra
  const addToCart = (item) => {
    // si el elemento no existe indexCart retorna -1, pero lo contrario retornará la posicion del elemento en el arreglo
    const indexCart = cart.findIndex((guitar) => guitar.id === item.id);
    if (indexCart >= 0) {
      console.log("Ya existe...");
      if(cart[indexCart].quantity >= 5)return
      const updatedCart = [...cart];
      updatedCart[indexCart].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
      console.log("no existe agregando ...");
    }
    console.log(indexCart);
  };
  const removeProduct = (items) => {
    
    // filtrando las guitarras que cuyo id sea diferente al que se esta recibiendo
    setCart((preCart) => preCart.filter((guitar) => guitar.id !== items.id));
  };
  const incrementQuantity = (id) => {
    
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < 5) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item
    });
    setCart(updateCart)
  };
  const decrementQuantity=(id)=>{
   const updateCart= cart.map(items=>{
    if(items.id===id && items.quantity > 1){
      return{
        ...items,
        quantity: items.quantity -1
      }
    }
    return items
   })
   setCart(updateCart)
  }
  const vaciarCart=()=>{
    setCart([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeProduct={removeProduct}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        vaciarCart={vaciarCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar addToCart={addToCart} key={guitar.id} guitar={guitar} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
