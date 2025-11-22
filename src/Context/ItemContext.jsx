import { createContext, useContext, useState } from "react";


const ItemContext = createContext(null)

export function ItemProvider({children}){

const[items,setItems]=useState([])

const addItems = (item)=>{
    setItems((prev)=>[...prev,item])
}

const removeItems = (id)=>{
    setItems((prev)=>prev.filter((i) => i.id !==id))
}

const clearItems = ()=>{
    setItems([])
}

const cloudSave = ()=>{

}

const value = {
    items,
    addItems,
    removeItems,
    clearItems
}
 return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItems must be used inside an ItemsProvider");
  }
  return context;
}