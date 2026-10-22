'use strict';
const products = [];
for (const watts of [500, 600, 800]) {
  for (const axis of ['vertical', 'horizontal']) {
    products.push({id:`${axis}-${watts}`,axis,type:'turbine',title:`${watts}W ${axis === 'vertical' ? 'Vertical' : 'Horizontal'} Axis Wind Turbine`,power:`${watts}W`,voltage:'12V–48V',description:`A ${axis} axis wind turbine in the ${watts}W product range. Discuss your site conditions and electrical requirements to select an appropriate configuration.`});
  }
}
for (const axis of ['vertical', 'horizontal']) products.push({id:`${axis}-generator`,axis,type:'generator',title:`${axis === 'vertical' ? 'Vertical' : 'Horizontal'} Axis Permanent Magnet Generator`,power:'100W–500kW',voltage:'12V–440V',description:`Explore ${axis} axis permanent magnet generators across a 100W–500kW power range and 12V–440V voltage range. These figures describe the product family; individual models and available combinations require confirmation.`});

products.push({
  id: 'horizontal-400', axis: 'horizontal', type: 'turbine',
  title: '400W Horizontal Axis Wind Turbine', power: '400W', voltage: '12V / 24V / 48V DC',
  detailPage: '400w-horizontal-axis-wind-turbine.html',
  description: 'Explore renewable wind energy with a compact 400W horizontal axis wind turbine for residential systems, off-grid projects, farms and cabins. Its five-blade rotor, fiberglass nylon blades and aluminum alloy body offer a practical starting point for a site-specific wind energy installation. Actual output and sound levels depend on wind conditions, siting and installation.',
  // Owner-selected parameter sheet first, followed by the five original photographs.
  gallery: [
    {src: 'assets/products/111111.png', alt: '400W horizontal axis wind turbine product sheet with specifications, dimensions and power curve'},
    {src: 'assets/products/1E4D8CEE2B4509E01195569A66EA7854.jpg', alt: 'Front view of the five-blade 400W horizontal axis wind turbine'},
    {src: 'assets/products/27D9CF43B08F8E93203602631620E935.jpg', alt: 'Rear three-quarter view of the five-blade 400W horizontal axis wind turbine'},
    {src: 'assets/products/4EF25E9E2B77A6304FF091F382AEFE4D.jpg', alt: 'Side view of the five-blade 400W horizontal axis wind turbine'},
    {src: 'assets/products/00A2B646E9E57D888DF3E0B5E8A6B993 - 副本.jpg', alt: 'Close three-quarter view of the five-blade 400W horizontal axis wind turbine'},
    {src: 'assets/products/9F2B9992D2DE4117F17AE0C5D5C60EEE - 副本.jpg', alt: 'Installed three-quarter view of the five-blade 400W horizontal axis wind turbine'}
  ],
  specifications: [
    ['Rated power', '400W'], ['Maximum power', '450W'],
    ['Rated voltage', '12V / 24V / 48V DC'], ['Start-up wind speed', '2.0 m/s'],
    ['Rated wind speed', '11 m/s'], ['Survival wind speed', '50 m/s'],
    ['Number of blades', '5'], ['Blade material', 'Fiberglass Nylon'],
    ['Body material', 'Aluminum Alloy'], ['Generator type', '3-Phase AC Permanent Magnet Generator'],
    ['Control system', 'Electromagnetic'], ['Working temperature', '-40°C to +80°C'],
    ['Protection grade', 'IP54'], ['Net weight', '11 kg'], ['Package weight', 'Approximately 13 kg']
  ]
});

// Real 600W horizontal-axis product photographs. Do not substitute M6-6000/6000W specifications.
const horizontal600 = products.find(p => p.id === 'horizontal-600');
if (horizontal600) {
  horizontal600.detailPage = '600w-horizontal-axis-wind-turbine.html';
  horizontal600.voltage = 'Contact Us';
  horizontal600.description = 'A 600W-rated three-blade horizontal axis wind turbine. Review real installation and component photographs. Confirm voltage, controller compatibility, mounting requirements and tested performance before ordering.';
  horizontal600.gallery = [
    {src:'assets/products/600w-horizontal-01-main.webp', alt:'Installed full view of the three-blade 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-02-installed-front.webp', alt:'Installed front three-quarter view of the 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-03-installed-rear.webp', alt:'Installed rear three-quarter view of the 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-04-generator-side.webp', alt:'Close-up side view of the 600W horizontal axis wind turbine generator housing'},
    {src:'assets/products/600w-horizontal-05-hub-front.webp', alt:'Close-up of the rotor hub and blades of the 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-06-factory-assembly.webp', alt:'Factory assembly views of the 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-07-tail-assembly.webp', alt:'Factory photographs of the tail assembly of the 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-08-components.webp', alt:'Disassembled components and three blades of the 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-09-exploded-diagram.webp', alt:'Exploded assembly drawing of the three-blade horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-10-specification-infographic.webp', alt:'600W horizontal axis wind turbine marketing infographic; model number and technical specifications pending verification'}
  ];
  horizontal600.specifications = [
    ['Rated power','600W'],
    ['Axis orientation','Horizontal'],
    ['Number of blades','3'],
    ['Rated voltage','Contact Us'],
    ['Maximum power','Contact Us'],
    ['Start-up wind speed','Contact Us'],
    ['Rated wind speed','Contact Us'],
    ['Survival wind speed','Contact Us'],
    ['Rotor diameter','Contact Us'],
    ['Blade material','Contact Us'],
    ['Generator type','Contact Us'],
    ['Weight','Contact Us']
  ];
}

// Replace image with a verified local product photo path; leave empty for the placeholder.
products.forEach(product => {
  product.image = product.image || product.gallery?.[0]?.src || '';
  product.imageAlt = product.imageAlt || product.gallery?.[0]?.alt || product.title;
});
function productSpecs(p) {
  if (p.specifications) return p.specifications;
  const common = [['Axis orientation', p.axis === 'vertical' ? 'Vertical' : 'Horizontal'], [p.type === 'generator' ? 'Power range' : 'Rated power', p.power], ['Voltage range', p.voltage]];
  const fields = p.type === 'generator' ? ['Rated rotational speed', 'Efficiency', 'Weight', 'Dimensions'] : ['Start-up wind speed', 'Rated wind speed', 'Number of blades', 'Weight', 'Rotor diameter'];
  return common.concat(fields.map(field => [field, 'Contact Us']));
}
function productImage(p) {
  return `<img class="product-photo" src="${p.image || 'assets/products/placeholder.svg'}" alt="${p.image ? p.imageAlt : `${p.title} — product photo not yet available`}" width="640" height="480" loading="lazy">`;
}

function productUrl(p) { return p.detailPage || `product.html?id=${encodeURIComponent(p.id)}`; }
