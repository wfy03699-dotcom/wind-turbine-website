'use strict';
const products = [];
for (const watts of [500, 600, 800]) {
  for (const axis of ['vertical', 'horizontal']) {
    products.push({id:`${axis}-${watts}`,axis,type:'turbine',title:`${watts}W Wind Turbine`,power:`${watts}W`,voltage:'12V–48V',description:`A ${axis} axis wind turbine in the ${watts}W product range. Discuss your site conditions and electrical requirements to select an appropriate configuration.`});
  }
}
for (const axis of ['vertical', 'horizontal']) products.push({id:`${axis}-generator`,axis,type:'generator',title:`${axis === 'vertical' ? 'Vertical' : 'Horizontal'} Axis Permanent Magnet Generator`,power:'100W–500kW',voltage:'12V–440V',description:`Explore ${axis} axis permanent magnet generators across a 100W–500kW power range and 12V–440V voltage range. These figures describe the product family; individual models and available combinations require confirmation.`});

// Replace image with a verified local product photo path; leave empty for the placeholder.
products.forEach(product => { product.image = ''; product.imageAlt = `${product.title} — ${product.axis} axis`; });
function productSpecs(p) {
  const common = [['Axis orientation', p.axis === 'vertical' ? 'Vertical' : 'Horizontal'], [p.type === 'generator' ? 'Power range' : 'Rated power', p.power], ['Voltage range', p.voltage]];
  const fields = p.type === 'generator' ? ['Rated rotational speed', 'Efficiency', 'Weight', 'Dimensions'] : ['Start-up wind speed', 'Rated wind speed', 'Number of blades', 'Weight', 'Rotor diameter'];
  return common.concat(fields.map(field => [field, 'Contact Us']));
}
function productImage(p) {
  return `<img class="product-photo" src="${p.image || 'assets/products/placeholder.svg'}" alt="${p.image ? p.imageAlt : 'Product photo not yet available'}" width="640" height="480" loading="lazy">`;
}
