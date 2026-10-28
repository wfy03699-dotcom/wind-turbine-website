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
  title: 'S2-400W Horizontal Axis Wind Turbine', power: '400W', voltage: '12V / 24V / 48V DC',
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

// FK-1000W owner-supplied infographic first, followed by seven original installation photographs.
products.push({
  id: 'horizontal-1000', axis: 'horizontal', type: 'turbine',
  title: 'FK-1000W Horizontal Axis Wind Turbine', power: '1000W', voltage: '48V–220V',
  detailPage: '1000w-horizontal-axis-wind-turbine.html',
  description: 'FK-1000 horizontal-axis three-blade turbine. Supplier infographic lists 1000W rated / 1100W maximum power, 48V–220V, 2 m/s start-up wind speed, 12 m/s rated wind speed, 2.8 m rotor diameter and 60 kg weight. Confirm the voltage option, electrical output, tested performance and accessories before ordering.',
  gallery: [
    {src: 'assets/products/FK-1000W-horizontal-wind-turbine-main.png', alt: 'FK-1000 1000W horizontal axis wind turbine product infographic and model overview'},
    {src: 'assets/products/31.jpg', alt: 'FK-1000 horizontal axis wind turbine original product photograph 1'},
    {src: 'assets/products/33.jpg', alt: 'FK-1000 horizontal axis wind turbine original product photograph 2'},
    {src: 'assets/products/34.jpg', alt: 'FK-1000 horizontal axis wind turbine original product photograph 3'},
    {src: 'assets/products/37.jpg', alt: 'FK-1000 horizontal axis wind turbine original product photograph 4'},
    {src: 'assets/products/53.jpg', alt: 'FK-1000 horizontal axis wind turbine original product photograph 5'},
    {src: 'assets/products/62.jpg', alt: 'FK-1000 horizontal axis wind turbine original product photograph 6'},
    {src: 'assets/products/68.jpg', alt: 'FK-1000 horizontal axis wind turbine original product photograph 7'}
  ],
  specifications: [
    ['Model', 'FK-1000'],
    ['Rated power', '1000W'],
    ['Maximum power', '1100W'],
    ['Axis orientation', 'Horizontal'],
    ['Rated voltage', '48V–220V (confirm exact option)'],
    ['Start-up wind speed', '2 m/s'],
    ['Rated wind speed', '12 m/s'],
    ['Survival wind speed', '50 m/s'],
    ['Weight', '60 kg'],
    ['Rotor diameter', '2.8 m'],
    ['Blade height', '1.4 m (as labeled)'],
    ['Number of blades', '3'],
    ['Blade material', 'Nylon fiber'],
    ['Body material', 'Aluminum alloy'],
    ['Generator type', '3-phase permanent magnet AC synchronous generator'],
    ['Control system', 'Electromagnetic'],
    ['Yaw mode', 'Automatic upwind'],
    ['Operating temperature', '−40°C to +80°C'],
    ['Design life', 'More than 20 years (supplier claim)']

  ]
});

