from fastapi import FastAPI
from fastapi import HTTPException
from fastapi import Query
from pydantic import BaseModel
from rdflib.plugins.stores.sparqlstore import SPARQLStore
from starlette.middleware.cors import CORSMiddleware
from rdflib import Graph

app =FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Esto permite cualquier origen
    allow_credentials=True,
    allow_methods=["*"],   # Esto permite todos los métodos HTTP
    allow_headers=["*"],   # Esto permite todos los encabezados HTTP
)

sparql_endpoint = "http://localhost:3030/OntologiaFinal/sparql"
store = SPARQLStore(sparql_endpoint)
graph = Graph(store)

@app.get("/ciudades")
def get_cities(city_name: str = Query(None, title="City name", description="Name of the city to filter by"),
               city_id:str=Query(None,title="City Id",description="")):
    try:
        filter_city_id=f"filter(regex(str(?idCiudad),'{city_id}','i'))" if city_id else ""
        filter_city_name=f"filter(regex(str(?nameCity),'{city_name}','i'))" if city_name else ""
        query = f"""
            PREFIX rut: <http://rdfunit.aksw.org/ns/core#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX tur: <http://www.semanticweb.org/luisfer/ontologies/2024/3/turismo-colombia#>
            SELECT ?idCiudad ?nameCity ?imagen ?postalCode
            WHERE {{
                ?city a tur:City.
                ?city tur:name ?nameCity.
                OPTIONAL{{
                    ?city tur:id ?idCiudad.
                }}
                OPTIONAL{{ 
                    ?city tur:imagen ?imagen.
                }}
                OPTIONAL{{
                    ?city tur:postalCodCity ?postalCode.
                }}
                {filter_city_id}
                {filter_city_name}
            }}
        """
        qres = graph.query(query)
        return qres
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

#TODO: Consultar destinos turisticos con la ciudad a la que pertenecen
@app.get("/destinos")
def get_destinations(city_name:str=Query(None, title="City Name",description="Name of the city to filter"),
                     destination_name:str=Query(None, title="destination_name",description="Name of the touristic destination"),
                     destination_id:str=Query(None,title="Destino id"),
                     city_id:str=Query(None,title="Ciudad Id"),
                     tipoDestino:str=Query(None,title="Tipo destino"),
                     categoria_destino:str=Query(None,title="Historico o Natural")):
    try:
        filter_city_name=f"filter(regex(str(?nameCity),'{city_name}','i'))" if city_name else ""
        filter_destination_name=f"filter(regex(str(?nameDestino),'{destination_name}','i'))" if destination_name else ""
        filter_destination_id=f"filter(regex(str(?idDestino),'{destination_id}','i'))" if destination_id else ""
        filter_city_id=f"filter(regex(str(?idCity),'{city_id}','i'))" if city_id else ""
        filter_tipodestino=f"FILTER(REGEX(STR(?tipoDestino),'{tipoDestino}','i'))" if tipoDestino else ""

        categoria="HistoricalCulturalDestination"if categoria_destino and categoria_destino=="historia" else "NaturalDestination" 
        query=f"""
            PREFIX rut: <http://rdfunit.aksw.org/ns/core#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX tur: <http://www.semanticweb.org/luisfer/ontologies/2024/3/turismo-colombia#>
            SELECT ?idDestino ?nameDestino ?location ?visitantes ?alturaLocation ?tipoDestino ?imagenDestino ?idCity ?nameCity
            WHERE {{
                    ?destinoHistorico a tur:TouristDestination.
                    ?destinoHistorico tur:name ?nameDestino.
                    OPTIONAL{{?destinoHistorico tur:id ?idDestino.}}    
                    OPTIONAL{{?destinoHistorico tur:locationTouristicDestination ?location.}}
                    OPTIONAL{{?destinoHistorico tur:visitorCount ?visitantes.}}
                    OPTIONAL{{?destinoHistorico tur:alturaLocation ?alturaLocation.}}
                    OPTIONAL{{?destinoHistorico tur:tipoDestinoTuristico ?tipoDestino.}}
                    OPTIONAL{{?destinoHistorico tur:imagen ?imagenDestino.}}
                    OPTIONAL{{
                        ?city a tur:City.
                        ?destinoHistorico tur:touristicDestinationIsIn ?city.
                        ?city tur:name ?nameCity.
                        ?city tur:id ?idCity
                    }}
                    {filter_city_name}
                    {filter_destination_name}
                    {filter_city_id}
                    {filter_destination_id}
                    {filter_tipodestino}
                }}
        """
        result=graph.query(query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#TODO: Consultar hoteles, permitiendo filtrar los que estén cerca a un destino turistico, según el ID.
@app.get("/hotelesPorDestino")
def hoteles(destino_id:str=Query(None,title="id_destinoTur",description="Id del destino turistico para el que va a filtrar"),
            destino_name:str=Query(None,title="Nombre del destino"),
            hotel_id:str=Query(None,title="Id del hotel"),
            hotel_name:str=Query(None,title="hotel_name",description="Nombre del hotel")
            ):
    try:
        filter_destino_id=f"filter(regex(str(?destinoId),'{destino_id}','i'))" if destino_id else ""
        filter_destino_name=f"FILTER(REGEX(STR(?nameDestino),'{destino_name}','i'))" if destino_name else ""
        filter_hotel_id=f"FILTER(REGEX(STR(?hotelId),'{hotel_id}','i'))" if hotel_id else ""
        filter_hotel_name=f"filter(regex(str(?hotelName),'{hotel_name}','i'))" if hotel_name else ""

        query=f"""
            PREFIX rut: <http://rdfunit.aksw.org/ns/core#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX tur: <http://www.semanticweb.org/luisfer/ontologies/2024/3/turismo-colombia#>
            SELECT ?hotelId ?hotelName ?tipoHotel ?hotelDireccion ?hotelImagen ?destinoId ?nameDestino
            WHERE {{
                ?hotel a tur:Accommodation.
                ?hotel tur:name ?hotelName.
                OPTIONAL{{?hotel tur:id ?hotelId.}}
                OPTIONAL{{?hotel tur:tipoAcomodation ?tipoHotel}}
                OPTIONAL{{?hotel tur:address ?hotelDireccion}}
                OPTIONAL{{?hotel tur:imagen ?hotelImagen}}
                OPTIONAL{{
                    ?hotel tur:destinyHasAcomodation ?destino.
                    ?destino tur:id ?destinoId
                    OPTIONAL{{?destino tur:name ?nameDestino}}
                }}
                {filter_destino_id}
                {filter_destino_name}
                {filter_hotel_id}
                {filter_hotel_name}
            }}
        """
        result=graph.query(query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))

