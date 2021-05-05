// Create variable to hold map element, give initial settings to map
var map = L.map('map', {
    center: [7.892, -72.506],
    zoom: 10,
    minZoom: 13,
    scrollWheelZoom: false,
});

map.once('focus', function() { map.scrollWheelZoom.enable(); });

L.easyButton('<img src="images/fullscreen.png">', function (btn, map) {
    var cucu = [7.892, -72.506];
    map.setView(cucu, 10);
}).addTo(map);

var esriAerialUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services' +
    '/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var esriAerialAttrib = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, ' +
    'USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the' +
    ' GIS User Community';
var esriAerial = new L.TileLayer(esriAerialUrl,
    {maxZoom: 18, attribution: esriAerialAttrib}).addTo(map);


var opens = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
});


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = (props ?
        'Municipio ' + props.MUN + '<br />' +
        'Comuna ' + props.COM + '<br />' +
        'Viviendas ' + props.VIVI_OCU + '<br />' +
        'Hogares ' + props.HOGARES + '<br />' +
        'Personas ' + props.PERSONAS + '<br />' +  
        'Población de origen Venezuela ' + props.VENEZOLANO + '<br />' +  '<br />' + 

        '<b>Vivienda </b>' + '<br />' +
        'Vivienda adecuada: ' + props.VIV_ADE.toFixed(0) + ' %' + '<br />' +
        'Espacio vital suficiente: ' + props.HACINAMI.toFixed(0) + ' %' + '<br />' +
        'Agua mejorada: </b> ' + props.AGUA_MEJOR.toFixed(0) + ' %' + '<br />' +
        'Saneamiento: </b> ' + props.SANEAMIENT.toFixed(0) + ' %' + '<br />' +
        'Electricidad: </b> ' + props.ELECTRICI.toFixed(0) + ' %' + '<br />' +
        'Internet: </b> ' + props.INTERNET.toFixed(0) + ' %' + '<br />' + 
        'Estrato: </b> ' + props.ESTRATO.toFixed(0)  + '<br />' +  '<br />' +  

        '<b>Salud</b>' + '<br />' +
        'Proximidad equipamientos de salud: ' + props.DIS_SALUD.toFixed(0) + ' m' + '<br />' +
        'Concentración de Pm10: ' + props.PM10.toFixed(2) + ' µg/m3' +  '<br />' +   
        'Contaminación residuos sólidos: ' + props.R_R_SOL.toFixed(2) + ' %' + '<br />' + 
        'Esperanza de vida al nacer: ' + props.E_VIDA.toFixed(0) + ' años' + '<br />' +
        'Brecha género esperanza de vida al nacer: ' + props.B_E_VIDA.toFixed(2) + ' años' + '<br />' +  '<br />' +  
        
        '<b>Educación, cultura y diversidad </b>' + '<br />' +
        'Proximidad equipamientos culturales: ' + props.DIS_BIBLIO.toFixed(0) + ' m' + '<br />' +
        'Proximidad equipamientos educativos: ' + props.DIS_EDUCA.toFixed(0) + ' m' + '<br />' +
        'Diversidad ingresos: ' + props.MIX_EST.toFixed(2) + '/1.79' + '<br />' +
        'Diversidad nivel educativo: ' + props.MIX_EDU.toFixed(2) + '/2.20' + '<br />' +
        'Diversidad edades: ' + props.MIX_EDAD.toFixed(2) + '/1.79' + '<br />' +
        'Diversidad etnias y razas: ' + props.MIX_ETNIAS.toFixed(2) + '/1.61' +'<br />' + 
        'Edad probable de un habitante: ' + props.DES_RANGO + ' años' + '<br />' +
        'Brecha género años promedio educación: ' + props.PARIDAD.toFixed(0) + ' años' + '<br />' +
        'Años promedio educación:' + props.PRO_A_ESCO.toFixed(0) + ' años'+ '<br />' +  '<br />' +  
        
        '<b>Espacios públicos, seguridad y recreación </b>' + '<br />' +
        'Proximidad espacio público: ' + props.DIS_EP.toFixed(0) + ' m' + '<br />' +
        'M² per capita de espacio público: ' + props.M2_ESP_PU.toFixed(0) + ' m' + '<br />' +
        'Densidad poblacional: ' + props.DENSIDAD.toFixed(2) + '<br />' +
        'Tasa de hurtos x 100 mil habitantes: ' + props.HURTOS.toFixed(0) + '<br />' +
        'Tasa de homicidios x 100 mil habitantes: ' + props.HOMICIDIOS.toFixed(0) + '<br />' +
        'Diversidad usos del suelo: ' + props.MIXTICIDAD.toFixed(2) + '/1.61' +'<br />' + '<br />' +

        '<b>Oportunidades económicas </b>' + '<br />' +
        'Proximidad unidades servicios y comerciales: ' + props.D_COM_SER.toFixed(0) + ' m' + '<br />' +
        'Desempleo: ' + props.T_DESEMPL.toFixed(0) + ' %' + '<br />' +
        'Empleo: ' + props.EMPLEO.toFixed(0) + ' %' + '<br />' +
        'Desempleo juvenil: ' + props.DESEM_JUV.toFixed(0) + ' %' + '<br />' +
        'Brecha género desempleo: ' + props.BRECHA_D.toFixed(0) + ' %' : 'Seleccione una manzana');
};
info.addTo(map);