// Real 600W horizontal-axis product photographs. Do not substitute M6-6000/6000W specifications.
const horizontal600 = products.find(p => p.id === 'horizontal-600');
if (horizontal600) {
  horizontal600.title = 'M6-600W Horizontal Axis Wind Turbine';
  horizontal600.detailPage = '600w-horizontal-axis-wind-turbine.html';
  horizontal600.voltage = 'Contact Us';
  horizontal600.description = 'A 600W-rated three-blade horizontal axis wind turbine. Review real installation and component photographs. Confirm voltage, controller compatibility, mounting requirements and tested performance before ordering.';
  horizontal600.gallery = [
    {src:'assets/products/600w-horizontal-10-specification-infographic.png', alt:'600W horizontal axis wind turbine marketing infographic; model number and technical specifications pending verification'},
    {src:'assets/products/600w-horizontal-01-main.webp', alt:'Installed full view of the three-blade 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-02-installed-front.webp', alt:'Installed front three-quarter view of the 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-03-installed-rear.webp', alt:'Installed rear three-quarter view of the 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-04-generator-side.webp', alt:'Close-up side view of the 600W horizontal axis wind turbine generator housing'},
    {src:'assets/products/600w-horizontal-05-hub-front.webp', alt:'Close-up of the rotor hub and blades of the 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-06-factory-assembly.webp', alt:'Factory assembly views of the 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-07-tail-assembly.webp', alt:'Factory photographs of the tail assembly of the 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-08-components.webp', alt:'Disassembled components and three blades of the 600W horizontal axis wind turbine'},
    {src:'assets/products/600w-horizontal-09-exploded-diagram.webp', alt:'Exploded assembly drawing of the three-blade horizontal axis wind turbine'},
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


// Newly added two-blade vertical-axis series. The owner specified four rated power
// variants; the provided 5–20kW parameter sheets do not verify the 400W–2000W specs.
products.push({
  id: 'vertical-series-400-2000', axis: 'vertical', type: 'turbine',
  title: '400W–2000W Vertical Axis Wind Turbine', power: '400W–2000W', voltage: 'Confirm option',
  detailPage: '400w-2000w-vertical-axis-wind-turbine.html',
  description: 'A two-blade vertical-axis wind turbine family offered in 400W, 600W, 1000W and 2000W rated-power options. See real green and white turbine photographs. Voltage, output, dimensions and other model-specific specifications require confirmation.',
  gallery: [

    {src:'assets/products/vertical-main-poster-q90.webp',alt:'400W, 600W, 1000W and 2000W vertical-axis wind turbine product information poster'},
{src:'assets/products/61.jpg',alt:'Full view of a white two-blade vertical-axis wind turbine outdoors'},
    {src:'assets/products/25.jpg',alt:'White vertical-axis wind turbine photographed outdoors, view one'},
    {src:'assets/products/27.jpg',alt:'White vertical-axis wind turbine photographed outdoors, view two'},
    {src:'assets/products/44.jpg',alt:'White and green vertical-axis wind turbines displayed together outdoors'},
    {src:'assets/products/51.jpg',alt:'Close-up of vertical-axis wind turbine generator and mounting assembly'},
    {src:'assets/products/54.jpg',alt:'Vertical-axis wind turbine lower mounting and generator close-up'}
  ],
  specifications: [
    ['Rated power options','400W / 600W / 1000W / 2000W'],
    ['Axis orientation','Vertical'],
    ['Blade design','2 curved blades (as pictured)'],
    ['Available finish','Green / white (confirm)'],
    ['Voltage / electrical output','Contact Us'],
    ['Start-up wind speed','Contact Us'],
    ['Rated wind speed','Contact Us'],
    ['Rotor dimensions / weight','Contact Us'],
    ['Generator and controller','Contact Us']
  ]
});


// New independent FX-600 series listing. Product photos show a VERTICAL rotor
// although an early user message called it horizontal. Do not merge with the
// existing unrelated horizontal-600 page.
products.push({
  id:'vertical-fx-600',axis:'vertical',type:'turbine',
  title:'FX-600W 600W Vertical Axis Wind Turbine',
  power:'600W',voltage:'12V–48V AC',
  detailPage:'fx-600w-vertical-axis-wind-turbine.html',
  description:'The FX-600 600W-rated three-blade vertical-axis wind turbine. Supplier lists 650W maximum, 1.3m/s start-up, 10m/s rated wind speed, 0.6m rotor diameter and 1.0m blade height. Confirm voltage option, tested power output and compatible controller before ordering.',
  gallery:[
    {src:'assets/products/fx-600w-main.png',alt:'FX-600 600W vertical-axis wind turbine model overview and specifications poster'},
    {src:'assets/products/fx-600w-outdoor-front.jpg',alt:'Full view of white FX-600 three-blade vertical-axis turbine installed next to water'},
    {src:'assets/products/fx-600w-outdoor-angle.jpg',alt:'Angled outdoor view of FX-600 three-blade vertical-axis wind turbine'},
    {src:'assets/products/fx-600w-outdoor-side.jpg',alt:'Side-on view of the white FX-600 vertical-axis turbine'},
    {src:'assets/products/fx-600w-green-dimensions.jpg',alt:'FX-600 green version with annotated diameter and height'},
    {src:'assets/products/fx-600w-white-dimensions.jpg',alt:'FX-600 white version with annotated diameter and height'},
    {src:'assets/products/fx-600w-blade-hub-detail.jpg',alt:'Close-up of FX-600 blade supports, bolts and generator assembly'},
    {src:'assets/products/fx-600w-bottom-view.jpg',alt:'Underside of three-blade vertical-axis rotor with support arms'},
    {src:'assets/products/fx-600w-color-options.jpg',alt:'FX-600 vertical-axis turbine displayed with white, green and red blades'},
    {src:'assets/products/fx-600w-generator-detail.jpg',alt:'FX-600 generator housing and installation flange close-up'},
    {src:'assets/products/fx-600w-system-diagram.jpg',alt:'Illustrative controller battery and inverter wiring overview; not installation instructions'}
  ],
  specifications:[
    ['Model','FX-600'],['Rated power','600W'],['Maximum power','650W'],
    ['Axis orientation','Vertical'],['Number of blades','3'],
    ['Rated voltage (AC)','12V–48V'],['Start-up wind speed','1.3 m/s'],
    ['Cut-in wind speed','2.5 m/s'],['Rated wind speed','10 m/s'],
    ['Rotor diameter','0.6 m'],['Blade height','1.0 m'],
    ['Blade material','Nylon / fiberglass'],['Blade colors','White / green / red'],
    ['Packed weight','Less than 26 kg'],
    ['Survival wind speed','≤40 m/s (supplier specification)'],
    ['Control system','Electromagnetic'],['Installation height','2–12 m'],
    ['Generator protection','IP54'],['Operating temperature','−25°C to +45°C'],
    ['Operating humidity','≤90%'],['Altitude','≤4,500 m'],
    ['Overspeed protection','Electromagnetic brake'],
    ['Overload protection','Electromagnetic braking and unloading device']
  ]
});


// FH 400W / 600W / 800W range. Rotor orientation and model specifications
// are intentionally left unconfirmed until owner documentation is received.
products.push({
  id:'fh-series-400-800',
  axis:'unconfirmed',type:'turbine',
  title:'FH Series 400W / 600W / 800W Wind Turbines',
  power:'400W–800W',voltage:'Confirm model',
  detailPage:'fh-400w-600w-800w-wind-turbines.html',
  image:'assets/products/fh-series-01-main-poster.png',
  imageAlt:'FH-400W / FH-600W / FH-800W supplier product data and power chart',
  description:'Independent FH-family product listing for FH-400W (400W), FH-600W (600W) and FH-800W (800W). Turbine axis orientation, rated voltage, electrical output, blade dimensions and technical performance are pending manufacturer confirmation.',
  specifications:[
    ['Model options','FH-400W / FH-600W / FH-800W'],
    ['Rated power options','400W / 600W / 800W (from model names)'],
    ['Rotor orientation','To be confirmed'],
    ['Rated voltage','To be confirmed'],
    ['Start-up / rated wind speed','To be confirmed'],
    ['Blade dimensions and materials','To be confirmed'],
    ['Generator output and controller','To be confirmed'],
    ['Product photos','Awaiting FH series photo upload'],
    ['Technical documents','Awaiting model-specific data sheets']
  ]
});

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
  // FH uses the same real product image renderer as the other product cards.
  return `<img class="product-photo" src="${p.image || 'assets/products/placeholder.svg'}" alt="${p.image ? p.imageAlt : `${p.title} — product photo not yet available`}" width="640" height="480" loading="lazy"${p.id === 'vertical-fx-600' ? ' onerror="this.onerror=null;this.src=\'assets/products/placeholder.svg\'"' : ''}>`;
}

function productUrl(p) { return p.detailPage || `product.html?id=${encodeURIComponent(p.id)}`; }