@app.get("/eventosPorDestino")
def eventor_por_destino(destino_id:str=Query(None,title="id destino",description='Eventos por destino'),
                        destino_nombre:str=Query(None,title="Nombre del destino"),
                        evento_id:str=Query(None,title="Id del evento"),
                        evento_nombre:str=Query(None, title="Nombre del evento",description="Filtrar por nombre del evento.")):
    try:
        filter_destino_id=f"filter(regex(str(?idDestino),'{destino_id}','i'))" if destino_id else ""
        filter_destino_nombre=f"FILTER(REGEX(STR(?nameDestino),'{destino_nombre}','i'))" if destino_nombre else ""
        filter_evento_id=f"FILTER(REGEX(STR(?idEvento),'{evento_id}','i'))" if evento_id else ""
        filter_evento_nombre=f"filter(regex(str(?nameEvento),'{evento_nombre}','i'))" if evento_nombre else ""
        query=f"""
                PREFIX rut: <http://rdfunit.aksw.org/ns/core#>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                PREFIX tur: <http://www.semanticweb.org/luisfer/ontologies/2024/3/turismo-colombia#>
                SELECT ?idEvento ?nameEvento ?posterEvento ?idDestino ?nameDestino
                WHERE {{
                    ?evento a tur:Event.
                    ?evento tur:id ?idEvento.
                    OPTIONAL{{?evento tur:name ?nameEvento.}}
                    OPTIONAL{{?evento tur:imagen ?posterEvento.}}  
                    OPTIONAL{{
                        ?evento tur:eventNearTo ?destino.
                        OPTIONAL{{?destino tur:id ?idDestino}}
                        OPTIONAL{{?destino tur:name ?nameDestino}}
                    }}
                    {filter_destino_id}
                    {filter_destino_nombre}
                    {filter_evento_id}
                    {filter_evento_nombre}
                }}
        """
        result=graph.query(query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))
    
@app.get("/restaurantesPorDestino")
def restaurante_por_destino(destino_id:str=Query(None,title="Id destino"),
                            destino_name:str=Query(None,title="nombre del destino"),
                            restaurante_id:str=Query(None,title="Id del restaurante"),
                            restaurante_name:str=Query(None,title="Nombre del destino")):
    try:
        filter_destino_id=f"filter(regex(str(?destinoId),'{destino_id}','i'))" if destino_id else ""
        filter_destino_name=f"FILTER(REGEX(STR(?nameDestino),'{destino_name}','i'))" if destino_name else ""
        filter_restaurant_id=f"FILTER(REGEX(STR(?idRestaurant),'{restaurante_id}','i'))" if restaurante_id else ""
        filter_restaurant_name=f"FILTER(REGEX(STR(?nameRestaurant),'{restaurante_name}','i'))" if restaurante_name else ""
        query=f"""
            PREFIX rut: <http://rdfunit.aksw.org/ns/core#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX tur: <http://www.semanticweb.org/luisfer/ontologies/2024/3/turismo-colombia#>
            SELECT  ?idRestaurant ?typeFood ?nameRestaurant ?sitioWebRest ?direccionRest ?telRest ?imagen ?destinoId ?nameDestino
            WHERE {{
                ?restaurant a tur:RestaurantService.
                ?restaurant tur:name ?nameRestaurant.
                ?restaurant tur:id ?idRestaurant.
                OPTIONAL{{?restaurant tur:typeFood ?typeFood.}}
                OPTIONAL{{?restaurant tur:address ?direccionRest.}}
                OPTIONAL{{?restaurant tur:webSite ?sitioWebRest.}}
                OPTIONAL{{?restaurant tur:phoneNumber ?telRest.}}
                OPTIONAL{{?restaurant tur:imagen ?imagen.}}
                OPTIONAL{{
                    ?destino a tur:TouristDestination.
                    ?destino tur:locationsHasLocalBusiness ?restaurant.
                    ?destino tur:name ?nameDestino.
                    ?destino tur:id ?destinoId.
                }}
                {filter_destino_id}
                {filter_destino_name}
                {filter_restaurant_id}
                {filter_restaurant_name}
            }}
        """
        result=graph.query(query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))
    