function stylel(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: 'red',
        fillOpacity: 0,
        clickable: false,

    };
}

var lim = L.geoJson(limiteven, {
    style: stylel,
    onEachFeature: popupText1,
}).addTo(map);


function getColor(d) {
    return d > 10 ? '#68e8ff' :
                      '#ffffff';
}

function stylec(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: getColor(feature.properties.Comuna),
        fillOpacity: 0,
        dashArray: '3',
    };
}

var comu = L.geoJson(comunas, {
    style: stylec,
    onEachFeature: popupText,
}).addTo(map);


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'black',
        dashArray: '',
        fillColor: false
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var manzanas;

function resetHighlight(e) {
    manzanas.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function style(feature) {
    return {
        weight: 0.6,
        opacity: 0.5,
        color: '#ffffff00',
        fillOpacity: 0,
    };
}


function changeLegend(props) {
    var _legend = document.getElementById('legend'); // create a div with a class "info"
    _legend.innerHTML = (props ?
        `<p style="font-size: 11px"><strong>${props.title}</strong></p>
            <p style="font-size: 10px">${props.subtitle}</p>
            <p id='colors'>
                ${props.elem1}
                ${props.elem2}
                ${props.elem3}
                ${props.elem4}
                ${props.elem5}
                ${props.elem6}
                ${props.elem7}<br>
                <span style='color:#000000'>Fuente: </span>${props.elem8}<br>
            </p>` :
        `<p style="font-size: 12px"><strong>Área urbana</strong></p>
            <p id='colors'>
                <span style='color:#c3bfc2'>▉</span>Manzanas<br>
            </p>`);
}

var legends = {
    ZA_SALUD1: {
        title: "Proximidad equipamientos de salud",
        subtitle: "Pendiente",
        elem1: '<div><span  style= "color:#1a9641">▉</span>A nivel</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Ligeramente inclinada</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>Moderadamente inclinada</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>Fuertemente inclinada</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Escarpada</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Por fuera de la zona de accesibilidad (> 500 m)</div>',
        elem7: '',
        elem8: "DANE, SISPRO",
    },
    ZA_EDUCA1: {
        title: "Proximidad equipamientos de educación",
        subtitle: "Pendiente",
        elem1: '<div><span  style= "color:#1a9641">▉</span>A nivel</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Ligeramente inclinada</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>Moderadamente inclinada</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>Fuertemente inclinada</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Escarpada</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Por fuera de la zona de accesibilidad (> 500 m)</div>',
        elem7: '',
        elem8: "DANE, Google Maps",
    },
    ZA_BIBLIO1: {
        title: "Proximidad equipamientos culturales",
        subtitle: "Pendiente",
        elem1: '<div><span  style= "color:#1a9641">▉</span>A nivel</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Ligeramente inclinada</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>Moderadamente inclinada</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>Fuertemente inclinada</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Escarpada</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Por fuera de la zona de accesibilidad (> 500 m)</div>',
        elem7: '',
        elem8: "DANE, Google Maps",
    },
    PRO_A_ESCO: {
        title: "Años promedio educación",
        subtitle: "Años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 16</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>14 - 15</div>',
        elem3: '<div><span  style= "color:#f4f466">▉</span>12 - 13</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>9 - 11</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>3 - 8</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIXTICIDAD: {
        title: "Diversidad usos del suelo",
        subtitle: "Índice de Shanon",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.06 - 1.67</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.79 - 1.05</div>',
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.54 - 0.78</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.30 - 0.53</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.29</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Sin diversidad</div>',
        elem7: '',
        elem8: "Plan de Ordenamiento Territorial Cúcuta",
    },
    ZA_ESPPUB1: {
        title: "Proximidad espacio público",
        subtitle: "Pendiente",
        elem1: '<div><span  style= "color:#1a9641">▉</span>A nivel</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Ligeramente inclinada</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>Moderadamente inclinada</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>Fuertemente inclinada</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Escarpada</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Por fuera de la zona de accesibilidad (> 500 m)</div>',
        elem7: '',
        elem8: "Plan de Ordenamiento Territorial Cúcuta",
    },
    VIV_ADE: {
        title: "Vivienda Adecuada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 86</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>66 - 85</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>36 - 65</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>16 - 35</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Menor 15</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Sin acceso vivienda adecuada</div>',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    AGUA_MEJOR: {
        title: "Acceso a agua mejorada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 81</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>61 - 80</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>41 - 60</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>21 - 40</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Menor 20</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Sin acceso a agua mejorada</div>',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    SANEAMIENT: {
        title: "Acceso a saneamiento",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 81</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>61 - 80</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>41 - 60</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>21 - 40</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Menor 20</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Sin acceso a saneamiento</div>',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },  
    DESEM_JUV: {
        title: "Desempleo juvenil",
        subtitle: "% de Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Menor 4</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>5 - 13</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>14 - 24</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>25 - 46</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Mayor 47</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Sin información</div>',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    INTERNET: {
        title: "Acceso a internet",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 86</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>52 - 85</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>33 - 51</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>14 - 32</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Mayor 13</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Sin acceso a internet</div>',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    T_DESEMPL: {
        title: "Tasa de desempleo",
        subtitle: "% de Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 4</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>5 - 9</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>10 - 15</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>16 - 65</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>66 - 83</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Sin información</div>',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    PM10: {
        title: "Concentración Pm10",
        subtitle: "µg/m3",
        elem1: '<div><span  style= "color:#1a9641">▉</span>21 - 24</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>25 - 27</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>28 - 30</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>31 - 33</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>34 - 36</div>',
        elem6: '',
        elem7: '',
        elem8: "CORPONOR",
    },
    MAX_RANGO: {
        title: "Edad probable de un habitante",
        subtitle: "Rango de edad mayoritario",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 9 años</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>10 - 24 años</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>25 - 39 años</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>40 - 54 años</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>55 - 84 años</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    HURTOS: {
        title: "Tasa de hurtos",
        subtitle: "Hurtos x 100 mil habitantes",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Menor 107</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>108 - 179</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>180 - 270</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>271 - 435</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>436 - 1550</div>',
        elem6: '',
        elem7: '',
        elem8: "Policía Nacional 2019",
    },
    HOMICIDIOS: {
        title: "Tasa de homicidios",
        subtitle: "Homicidios x 100 mil habitantes",
        elem1: '<div><span  style= "color:#1a9641">▉</span>6 - 10</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>11 - 15</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>16 - 18</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>19 - 23</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>24 - 51</div>',
        elem6: '',
        elem7: '',
        elem8: "Medicina Legal 2019",
    },
    VENEZOLANO: {
        title: "Población de origen Venezuela",
        subtitle: "% Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1 - 5</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>6 - 25</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>26 - 77</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>78 - 100</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>100 - 205</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Sin información</div>',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    ESTRATO: {
        title: "Estratificación socioeconómica",
        subtitle: "Máximo conteo",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Estrato 6</div>',
        elem2: '<div><span  style= "color:#82E0AA">▉</span>Estrato 5</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>Estrato 4</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>Estrato 3</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>Estrato 2</div>',
        elem6: '<div><span  style= "color:#d7191c">▉</span>Estrato 1</div>',
        elem7: '<div><span  style= "color:#c3bfc2">▉</span>Sin estrato</div>',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_ETNIAS: {
        title: "Diversidad etnias y razas",
        subtitle: "Índice de Shanon", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.25 - 0.50</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.15 - 0.24</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.09 - 0.14</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.03 - 0.08</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.02</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Sin información</div>',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_EDU: {
        title: "Diversidad nivel educativo",
        subtitle: "Índice de Shanon", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.56 - 1.98</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.34 - 1.55</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.08 - 1.33</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.47 - 1.07</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.46</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_EDAD: {
        title: "Diversidad edades",
        subtitle: "Índice de Shanon", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.51 - 1.77</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.39 - 1.50</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.18 - 1.38</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.51 - 1.17</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.50</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Sin información</div>',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_EST: {
        title: "Diversidad ingresos",
        subtitle: "Índice de Shanon", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.78 - 1.52</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.55 - 0.77</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.34 - 0.54</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.13 - 0.33</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.12</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Sin información</div>',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    INDICE: {
        title: "Marcador potencial integración urbana",
        subtitle: "%", 
        elem1: '<div><span  style= "color:#FCF9BB">▉</span>71.13 - 80.85</div>',
        elem2: '<div><span  style= "color:#FE9D6C">▉</span>66.30 - 71.12</div>', 
        elem3: '<div><span  style= "color:#CA3E72">▉</span>60.89 - 66.29</div>',
        elem4: '<div><span  style= "color:#862781">▉</span>53.29 - 60.88</div>',
        elem5: '<div><span  style= "color:#2A115C">▉</span>35.98 - 53.28</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
}

var indi = L.geoJson(Manzana, {
    style: legends.INDICE,
}).addTo(map);

var currentStyle = 'INDICE';

manzanas = L.geoJson(Manzana, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


function setProColor(d) {
    if (currentStyle === 'VIV_ADE') {
        return d > 85 ? '#1a9641' :
            d > 65 ? '#a6d96a' :
                d > 35 ? '#f4f466' :
                    d > 15 ? '#fdae61' :
                        '#d7191c';
    }else if (currentStyle === 'AGUA_MEJOR') {
        return d > 80 ? '#1a9641' :
            d > 60 ? '#a6d96a' :
                d > 40 ? '#f4f466' :
                    d > 20 ? '#fdae61' :
                        '#d7191c';
    } 
    else if (currentStyle === 'SANEAMIENT') {
        return d > 80 ? '#1a9641' :
            d > 60 ? '#a6d96a' :
                d > 40 ? '#f4f466' :
                    d > 20 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'PRO_A_ESCO') {
        return d > 15 ? '#1a9641' :
            d > 13 ? '#a6d96a' :
                d > 11 ? '#f4f466' :
                    d > 8 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'MIXTICIDAD') {
        return d > 1.05 ? '#1a9641' :
            d > 0.78 ? '#a6d96a' :
                d > 0.53 ? '#f4f466' :
                    d > 0.29 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'DESEM_JUV') {
                        return d > 46 ? '#d7191c' :
                        d > 24 ? '#fdae61' :
                            d > 13 ? '#f4f466' :
                                d > 4 ? '#a6d96a':
                                '#1a9641';
    }
    else if (currentStyle === 'INTERNET') {
        return d > 85 ? '#1a9641' :
            d > 51 ? '#a6d96a' :
                d > 32 ? '#f4f466' :
                    d > 13 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'T_DESEMPL') {
        return d > 65 ? '#d7191c' :
                        d > 15 ? '#fdae61' :
                            d > 9 ? '#f4f466' :
                                d > 4 ? '#a6d96a':
                                '#1a9641';
    }
    else if (currentStyle === 'PM10') {
        return d > 33 ? '#d7191c' :
            d > 30 ? '#fdae61' :
                d > 27 ? '#f4f466' :
                    d > 24 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'MAX_RANGO') {
        return d > 11 ? '#d7191c' :
            d > 8 ? '#fdae61' :
                d > 5 ? '#f4f466' :
                    d > 2 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'HURTOS') {
        return d > 435 ? '#d7191c' :
            d > 270 ? '#fdae61' :
                d > 179 ? '#f4f466' :
                    d > 107 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'HOMICIDIOS') {
        return d > 23 ? '#d7191c' :
            d > 18 ? '#fdae61' :
                d > 15 ? '#f4f466' :
                    d > 10 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'ESTRATO') {
        return d > 5 ? '#1a9641':
            d > 4 ? '#82E0AA'  :
            d > 3 ? '#a6d96a'  :
                d > 2 ? '#f4f466' :
                    d > 1 ? '#fdae61' :
                    d > 0 ? '#d7191c':
                    '#c3bfc2';
    }
    else if (currentStyle === 'VENEZOLANO') {
        return d > 100 ? '#d7191c' :
            d > 77 ? '#fdae61' :
                d > 25 ? '#f4f466' :
                    d > 5 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'MIX_ETNIAS') {
        return d > 0.24 ? '#1a9641' :
            d > 0.14 ? '#a6d96a' :
                d > 0.08 ? '#f4f466' :
                    d > 0.02 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EDU') {
        return d > 1.55 ? '#1a9641' :
            d > 1.33 ? '#a6d96a' :
                d > 1.07 ? '#f4f466' :
                    d > 0.46 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EST') {
        return d > 0.77 ? '#1a9641' :
            d > 0.54 ? '#a6d96a' :
                d > 0.33 ? '#f4f466' :
                    d > 0.12 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EDAD') {
        return d > 1.50 ? '#1a9641' :
            d > 1.38 ? '#a6d96a' :
                d > 1.17 ? '#f4f466' :
                    d > 0.50 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'DENSIDAD') {
        return d > 0.040 ? '#d7191c' :
            d > 0.020 ? '#fdae61' :
                d > 0.014 ? '#f4f466' :
                    d > 0.007 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'INDICE') {
        return d > 71.12 ? '#FCF9BB' :
            d > 66.29 ? '#FE9D6C' :
                d > 60.88 ? '#CA3E72' :
                    d > 53.28 ? '#862781' :
                    '#2A115C';
    }
    else {
        return d > 4 ? '#d7191c' :
            d > 3 ? '#fdae61' :
                d > 2 ? '#f4f466' :
                    d > 1 ? '#a6d96a' :
                        '#1a9641';
    }

}

function fillColor(feature) {
    return {
        fillColor:  setProColor(feature.properties[currentStyle]),
        weight: 0.6,
        opacity: 0.1,
        color: (currentStyle) ? '#ffffff00' : '#c3bfc2', 
        fillOpacity: (currentStyle) ? 0.9 : 0.5,
    };
}

function changeIndi(style) {
    currentStyle = style.value;
    indi.setStyle(fillColor);
    changeLegend((style.value && legends[style.value]) ? legends[style.value] :
        {
            
        });
}

var baseMaps = {
    'Esri Satellite': esriAerial,
    'Open Street Map': opens

};

// Defines the overlay maps. For now this variable is empty, because we haven't created any overlay layers
var overlayMaps = {
    //'Comunas': comu,
    //'Límite fronterizo con Venezuela': lim
};

// Adds a Leaflet layer control, using basemaps and overlay maps defined above
var layersControl = new L.Control.Layers(baseMaps, overlayMaps, {
    collapsed: true,
});
map.addControl(layersControl);
changeIndi({value: 'INDICE'});

function popupText(feature, layer) {
    layer.bindPopup(feature.properties.MUN + '<br />')
}

function popupText1(feature, layer) {
    layer.bindPopup('<strong>Límite fronterizo <br /> con Venezuela</strong>')
}
