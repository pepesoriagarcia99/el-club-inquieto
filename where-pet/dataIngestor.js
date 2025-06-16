// async function getHotelsInAndalusia() {
//   const overpassUrl = "https://overpass-api.de/api/interpreter";

//   // -----> hoteles
//   const overpassQuery = `
//         [out:json][timeout:250];
//         area["name"="Andalucía"]["admin_level"="4"]->.andalucia;
//         (
//             node["tourism"="hotel"](area.andalucia);
//             way["tourism"="hotel"](area.andalucia);
//             relation["tourism"="hotel"](area.andalucia);
//         );
//         out body;
//         >;
//         out skel qt;
//     `;

  // -----> restaurantes
  // const overpassQuery = `
  //     [out:json][timeout:250];
  //     area["name"="Andalucía"]["admin_level"="4"]->.andalucia;
  //     (
  //         node["amenity"="restaurant"](area.andalucia);
  //         node["amenity"="fast_food"](area.andalucia);
  //         node["amenity"="cafe"](area.andalucia);
  //         way["amenity"="restaurant"](area.andalucia);
  //         way["amenity"="fast_food"](area.andalucia);
  //         way["amenity"="cafe"](area.andalucia);
  //         relation["amenity"="restaurant"](area.andalucia);
  //         relation["amenity"="fast_food"](area.andalucia);
  //         relation["amenity"="cafe"](area.andalucia);
  //     );
  //     out body;
  //     >;
  //     out skel qt;
  // `;

  // -----> playas
  // const overpassQuery = `
  //     [out:json][timeout:250];
  //     area["name"="Andalucía"]["admin_level"="4"]->.andalucia;
  //     (
  //         node["natural"="beach"](area.andalucia);
  //         way["natural"="beach"](area.andalucia);
  //         relation["natural"="beach"](area.andalucia);
  //     );
  //     out body;
  //     >;
  //     out skel qt;
  // `;

  // -----> Centros comerciales
//   const overpassQuery = `
//         [out:json][timeout:250];
//         area["name"="Andalucía"]["admin_level"="4"]->.andalucia;
//         (
//             node["shop"="mall"](area.andalucia);
//             node["shop"="shopping_centre"](area.andalucia);
//             way["shop"="mall"](area.andalucia);
//             way["shop"="shopping_centre"](area.andalucia);
//             relation["shop"="mall"](area.andalucia);
//             relation["shop"="shopping_centre"](area.andalucia);
//         );
//         out body;
//         >;
//         out skel qt;
//     `;

//   try {
//     const response = await fetch(overpassUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: `data=${encodeURIComponent(overpassQuery)}`,
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     // console.log("Hoteles encontrados en Andalucía:", data.elements);
//     return data.elements;
//   } catch (error) {
//     console.error("Error al obtener los hoteles de OpenStreetMap:", error);
//     return [];
//   }
// }

// // Para usar la función:
// getHotelsInAndalusia().then((hotels) => {
//   if (hotels.length > 0) {
//     console.log(`Se encontraron ${hotels.length} hoteles.`);
//     // Aquí puedes procesar los datos de los hoteles
//     // Por ejemplo, iterar y mostrar sus nombres y coordenadas
//     // hotels.forEach(hotel => {
//     // if (hotel.tags && hotel.tags.name) {
//     //     console.log(`- Nombre: ${hotel.tags.name}, Tipo: ${hotel.type}, Lat: ${hotel.lat || hotel.center.lat}, Lon: ${hotel.lon || hotel.center.lon}`);
//     // } else {
//     //     console.log(`- Hotel sin nombre, Tipo: ${hotel.type}, Lat: ${hotel.lat || hotel.center.lat}, Lon: ${hotel.lon || hotel.center.lon}`);
//     // }
//     // });
//   } else {
//     console.log("No se encontraron hoteles en Andalucía.");
//   }
// });

let communitiesData = [];
async function getSpanishAutonomousCommunities() {
    const overpassUrl = "https://overpass-api.de/api/interpreter";
    const overpassQuery = `
        [out:json][timeout:90];
        area["name"="España"]["admin_level"="2"]->.spain;
        relation["boundary"="administrative"]["admin_level"="4"](area.spain);
        out body;
        >;
        out skel qt;
    `;

    try {
        const response = await fetch(overpassUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `data=${encodeURIComponent(overpassQuery)}`
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const communities = data.elements
            .filter(el => el.tags && el.tags.name) // Asegurarse de que tienen nombre
            .map(el => ({
                name: el.tags.name,
                id: el.id // El ID de la relación en OpenStreetMap
            }));

        console.log("Comunidades Autónomas de España:");
        communities.forEach(community => {
            console.log(`- ${community.name} (ID de Overpass: ${community.id})`);
            communitiesData.push(community.name)
        });

        return communities;

    } catch (error) {
        console.error("Error al obtener las Comunidades Autónomas de OpenStreetMap:", error);
        return [];
    }
}

async function getHotelsByAutonomousCommunity(communityName, communityId) {
    const overpassUrl = "https://overpass-api.de/api/interpreter";
    // Usaremos el ID de la relación si está disponible, si no, el nombre.
    // Usar el ID de la relación es más robusto si ya lo tienes de la lista estática.
    const areaFilter = communityId ? `rel(${communityId})` : `area["name"="${communityName}"]["admin_level"="4"]`;

    const overpassQuery = `
        [out:json][timeout:250];
        ${areaFilter}->.community_area;
        (
            node["tourism"="hotel"](area.community_area);
            way["tourism"="hotel"](area.community_area);
            relation["tourism"="hotel"](area.community_area);
        );
        out body;
        >;
        out skel qt;
    `;

    console.log(`Consultando hoteles para: ${communityName}...`);
    try {
        const response = await fetch(overpassUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `data=${encodeURIComponent(overpassQuery)}`
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Hoteles encontrados en ${communityName}: ${data.elements.length}`);
        return data.elements;

    } catch (error) {
        console.error(`Error al obtener hoteles de ${communityName}:`, error);
        return [];
    }
}

// Ejemplo de uso:
async function processAllCommunitiesForHotels() {
    const communities = await getSpanishAutonomousCommunities(); // Obtener la lista estática
    console.log("\n--- LISTANDO HOTELES POR COMUNIDAD ---");
    for (const community of communities) {
        // Llama a la función para cada comunidad usando su nombre e ID
        const hotels = await getHotelsByAutonomousCommunity(community.name, community.id);
        console.log("🚀 ~ processAllCommunitiesForHotels ~ hotels:", hotels)

        console.log('comunidad: ', community.name, ' - hoteles: ', );
        

        // Aquí puedes procesar los 'hotels' para cada comunidad
        // if (hotels.length > 0) {
        //     console.log(`Primer hotel en ${community.name}: ${hotels[0].tags.name || 'Sin nombre'} (Lat: ${hotels[0].lat || (hotels[0].center && hotels[0].center.lat)}, Lon: ${hotels[0].lon || (hotels[0].center && hotels[0].center.lon)})`);
        // }
    }
}

// Descomenta la siguiente línea para ejecutar el proceso completo:
processAllCommunitiesForHotels();

// // Para ejecutar y ver la lista en la consola:
// getSpanishAutonomousCommunities();