@app.get("/aeropuertosPorCiudad")
def aeropuertos_por_ciudad(city_id:str=Query(None,title="City id"),
                           city_name:str=Query(None,title="City name"),
                           airport_id:str=Query(None,title="Id del aeropuerto"),
                           airport_name:str=Query(None,title="Nombre del aeropuerto")):
    try:
        filter_city_id=f"FILTER(REGEX(STR(?idCity),'{city_id}','i'))" if city_id else ""
        filter_city_name=f"FILTER(REGEX(STR(?nameCity),'{city_name}','i'))" if city_name else ""
        filter_airport_id=f"FILTER(REGEX(STR(?idAirport),'{airport_id}','i'))" if airport_id else ""
        filter_airport_name=f"FILTER(REGEX(STR(?nameAirport),'{airport_name}','i'))" if airport_name else ""
        query=f"""
        PREFIX rut: <http://rdfunit.aksw.org/ns/core#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX tur: <http://www.semanticweb.org/luisfer/ontologies/2024/3/turismo-colombia#>
        SELECT  ?idAirport ?nameAirport ?iataCode ?icaoCode ?dirAirport ?nameCity ?idCity
        WHERE {{
            ?airport a tur:TransportInfraestructure.
            OPTIONAL{{?airport tur:id ?idAirport}}
            OPTIONAL{{?airport tur:name ?nameAirport}}
            OPTIONAL{{?airport tur:hasIATACode ?iataCode}}
            OPTIONAL{{?airport tur:hasICAOCode ?icaoCode}}
            OPTIONAL{{?airport tur:address ?dirAirport}}
            OPTIONAL{{?airport tur:tipoTransporte ?tipo}}
            OPTIONAL{{
                ?city a tur:City.
                ?airport tur:AirportIsIn ?city.
            }}
            OPTIONAL{{?city tur:name ?nameCity}}
            OPTIONAL{{?city tur:id ?idCity}}
            FILTER(REGEX(STR(?tipo),'Aeropuerto','i'))
            {filter_city_id}
            {filter_city_name}
            {filter_airport_id}
            {filter_airport_name}
        }}     
        """
        result=graph.query(query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))


@app.get("/terminalesPorCiudad")
def terminales_por_ciudad(city_id:str=Query(None,title="Ciudad Id"),
                          city_name:str=Query(None,title="Nombre de la ciudad"),
                          terminal_id:str=Query(None,title="Id del terminal"),
                          terminal_name:str=Query(None,title="Nombre del terminal")
                          ):
    try:
        filter_city_id=f"FILTER(REGEX(STR(?idCity),'{city_id}','i'))" if city_id else ""
        filter_city_name=f"FILTER(REGEX(STR(?nameCity),'{city_name}','i'))" if city_name else ""
        filter_terminal_id=f"FILTER(REGEX(STR(?idTerminal),'{terminal_id}','i'))" if terminal_id else ""
        filter_terminal_name=f"FILTER(REGEX(STR(?nameTerminal),'{terminal_name}','i'))" if terminal_name else ""
        query=f"""
            PREFIX rut: <http://rdfunit.aksw.org/ns/core#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX tur: <http://www.semanticweb.org/luisfer/ontologies/2024/3/turismo-colombia#>
            SELECT  ?idTerminal ?nameTerminal ?dirTerminal ?tipo ?nameCity ?idCity
            WHERE {{
                ?terminal a tur:TransportInfraestructure.
                OPTIONAL{{?terminal tur:id ?idTerminal}}
                OPTIONAL{{?terminal tur:name ?nameTerminal}}
                OPTIONAL{{?terminal tur:address ?dirTerminal}}
                OPTIONAL{{?terminal tur:tipoTransporte ?tipo}}
                OPTIONAL{{
                    ?city a tur:City.
                    ?terminal tur:AirportIsIn ?city.
                    OPTIONAL{{?city tur:name ?nameCity}}
                    OPTIONAL{{?city tur:id ?idCity}}
                }}
                FILTER(REGEX(STR(?tipo),'Terminal','i'))
                {filter_city_id}
                {filter_city_name}
                {filter_terminal_id}
                {filter_terminal_name}
            }}
        """
        result=graph.query(query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))

