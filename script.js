// Token de acesso Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoidGhlbGFzdGVudm95IiwiYSI6ImNtODdhbDBwYTBkZG8yanBzNjlidXk0ZDUifQ.syn5du944H7p5DPH81zIKA';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/thelastenvoy/cm87jsb2t00he01qvd2vnf9n4',
    center: [-55.0, -10.0], // Centro do Brasil
    zoom: 4
});

// Adicionar controles de navegação
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

// Popup para mostrar informações
const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: true,
    maxWidth: '300px'
});

map.on('load', function() {
    console.log('Mapa carregado com sucesso!');

    // Configurar interatividade para cada camada
    const camadas = [
        {id: 'limites_ucs_federais_27022025-61kuqr', nome: 'Unidades de Conservação Federais'},
        {id: 'tis_poligonais_44n4cs', nome: 'Terras Indígenas'},
        {id: 'pasbr-geo-ceazcm', nome: 'Áreas Protegidas'},
        {id: 'baseHidroviariaBR_dpjkx7', nome: 'Hidrovias'},
        {id: 'aeroportosBR-c3uyet', nome: 'Aeroportos'},
        {id: 'baseFerroviariaBR-5wy7Id', nome: 'Ferrovias'},
        {id: 'rodoviasBR202501A-10ccdk', nome: 'Rodovias'}
    ];

    // Adicionar interatividade para cada camada
    camadas.forEach(camada => {
        // Mudar o cursor para indicar que o elemento é clicável
        map.on('mouseenter', camada.id, () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', camada.id, () => {
            map.getCanvas().style.cursor = '';
        });

        // Mostrar popup ao clicar
        map.on('click', camada.id, (e) => {
            // Obter as coordenadas do clique
            const coordinates = e.lngLat;

            // Obter as propriedades do elemento clicado
            const properties = e.features[0].properties;

            // Criar o conteúdo HTML do popup
            let html = `<h3>${camada.nome}</h3><div class="popup-content">`;

            // Adicionar todas as propriedades disponíveis
            for (const [key, value] of Object.entries(properties)) {
                if (value && value !== 'null' && value !== '') {
                    html += `<strong>${formatarNomePropriedade(key)}:</strong> ${value}<br>`;
                }
            }

            html += '</div>';

            // Mostrar o popup
            popup.setLngLat(coordinates)
                .setHTML(html)
                .addTo(map);
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
