export const queries = [

  {
    id: 1,
    tags: 'Building Forecasting',
    title:"What are zones of the storey 2 of a CRIGEN-STAINS building?",
    query:
"PREFIX bot: <https://w3id.org/bot#> \
\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \
\nPREFIX seas: <https://w3id.org/seas/> \
\nPREFIX s4bldg: <https://w3id.org/def/saref4bldg#>  \n\n\
 \
select ?crigenStorey2Zones  where { \
      ?building  a bot:Building; \
           bot:hasStorey ?storey. \
                                                  \
                                                  \n ?storey a bot:Storey; \
         seas:subZoneOf ?building;  \
         bot:containsZone ?crigenStorey2Zones. \
         \n \
?crigenStorey2Zones a seas:Zone; \
        seas:subZoneOf ?storey. \
        \n     FILTER (regex(STR(?building), 'http://engie.com/platoon/resource/building/crigen-stains')&&regex(STR(?storey), 'http://engie.com/platoon/resource/building/crigen-stains/storey/2')) \
 \
} \ ",
imgUrl : "https://sparql-playground.sib.swiss/queries/cartoon-rdf-type.png"
  },
  {
    id: 2,
    tags: 'All Producers',
    title:
      'Why is it so cold in the first storey?',
    query:
' PREFIX plt: <https://w3id.org/platoon/>  \n PREFIX seas: <https://w3id.org/seas/>  \n PREFIX s4bldg: <https://w3id.org/def/saref4bldg#>  \n PREFIX brick: <https://brickschema.org/schema/1.1/Brick#>  \n PREFIX bot: <https://w3id.org/bot#>  \n PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  \n PREFIX saref: <https://w3id.org/saref#>  \n PREFIX time: <http://www.w3.org/2006/time#>  \n SELECT ?storey ?zoneb ?building ?airTemperatureSetpointValue ?indoorAirTemperatureValue ?numberOfOccupants ?date  \n WHERE { ?building a bot:Building; bot:hasStorey ?storey.  \n ?storey a bot:Storey; seas:subZoneOf ?building; bot:containsZone ?zone.  \n ?zone a seas:Zone; seas:subZoneOf ?storey.  \n ?temporalContext a time:Instant ; time:inXSDDateTime ?date .  \n OPTIONAL { ?hVACValveController a plt:HVACValveController; s4bldg:isContainedIn ?zone; brick:controls ?valve ; seas:connectedTo ?temperatureSensor; plt:hasAirTemperatureSetpoint ?airTemperatureSetpointProperty. ?airTemperatureSetpointProperty a plt:AirTemperatureProperty. ?airTemperatureSetpointEvaluation a plt:AirTemperatureEvaluation; seas:evaluationOf ?airTemperatureSetpointProperty; seas:hasTemporalContext ?temporalContext ; seas:evaluatedSimpleValue ?airTemperatureSetpointValue . ?temperatureSensor a saref:TemperatureSensor; s4bldg:isContainedIn ?zone; seas:observesProperty ?indoorAirTemperatureProperty.  \n ?indoorAirTemperatureProperty a plt:AirTemperatureProperty.  \n ?airTemperatureEvaluation a plt:AirTemperatureEvaluation; seas:evaluationOf ?indoorAirTemperatureProperty; seas:hasTemporalContext ?temporalContext ; seas:evaluatedSimpleValue ?indoorAirTemperatureValue . }  \n OPTIONAL  \n { ?occupancyProperty a saref:Occupancy; seas:isPropertyOf ?zone; seas:evaluation ?occupiedNumberEvaluation.  \n ?occupiedNumberEvaluation a plt:OccupiedNumberEvaluation; seas:hasTemporalContext ?temporalContext; seas:evaluatedSimpleValue ?numberOfOccupants . }  \n FILTER (regex(STR(?storey), "http://engie.com/platoon/resource/building/crigen-stains/storey/1")&&(BOUND(?indoorAirTemperatureValue)|| BOUND( ?numberOfOccupants))) }'  },
  {
    id: 3,
    tags: 'Building Occupancy',
    title:
      'What is the temperature of the zone office nord  in the storey 2?',
    query:
' PREFIX plt: <https://w3id.org/platoon/>  \n PREFIX seas: <https://w3id.org/seas/> PREFIX s4bldg: <https://w3id.org/def/saref4bldg#>  \n PREFIX brick: <https://brickschema.org/schema/1.1/Brick#>  \n PREFIX bot: <https://w3id.org/bot#>  \n PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  \n PREFIX saref: <https://w3id.org/saref#>  \n PREFIX time: <http://www.w3.org/2006/time#>  \n SELECT ?storey ?zone ?building ?indoorAirTemperatureValue ?date  \n WHERE { ?building a bot:Building; bot:hasStorey ?storey.  \n ?storey a bot:Storey; seas:subZoneOf ?building; bot:containsZone ?zone. ?zone a seas:Zone; seas:subZoneOf ?storey.  \n ?temporalContext a time:Instant ; time:inXSDDateTime ?date .  \n ?hVACValveController a plt:HVACValveController; s4bldg:isContainedIn ?zone; brick:controls ?valve ; seas:connectedTo ?temperatureSensor. ?temporalContext a time:Instant ; time:inXSDDateTime ?date .  \n ?temperatureSensor a saref:TemperatureSensor; s4bldg:isContainedIn ?zone; seas:observesProperty ?indoorAirTemperatureProperty. ?indoorAirTemperatureProperty a plt:AirTemperatureProperty.  \n ?airTemperatureEvaluation a plt:AirTemperatureEvaluation; seas:evaluationOf ?indoorAirTemperatureProperty; seas:hasTemporalContext ?temporalContext ; seas:evaluatedSimpleValue ?indoorAirTemperatureValue .  \n FILTER (regex(STR(?storey), "storey/2")&& regex(STR(?zone), "office_nord")) }',      
imgUrl:'https://sparql-playground.sib.swiss/queries/cartoon-rdf-type.png'
  },
  {
    id: 4,
    tags: 'Building Weather',
    title:
'What are the forecast of occupancy zones in a CRIGEN-STAINS building?',
    query:
      ' PREFIX onto:<http://www.ontotext.com/>  \n PREFIX seas: <https://w3id.org/seas/>  \n PREFIX time: <http://www.w3.org/2006/time#>  \n PREFIX saref: <https://w3id.org/saref#>  \n PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  \n PREFIX plt: <https://w3id.org/platoon/>  \n PREFIX bot: <https://w3id.org/bot#>  \n PREFIX prov: <http://www.w3.org/ns/prov#>  \n PREFIX pep: <https://w3id.org/pep/>  \n SELECT ?zone ?building ?storey ?numberOfOccupantsForecastResult  \n WHERE { ?building a bot:Building; bot:hasStorey ?storey.  \n ?storey a bot:Storey; seas:subZoneOf ?building; bot:containsZone ?zone.  \n ?zone a seas:Zone; seas:subZoneOf ?storey; plt:hasForecastOfOccupancy ?forecastOfOccupancy.  \n ?forecasterOfOccupancy a plt:ForecasterOfOccupancy; pep:made ?forecastOfOccupancy ; seas:forecastsProperty ?occupancyProperty.  \n ?forecastOfOccupancy a plt:ForecastOfOccupancy; seas:forecastsProperty ?occupancyProperty; pep:hasResult ?occupancyForecastResult.  \n ?occupancyForecastResult a plt:OccupiedNumberEvaluation; seas:evaluatedSimpleValue ?numberOfOccupantsForecastResult; seas:hasTemporalContext ?temporalContext.  \n FILTER regex(STR(?building), "http://engie.com/platoon/resource/building/crigen-stains") }',
  },
  {
    id: 4,
    tags: 'Consumers',
    title:
'What are the storeys and zones of a CRIGEN-STAINS building?',
    query:
'PREFIX bot: <https://w3id.org/bot#>  \n PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  \n PREFIX seas: <https://w3id.org/seas/>  \n PREFIX s4bldg: <https://w3id.org/def/saref4bldg#>  \n select ?building ?zone ?storey where { ?building a bot:Building; bot:hasStorey ?storey.  \n ?storey a bot:Storey; seas:subZoneOf ?building; bot:containsZone ?zone.  \n ?zone a seas:Zone; seas:subZoneOf ?storey.  \n FILTER regex(STR(?building), "http://engie.com/platoon/resource/building/crigen-stains") } '
  },
  {
    id: 5,
    tags: 'general',
    title: 'general query',
    query:
      'SELECT * WHERE {?subject ?predicate ?object . \n ?object ?k ?o} LIMIT 25',
  },
  //
];
