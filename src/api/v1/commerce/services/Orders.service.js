import Orders from "../models/Orders.model";
import boom from "@hapi/boom";
import carrito from "../json/NuevoCarrito.json"
import guardado from "../json/NuevoGuardado.json"

//Eq1: GET LIST Orders
export const getOrdersList = async () => {
  let ordersList;
  try {
    ordersList = await Orders.find();
    return ordersList;
  } catch (error) {
    throw boom.internal(error);
  }
};
export const getTest = async (id, keyType) => {
  let pricesItem;
  try {
    if (keyType === "OK") {
      pricesItem = await PricesList.findOne({
        IdListaOK: id,
      });
    }
    return pricesItem;
  } catch (error) {
    throw boom.internal(error);
  }
};
//Eq1: GET Orders Item
export const getOrdersItem = async (id, keyType) => {
  let ordersItem;
  console.log("KEYTYPE >>>>>>> ",keyType);
  console.log("ID >>>>>>>>> ",id);
  try {
    if (keyType === "OK") {
      ordersItem = await Orders.findOne({
        IdOrdenOK: id,
      });
      
    } else if (keyType === "BK") {
      ordersItem = await Orders.findOne({
        IdOrdenBK: id,
      });
      
    } else if (keyType === "Des") {
      ordersItem = await Orders.find({
        "ordenes_presenta_ps.DesPresentaPS": { $regex: id, $options: "i" },
      });
      console.log(ordersItem);
      
    } else if (keyType === "Carrito") {
      ordersItem = await Orders.find({
        "cat_ordenes_estatus.Estatus": "Carrito",
      });
      console.log(ordersItem);
      console.log(ordersItem.length);
      let tamaño = ordersItem.length
      if(tamaño === 0){
        console.log("CREAR NUEVO CARRITO")
        console.log(carrito)
        try {
          postOrdersItem(carrito)
          ordersItem = carrito
        } catch (error) {
          console.log("ERROR :(",error)
        }
      }
      
    } else if (keyType === "Guardado") {
      ordersItem = await Orders.find({
        "cat_ordenes_estatus.Estatus": "Guardado",
      });
      console.log(ordersItem);
      console.log(ordersItem.length);
      let tamaño = ordersItem.length
      if(tamaño === 0){
        console.log("CREAR NUEVO GUARDADO")
        console.log(guardado)
        try {
          postOrdersItem(guardado)
          ordersItem = guardado
        } catch (error) {
          console.log("ERROR :(",error)
        }
      }
    } 
    return ordersItem;
  } catch (error) {
    throw boom.internal(error);
  }
};

//Eq1: POST (ADD) Orders.
export const postOrdersItem = async (paOrdersItem) => {
  try {
    console.log(paOrdersItem);
    const newOrdersItem = new Orders(paOrdersItem);
    return await newOrdersItem.save();
  } catch (error) {
    throw error;
  }
};

//Eq1: PUT (UPDATE) Orders Item.
export const putOrdersItem = async (id, puOrdersItem) => {
  try {
    // console.log(id);
    // console.log(puOrdersItem);
    return await Orders.findOneAndUpdate({ _id: id }, puOrdersItem, {
      new: true,
    });
  } catch (error) {
    throw boom.badImplementation(error);
  }
};

//Eq1: DELETE Orders Item.
export const deleteOrdersItem = async (id) => {
  try {
    return await Orders.findOneAndDelete({ IdOrdenOK: id });
  } catch (error) {
    throw boom.badImplementation(error);
  }
};
