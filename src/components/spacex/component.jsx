import React, { useEffect, useState } from "react";

export function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch("https://api.spacexdata.com/v4/rockets")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Nota: es importante manejar errores aquí y no en 
          // un bloque catch() para que no interceptemos errores
          // de errores reales en los componentes.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <>
          <div class="rockets">
          {items.map(item => (
            <div key={item.id} class="rocket">
                <p> <b>Name:</b> {item.name}</p> 
                <p> <b>Mass:</b> {item.mass.kg} kg</p>
                <p> <b>Height:</b> {item.height.meters} m</p>
                <img src={item.flickr_images[0]} alt="{item.flickr_images}" width="100" height="100"></img>
                
            </div>
          ))}

          </div>


          </>
      );
    }
  }