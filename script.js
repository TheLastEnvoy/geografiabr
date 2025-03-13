// Token de acesso Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoidGhlbGFzdGVudm95IiwiYSI6ImNtODdhbDBwYTBkZG8yanBzNjlidXk0ZDUifQ.syn5du944H7p5DPH81zIKA';

// Inicializar o mapa
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/thelastenvoy/cm87jsb2t00he01qvd2vnf9n4',
    center: [-55.0, -10.0],
    zoom: 4
});

// Adicionar controles básicos
map.addControl(new mapboxgl.NavigationControl());

// Criar um popup vazio
const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: true
});

// Quando o mapa carregar
map.on('load', function() {
    console.log('Mapa carregado com sucesso!');

    // Lista de IDs de camadas para adicionar interatividade
    const layerIds = [
        'limites_ucs_federais_27022025-61kuqr',
        'tis_poligonais_44n4cs',
        'pasbr-geo-ceazcm',
        'baseHidroviariaBR_dpjkx7',
        'aeroportosBR-c3uyet',
        'baseFerroviariaBR-5wy7Id',
        'rodoviasBR202501A-10ccdk'
    ];

    // Obter todas as camadas do mapa
    const layers = map.getStyle().layers;

    // Para cada camada no mapa
    layers.forEach(layer => {
        // Verificar se a camada tem um ID que contém algum dos nossos IDs de interesse
        const matchingId = layerIds.find(id => layer.id.includes(id));

        if (matchingId) {
            // Adicionar evento de clique para esta camada
            map.on('click', layer.id, function(e) {
                // Obter as coordenadas do clique
                const coordinates = e.lngLat;

                // Obter as propriedades do elemento clicado
                const properties = e.features[0].properties;

                // Criar conteúdo HTML para o popup
                let html = `<h3>${layer.id}</h3><div class="popup-content">`;

                // Adicionar todas as propriedades disponíveis
                for (const key in properties) {
                    if (properties[key] && properties[key] !== 'null') {
                        html += `<strong>${key}:</strong> ${properties[key]}<br>`;
                    }
                }

                html += '</div>';

                // Mostrar o popup
                popup.setLngLat(coordinates)
                    .setHTML(html)
                    .addTo(map);

                console.log('Popup exibido para:', layer.id);
            });

            // Mudar o cursor quando passar sobre elementos desta camada
            map.on('mouseenter', layer.id, function() {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', layer.id, function() {
                map.getCanvas().style.cursor = '';
            });

            console.log('Interatividade adicionada para camada:', layer.id);
        }
    });
});
