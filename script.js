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

map.on('load', function() {
    console.log('Mapa carregado com sucesso!');
});
