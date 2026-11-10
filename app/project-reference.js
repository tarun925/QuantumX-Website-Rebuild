// Project details from the supplied QuantumX Brand Portfolio & Services Reference.
// Website showcase entries are presented as examples without assuming delivery scope.
const websiteExample = (brand, description, extraWork = []) => ({
  description,
  caseStudy: {
    collaboration: `${brand} is featured in QuantumX's website portfolio. The reference does not specify the exact delivery scope or platform for this project.`,
    process: [],
    platform: 'Website',
    services: 'Website portfolio showcase',
    challenge: 'The project brief and specific challenges have not yet been provided.',
    experience: `The portfolio includes a website example for ${brand}. Further details about the work and its outcomes can be added when available.`,
    work: [{title:'Website portfolio',description:`A website example for ${brand} appears in the QuantumX portfolio.`,media:'Additional website details and visuals to be added'}, ...extraWork],
  },
});
const creative = (collaboration, services, challenge, experience, work) => ({caseStudy:{collaboration,process:[],platform:'Creative design',services,challenge,experience,work}});

export const projectReference = {
  'zellify': {caseStudy:{
    collaboration:'QuantumX designed and built a conversion-focused landing page for Zellify, a platform that drives mobile subscriptions through the web.',
    process:['Landing page design','Development'],
    platform:'Web landing page',services:'Landing page design · Development',url:'https://zellify.app/',
    challenge:'Create a landing page that communicates the product’s features, aligns visually with its dashboard and encourages visitors to sign up.',
    experience:'The landing page presents Zellify’s product interface, funnel and performance features, and web-to-app messaging in a cohesive experience.',
    work:[{title:'Landing page design',description:'Designed a page that reflects the look and feel of the Zellify product dashboard.',media:'Landing page designs to be added'},{title:'Development & product presentation',description:'Built a conversion-focused landing page presenting the platform’s features and web-to-app offering.',media:'Landing page screenshots to be added'}],
  }},
  'aurenor-salon': creative('The portfolio presents a visual identity and brand kit for Aurenor Signature Salon.','Brand identity · Brand kit · Promotional creative','Create a cohesive identity across the brand materials shown in the portfolio.','The identity brings together a logo and monogram, a palette of dark grey-brown and orange tones, and a range of brand applications.',[{title:'Identity & colour',description:'A logo, monogram and colour palette form the foundation of the presented brand kit.',media:'Brand identity examples to be added'},{title:'Brand applications',description:'The portfolio shows signage, stationery and packaging-style mock-ups, a staff panel and grand-opening creative.',media:'Brand applications to be added'}]),
  'living-structures': creative('Living Structures appears in the portfolio through property promotion artwork and residential development creative.','Property posters · Promotional creative','Present residential property messaging through promotional layouts.','The showcased work combines building imagery and project messaging in property-focused promotional designs.',[{title:'Property promotion',description:'Residential development posters and additional property promotion layouts are shown in the creative showcase.',media:'Property creative examples to be added'}]),
  'milky-mist': creative('The portfolio features Milky Mist product photography and large-format advertising imagery.','Product photography · Creative imagery','Present the dairy brand’s products through clear, product-led imagery.','Milky Mist-branded product imagery appears alongside out-of-home advertising examples. The production and media-buying scope is not specified.',[{title:'Product photography',description:'The portfolio includes photography featuring Milky Mist products.',media:'Product photography examples to be added'},{title:'Large-format imagery',description:'Product-led creative is shown in large-format and out-of-home placements.',media:'Advertising examples to be added'}]),
  'storiesnsilk': websiteExample('StoriesnSilk','A fashion and apparel-oriented brand shown in the website portfolio.'),
  'vendolite': websiteExample('Vendolite','A vending-machine and automated retail solutions brand featured in the website and creative portfolios.',[{title:'Product creative',description:'Product-led promotional layouts show vending machines and franchise-related messaging.',media:'Product creative examples to be added'}]),
  'infreeze': websiteExample('Infreeze','A brand presented through a product-oriented website in the portfolio.'),
  'infec-services': websiteExample('Infec Services','A services business featured through a corporate website example.'),
  'bdm-ads': websiteExample('BDM Ads','A brand featured in the website portfolio.'),
  'anantha-shaiya': websiteExample('Anantha Shaiya','A brand featured in the website portfolio.'),
  'zayn-studios': websiteExample('Zayn Studios','An in-house podcast and content production studio in Chennai.',[{title:'Studio showcase',description:'The portfolio also shows the studio interiors, recording setup and production environment; the delivery scope is not specified.',media:'Studio images and project details to be added'}]),
  'nutri-green-salt': websiteExample('Nutri Green Salt','A salt and food product brand featured in the website and creative portfolios.',[{title:'Product creative',description:'Pack-led promotional layouts present the salt products and their benefits.',media:'Product creative examples to be added'}]),
  'region-space-interiors': websiteExample('Region Space Interiors','An interiors-focused brand featured in the website portfolio.'),
  'riota-iot-solutions': websiteExample('Riota IoT Solutions','An IoT solutions brand featured in the website portfolio.'),
  'x-pin': websiteExample('X-pin','A pin-related product presented through a product-led website in the portfolio.'),
};
