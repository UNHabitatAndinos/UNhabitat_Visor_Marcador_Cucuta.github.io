// Create variable to hold map element, give initial settings to map
var map = L.map('map', {
    center: [7.892, -72.506],
    zoom: 12.4,
    minZoom: 12.4,
    scrollWheelZoom: false,
});

map.once('focus', function() { map.scrollWheelZoom.enable(); });

L.easyButton('<img src="images/fullscreen.png">', function (btn, map) {
    var cucu = [7.892, -72.506];
    map.setView(cucu, 12.4);
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
         props.COM + '<br />' +
        'Viviendas ' + props.VIVI_OCU + '<br />' +
        'Hogares ' + props.HOGARES + '<br />' +
        'Personas ' + props.PERSONAS + '<br />' +  
        'Población de origen Venezuela ' + props.VENEZOLANO + '<br />' +  '<br />' + 

        '<b>Marcador Inclusión Urbana '  + props.INDICE.toFixed(0)  + ' %' + '</b>'+ '<br />' + '<br />' + 

        '<b>Vivienda '  + props.VIV.toFixed(0)  + ' %' + '</b>'+ '<br />' +
        'Calidad: ' + props.V_CAL.toFixed(0) + ' %' + '<br />' +
        'Servicios: ' + props.V_SER.toFixed(0) + ' %' + '<br />' +
        'Asequibilidad: </b> ' + props.V_ASE.toFixed(0)  + ' %' +  '<br />' +  '<br />' +  

        '<b>Salud ' + props.SAL.toFixed(0)  + ' %'  + '</b>'+ '<br />' +
        'Proximidad: ' + props.S_PRO.toFixed(0) + ' %' + '<br />' +
        'Exposición factores ambientales: ' + props.S_AMB.toFixed(0) + ' %' + '<br />' +
        'Bienestar: '  + props.S_BIE.toFixed(0)  + ' %' +  '<br />' +  '<br />' +  

        '<b>Educación, cultura y diversidad ' + props.EDU.toFixed(0)  + ' %'  + '</b>'+  '<br />' +
        'Proximidad: ' + props.E_PRO.toFixed(0) + ' %' + '<br />' +
        'Diversidad: ' + props.E_DIV.toFixed(0) + ' %' + '<br />' +
        'Bienestar: '  + props.E_BIE.toFixed(0)  + ' %' +  '<br />' +  '<br />' +  
        
        '<b>Espacios públicos, seguridad y recreación ' + props.EPUB.toFixed(0)  + ' %'  + '</b>'+ '<br />' +
        'Proximidad: ' + props.EP_PRO.toFixed(0) + ' %' + '<br />' +
        'Vitalidad: ' + props.EP_VIT.toFixed(0) + ' %' + '<br />' +
        'Seguridad y protección: '  + props.EP_SEG.toFixed(0)  + ' %' +  '<br />' +  '<br />' +  

        '<b>Oportunidades económicas ' + props.OPO.toFixed(0)  + ' %'  + '</b>'+  '<br />' +
        'Proximidad: ' + props.O_PRO.toFixed(0) + ' %' + '<br />' +
        'Bienestar: '  + props.O_BIE.toFixed(0) + ' %'   : 'Seleccione una manzana');
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
