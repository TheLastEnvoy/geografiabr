
mapboxgl.accessToken = 'SEU_TOKEN_DE_ACESSO_MAPBOX';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/thelastenvoy/cm87jsb2t00he01qvd2vnf9n4', // Seu estilo personalizado
    center: [-55.0, -10.0], // Ajuste para o centro do Brasil ou sua área de interesse
    zoom: 4
});

// Como você já configurou todas as camadas no Mapbox Studio, 
// não é necessário adicioná-las novamente aqui.
// O estilo já contém todas as suas camadas configuradas:
// - limites_ucs_federais_27022025-61kuqr (thelastenvoy.536ko66i)
// - tis_poligonais_44n4cs (thelastenvoy.anh03rxm)
// - pasbr-geo-ceazcm (thelastenvoy.de4zkdv7)
// - baseHidroviariaBR_dpjkx7 (thelastenvoy.35w7n4yu)
// - aeroportosBR-c3uyet (thelastenvoy.csvhz4mc)
// - baseFerroviariaBR-5wy7Id (thelastenvoy.cpzdbv6d)
// - rodoviasBR202501A-10ccdk (thelastenvoy.984ce0ig)

// Você pode adicionar controles adicionais se desejar
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

// Opcional: Adicionar uma legenda ou outros elementos de interface
map.on('load', function() {
    // Aqui você pode adicionar código para executar após o carregamento do mapa
    console.log('Mapa carregado com sucesso!');
});
