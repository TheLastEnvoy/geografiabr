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

    // Lista de camadas com IDs corretos e nomes amigáveis
    const camadas = [
        {id: 'limites_ucs_federais_27022025-61kuqr', nome: 'Unidades de Conservação Federais'},
        {id: 'tis_poligonais_44n4cs', nome: 'Terras Indígenas'},
        {id: 'pasbr-geo-ceazcm', nome: 'Áreas Protegidas'},
        {id: 'baseHidroviariaBR_dpjkx7', nome: 'Hidrovias'},
        {id: 'aeroportosBR-c3uyet', nome: 'Aeroportos'},
        {id: 'baseFerroviariaBR-5wy7ld', nome: 'Ferrovias'}, // ID corrigido
        {id: 'rodoviasBR202501A-10ccdk', nome: 'Rodovias'}
    ];

    // Listar todas as camadas do mapa para debug
    const layers = map.getStyle().layers;
    console.log('Camadas disponíveis no mapa:', layers.map(layer => layer.id));

    // Para cada uma das nossas camadas de interesse
    camadas.forEach(camada => {
        // Encontrar todas as camadas do mapa que contêm nosso ID de interesse
        const matchingLayers = layers.filter(layer => layer.id.includes(camada.id));

        console.log(`Camadas encontradas para ${camada.nome}:`, matchingLayers.map(l => l.id));

        // Para cada camada correspondente, adicionar interatividade
        matchingLayers.forEach(matchingLayer => {
            // Adicionar evento de clique
            map.on('click', matchingLayer.id, function(e) {
                // Verificar se temos features
                if (!e.features || e.features.length === 0) {
                    console.log('Nenhuma feature encontrada no clique');
                    return;
                }

                // Obter as coordenadas do clique
                const coordinates = e.lngLat;

                // Obter as propriedades do elemento clicado
                const properties = e.features[0].properties;

                // Criar conteúdo HTML para o popup
                let html = `<h3>${camada.nome}</h3><div class="popup-content">`;

                // Adicionar todas as propriedades disponíveis
                for (const key in properties) {
                    if (properties[key] && properties[key] !== 'null' && properties[key] !== '') {
                        html += `<strong>${formatarNomePropriedade(key)}:</strong> ${properties[key]}`;
                    }
                }

                html += '</div>';

                // Mostrar o popup
                popup.setLngLat(coordinates)
                    .setHTML(html)
                    .addTo(map);

                console.log('Popup exibido para:', camada.nome);
            });

            // Mudar o cursor quando passar sobre elementos desta camada
            map.on('mouseenter', matchingLayer.id, function() {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', matchingLayer.id, function() {
                map.getCanvas().style.cursor = '';
            });

            console.log('Interatividade adicionada para camada:', matchingLayer.id);
        });
    });
});

// Função para formatar nomes de propriedades
function formatarNomePropriedade(nome) {
    // Substituir underscores por espaços e capitalizar cada palavra
    return nome
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}
