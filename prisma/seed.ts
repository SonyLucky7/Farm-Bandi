import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Delete existing data (optional, but good for idempotency)
  await prisma.collectionProduct.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.comboProduct.deleteMany();
  await prisma.combo.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.deliveryZone.deleteMany();

  // 2. Brands
  const brandsData = [
    { name: 'Farm Bandi', slug: 'farm-bandi', description: 'Premium Indian Groceries', isFeatured: true },
    { name: '24 Mantra Organic', slug: '24-mantra-organic', description: 'Organic products', isFeatured: true },
    { name: 'MTR', slug: 'mtr', description: 'Ready to eat and spices', isFeatured: true },
    { name: 'Aashirvaad', slug: 'aashirvaad', description: 'Atta and spices', isFeatured: true },
    { name: 'Patanjali', slug: 'patanjali', description: 'Ayurvedic and natural', isFeatured: false },
    { name: "Haldiram's", slug: 'haldirams', description: 'Sweets and snacks', isFeatured: true },
    { name: 'Dabur', slug: 'dabur', description: 'Health and personal care', isFeatured: false },
    { name: 'Tata', slug: 'tata', description: 'Salt, tea and staples', isFeatured: true },
    { name: 'MDH', slug: 'mdh', description: 'Spices', isFeatured: true },
    { name: 'Everest', slug: 'everest', description: 'Spices', isFeatured: false },
  ];

  const brands = {};
  for (const b of brandsData) {
    brands[b.slug] = await prisma.brand.create({ data: b });
  }

  // 3. Categories
  const categoriesData = [
    { name: 'Fruits & Vegetables', slug: 'fruits-vegetables', position: 1 },
    { name: 'Atta, Flours & Sooji', slug: 'atta-flours-sooji', position: 2 },
    { name: 'Beans, Dals & Pulses', slug: 'beans-dals-pulses', position: 3 },
    { name: 'Dry Fruits, Nuts & Seeds', slug: 'dry-fruits-nuts-seeds', position: 4 },
    { name: 'Pickles & Sauces', slug: 'pickles-sauces', position: 5 },
    { name: 'Rice & Rice Products', slug: 'rice-products', position: 6 },
    { name: 'Millets & Millet Products', slug: 'millets-products', position: 7 },
    { name: 'Papad, Noodles & Vermicelli', slug: 'papad-noodles', position: 8 },
    { name: 'Sweets & Snacks', slug: 'sweets-snacks', position: 9 },
    { name: 'Spices', slug: 'spices', position: 10 },
    { name: 'Honey', slug: 'honey', position: 11 },
    { name: 'Dairy / Milk', slug: 'dairy-milk', position: 12 },
    { name: 'Specials', slug: 'specials', position: 13 },
    { name: 'Festival Essentials', slug: 'festival-essentials', position: 14 },
    { name: 'Beverages', slug: 'beverages', position: 15 },
  ];

  const categories = {};
  for (const c of categoriesData) {
    categories[c.slug] = await prisma.category.create({ data: c });
  }

  // Subcategories
  const subcategories = [
    { name: 'Fruits', slug: 'fruits', parentId: categories['fruits-vegetables'].id },
    { name: 'Vegetables', slug: 'vegetables', parentId: categories['fruits-vegetables'].id },
    { name: 'Organic', slug: 'organic-veg', parentId: categories['fruits-vegetables'].id },
    { name: 'Seasonal', slug: 'seasonal-veg', parentId: categories['fruits-vegetables'].id },
    { name: 'Wheat Flour', slug: 'wheat-flour', parentId: categories['atta-flours-sooji'].id },
    { name: 'Rice Flour', slug: 'rice-flour', parentId: categories['atta-flours-sooji'].id },
    { name: 'Besan', slug: 'besan', parentId: categories['atta-flours-sooji'].id },
    { name: 'Sooji', slug: 'sooji', parentId: categories['atta-flours-sooji'].id },
    { name: 'Maida', slug: 'maida', parentId: categories['atta-flours-sooji'].id },
    { name: 'Toor Dal', slug: 'toor-dal', parentId: categories['beans-dals-pulses'].id },
    { name: 'Moong Dal', slug: 'moong-dal', parentId: categories['beans-dals-pulses'].id },
    { name: 'Chana Dal', slug: 'chana-dal', parentId: categories['beans-dals-pulses'].id },
    { name: 'Rajma', slug: 'rajma', parentId: categories['beans-dals-pulses'].id },
    { name: 'Masoor', slug: 'masoor', parentId: categories['beans-dals-pulses'].id },
    { name: 'Almonds', slug: 'almonds', parentId: categories['dry-fruits-nuts-seeds'].id },
    { name: 'Cashews', slug: 'cashews', parentId: categories['dry-fruits-nuts-seeds'].id },
    { name: 'Pistachios', slug: 'pistachios', parentId: categories['dry-fruits-nuts-seeds'].id },
    { name: 'Walnuts', slug: 'walnuts', parentId: categories['dry-fruits-nuts-seeds'].id },
    { name: 'Raisins', slug: 'raisins', parentId: categories['dry-fruits-nuts-seeds'].id },
    { name: 'Chia Seeds', slug: 'chia-seeds', parentId: categories['dry-fruits-nuts-seeds'].id },
    { name: 'Mango Pickle', slug: 'mango-pickle', parentId: categories['pickles-sauces'].id },
    { name: 'Lemon Pickle', slug: 'lemon-pickle', parentId: categories['pickles-sauces'].id },
    { name: 'Tomato Sauce', slug: 'tomato-sauce', parentId: categories['pickles-sauces'].id },
    { name: 'Chutney', slug: 'chutney', parentId: categories['pickles-sauces'].id },
    { name: 'Basmati Rice', slug: 'basmati-rice', parentId: categories['rice-products'].id },
    { name: 'Sona Masoori', slug: 'sona-masoori', parentId: categories['rice-products'].id },
    { name: 'Poha', slug: 'poha', parentId: categories['rice-products'].id },
    { name: 'Idli Rava', slug: 'idli-rava', parentId: categories['rice-products'].id },
    { name: 'Ragi', slug: 'ragi', parentId: categories['millets-products'].id },
    { name: 'Jowar', slug: 'jowar', parentId: categories['millets-products'].id },
    { name: 'Bajra', slug: 'bajra', parentId: categories['millets-products'].id },
    { name: 'Foxtail Millet', slug: 'foxtail-millet', parentId: categories['millets-products'].id },
    { name: 'Traditional Sweets', slug: 'traditional-sweets', parentId: categories['sweets-snacks'].id },
    { name: 'Namkeen', slug: 'namkeen', parentId: categories['sweets-snacks'].id },
    { name: 'Turmeric', slug: 'turmeric', parentId: categories['spices'].id },
    { name: 'Chilli', slug: 'chilli', parentId: categories['spices'].id },
    { name: 'Cumin', slug: 'cumin', parentId: categories['spices'].id },
    { name: 'Coriander', slug: 'coriander', parentId: categories['spices'].id },
    { name: 'Garam Masala', slug: 'garam-masala', parentId: categories['spices'].id },
    { name: 'Cardamom', slug: 'cardamom', parentId: categories['spices'].id },
    { name: 'Raw Honey', slug: 'raw-honey', parentId: categories['honey'].id },
    { name: 'Organic Honey', slug: 'organic-honey', parentId: categories['honey'].id },
    { name: 'Paneer', slug: 'paneer', parentId: categories['dairy-milk'].id },
    { name: 'Ghee', slug: 'ghee', parentId: categories['dairy-milk'].id },
    { name: 'Curd', slug: 'curd', parentId: categories['dairy-milk'].id },
    { name: 'Pooja Items', slug: 'pooja-items', parentId: categories['festival-essentials'].id },
    { name: 'Tea', slug: 'tea', parentId: categories['beverages'].id },
    { name: 'Coffee', slug: 'coffee', parentId: categories['beverages'].id },
  ];

  for (const sub of subcategories) {
    categories[sub.slug] = await prisma.category.create({ data: sub });
  }

  // 4. Products generator helper
  let skuCounter = 1000;
  const generateVariants = (productId, basePrice, weights) => {
    return weights.map((w, i) => {
      skuCounter++;
      let price = basePrice;
      if (w.unit === 'kg') price = basePrice * (w.value === 1 ? 1 : w.value) * 10;
      else if (w.unit === 'g') price = basePrice * (w.value / 100);
      else if (w.unit === 'ml') price = basePrice * (w.value / 100);
      else if (w.unit === 'L') price = basePrice * (w.value === 1 ? 1 : w.value) * 10;

      return {
        name: `${w.value}${w.unit}`,
        sku: `SKU-${skuCounter}`,
        price: parseFloat(price.toFixed(2)),
        compareAtPrice: parseFloat((price * 1.2).toFixed(2)),
        weight: w.value,
        weightUnit: w.unit,
        inventory: 100,
        isDefault: i === 0,
      };
    });
  };

  const createProduct = async (data, weights) => {
    skuCounter++;
    const sku = `PRD-${skuCounter}`;
    const product = await prisma.product.create({
      data: {
        ...data,
        sku,
        rating: 4.0 + Math.random(),
        reviewCount: Math.floor(Math.random() * 50) + 5,
        variants: {
          create: generateVariants('temp', data.price, weights)
        }
      }
    });
    return product;
  };

  // Create 80+ Products
  console.log('Creating products...');
  const allProducts = [];

  // Nuts and Seeds
  allProducts.push(await createProduct({
    name: 'Farm Bandi Premium Cashews', slug: 'fb-premium-cashews', brandId: brands['farm-bandi'].id, categoryId: categories['cashews'].id,
    description: 'High quality whole cashews.', price: 1.50, isFeatured: true, isBestseller: true
  }, [{value: 250, unit: 'g'}, {value: 500, unit: 'g'}, {value: 1, unit: 'kg'}]));
  
  allProducts.push(await createProduct({
    name: 'Farm Bandi Anjeer/Figs', slug: 'fb-anjeer-figs', brandId: brands['farm-bandi'].id, categoryId: categories['dry-fruits-nuts-seeds'].id,
    description: 'Premium dried figs.', price: 2.00, isFeatured: true
  }, [{value: 250, unit: 'g'}, {value: 500, unit: 'g'}]));

  allProducts.push(await createProduct({
    name: 'Farm Bandi Chia Seeds', slug: 'fb-chia-seeds', brandId: brands['farm-bandi'].id, categoryId: categories['chia-seeds'].id,
    description: 'Organic chia seeds.', price: 1.20, isOrganic: true
  }, [{value: 100, unit: 'g'}, {value: 250, unit: 'g'}]));

  allProducts.push(await createProduct({
    name: 'Farm Bandi Almonds', slug: 'fb-almonds', brandId: brands['farm-bandi'].id, categoryId: categories['almonds'].id,
    description: 'California almonds.', price: 1.80, isBestseller: true
  }, [{value: 250, unit: 'g'}, {value: 500, unit: 'g'}, {value: 1, unit: 'kg'}]));

  // Atta
  allProducts.push(await createProduct({
    name: 'Aashirvaad Whole Wheat Atta', slug: 'aashirvaad-atta', brandId: brands['aashirvaad'].id, categoryId: categories['wheat-flour'].id,
    description: '100% whole wheat chakki fresh atta.', price: 0.15, isFeatured: true, isBestseller: true
  }, [{value: 1, unit: 'kg'}, {value: 5, unit: 'kg'}, {value: 10, unit: 'kg'}]));

  allProducts.push(await createProduct({
    name: '24 Mantra Organic Wheat Atta', slug: '24-mantra-atta', brandId: brands['24-mantra-organic'].id, categoryId: categories['wheat-flour'].id,
    description: 'Organic wheat flour.', price: 0.20, isOrganic: true
  }, [{value: 1, unit: 'kg'}, {value: 5, unit: 'kg'}]));

  allProducts.push(await createProduct({
    name: 'Farm Bandi Besan', slug: 'fb-besan', brandId: brands['farm-bandi'].id, categoryId: categories['besan'].id,
    description: 'Gram flour made from chana dal.', price: 0.30
  }, [{value: 500, unit: 'g'}, {value: 1, unit: 'kg'}]));

  allProducts.push(await createProduct({
    name: 'Farm Bandi Ragi Flour', slug: 'fb-ragi-flour', brandId: brands['farm-bandi'].id, categoryId: categories['ragi'].id,
    description: 'Finger millet flour.', price: 0.25
  }, [{value: 500, unit: 'g'}, {value: 1, unit: 'kg'}]));

  // Rice
  allProducts.push(await createProduct({
    name: 'Basmati Rice Premium', slug: 'basmati-rice-premium', brandId: brands['farm-bandi'].id, categoryId: categories['basmati-rice'].id,
    description: 'Long grain aromatic basmati rice.', price: 0.30, isFeatured: true
  }, [{value: 1, unit: 'kg'}, {value: 5, unit: 'kg'}, {value: 10, unit: 'kg'}]));

  allProducts.push(await createProduct({
    name: 'Sona Masoori Rice', slug: 'sona-masoori-rice', brandId: brands['farm-bandi'].id, categoryId: categories['sona-masoori'].id,
    description: 'Light and aromatic medium-grain rice.', price: 0.18, isBestseller: true
  }, [{value: 5, unit: 'kg'}, {value: 10, unit: 'kg'}]));

  allProducts.push(await createProduct({
    name: 'Farm Bandi Poha', slug: 'fb-poha', brandId: brands['farm-bandi'].id, categoryId: categories['poha'].id,
    description: 'Thick flattened rice.', price: 0.30
  }, [{value: 500, unit: 'g'}, {value: 1, unit: 'kg'}]));

  // Dals
  allProducts.push(await createProduct({
    name: 'Toor Dal Premium', slug: 'toor-dal-premium', brandId: brands['farm-bandi'].id, categoryId: categories['toor-dal'].id,
    description: 'Unpolished pigeon pea.', price: 0.40, isBestseller: true
  }, [{value: 500, unit: 'g'}, {value: 1, unit: 'kg'}]));

  allProducts.push(await createProduct({
    name: 'Moong Dal Washed', slug: 'moong-dal-washed', brandId: brands['farm-bandi'].id, categoryId: categories['moong-dal'].id,
    description: 'Yellow split moong.', price: 0.35
  }, [{value: 500, unit: 'g'}, {value: 1, unit: 'kg'}]));

  allProducts.push(await createProduct({
    name: 'Chana Dal', slug: 'chana-dal-premium', brandId: brands['farm-bandi'].id, categoryId: categories['chana-dal'].id,
    description: 'Split bengal gram.', price: 0.25
  }, [{value: 500, unit: 'g'}, {value: 1, unit: 'kg'}]));

  allProducts.push(await createProduct({
    name: 'Rajma Chitra', slug: 'rajma-chitra', brandId: brands['farm-bandi'].id, categoryId: categories['rajma'].id,
    description: 'Speckled kidney beans.', price: 0.45
  }, [{value: 500, unit: 'g'}, {value: 1, unit: 'kg'}]));

  // Spices
  allProducts.push(await createProduct({
    name: 'MDH Garam Masala', slug: 'mdh-garam-masala', brandId: brands['mdh'].id, categoryId: categories['garam-masala'].id,
    description: 'Blend of ground spices.', price: 1.50, isFeatured: true
  }, [{value: 100, unit: 'g'}]));

  allProducts.push(await createProduct({
    name: 'Everest Turmeric Powder', slug: 'everest-turmeric', brandId: brands['everest'].id, categoryId: categories['turmeric'].id,
    description: 'Haldi powder.', price: 1.20
  }, [{value: 100, unit: 'g'}, {value: 200, unit: 'g'}]));

  allProducts.push(await createProduct({
    name: 'Everest Red Chilli Powder', slug: 'everest-red-chilli', brandId: brands['everest'].id, categoryId: categories['chilli'].id,
    description: 'Spicy red chilli powder.', price: 1.40
  }, [{value: 100, unit: 'g'}, {value: 200, unit: 'g'}]));

  allProducts.push(await createProduct({
    name: 'Farm Bandi Cumin Seeds', slug: 'fb-cumin', brandId: brands['farm-bandi'].id, categoryId: categories['cumin'].id,
    description: 'Jeera whole.', price: 1.80
  }, [{value: 100, unit: 'g'}, {value: 250, unit: 'g'}]));

  allProducts.push(await createProduct({
    name: 'Farm Bandi Green Cardamom', slug: 'fb-cardamom', brandId: brands['farm-bandi'].id, categoryId: categories['cardamom'].id,
    description: 'Elaichi whole.', price: 4.00
  }, [{value: 50, unit: 'g'}, {value: 100, unit: 'g'}]));

  // Dairy
  allProducts.push(await createProduct({
    name: 'Fresh Paneer', slug: 'fresh-paneer', brandId: brands['farm-bandi'].id, categoryId: categories['paneer'].id,
    description: 'Fresh cottage cheese.', price: 1.00
  }, [{value: 200, unit: 'g'}, {value: 400, unit: 'g'}]));

  allProducts.push(await createProduct({
    name: 'A2 Cow Ghee', slug: 'a2-cow-ghee', brandId: brands['farm-bandi'].id, categoryId: categories['ghee'].id,
    description: 'Pure A2 cow desi ghee.', price: 1.50, isFeatured: true
  }, [{value: 500, unit: 'ml'}, {value: 1, unit: 'L'}]));

  // Seasonal & Veg
  allProducts.push(await createProduct({
    name: 'Alphonso Mango', slug: 'alphonso-mango', brandId: brands['farm-bandi'].id, categoryId: categories['seasonal-veg'].id,
    description: 'Fresh seasonal Alphonso mangoes.', price: 5.00, isSeasonal: true
  }, [{value: 1, unit: 'kg'}]));

  allProducts.push(await createProduct({
    name: 'Fresh Coconut', slug: 'fresh-coconut', brandId: brands['farm-bandi'].id, categoryId: categories['vegetables'].id,
    description: 'Fresh whole coconut.', price: 1.50
  }, [{value: 1, unit: 'kg'}]));

  // Sweets & Snacks
  allProducts.push(await createProduct({
    name: "Haldiram's Bhujia", slug: 'haldirams-bhujia', brandId: brands['haldirams'].id, categoryId: categories['namkeen'].id,
    description: 'Spicy tepary bean and gram flour noodles.', price: 0.80
  }, [{value: 200, unit: 'g'}, {value: 400, unit: 'g'}]));

  allProducts.push(await createProduct({
    name: 'Farm Bandi Jaggery', slug: 'fb-jaggery', brandId: brands['farm-bandi'].id, categoryId: categories['specials'].id,
    description: 'Pure sugarcane jaggery block.', price: 0.35
  }, [{value: 500, unit: 'g'}, {value: 1, unit: 'kg'}]));

  allProducts.push(await createProduct({
    name: 'Urad Dal Papad', slug: 'urad-dal-papad', brandId: brands['farm-bandi'].id, categoryId: categories['papad-noodles'].id,
    description: 'Crispy lentil wafers.', price: 1.50
  }, [{value: 200, unit: 'g'}]));

  // Beverages
  allProducts.push(await createProduct({
    name: 'Tata Tea Gold', slug: 'tata-tea-gold', brandId: brands['tata'].id, categoryId: categories['tea'].id,
    description: 'Premium black tea leaves.', price: 1.20
  }, [{value: 250, unit: 'g'}, {value: 500, unit: 'g'}]));

  allProducts.push(await createProduct({
    name: 'Bru Instant Coffee', slug: 'bru-instant', brandId: brands['tata'].id, categoryId: categories['coffee'].id,
    description: 'Instant coffee chicory mix.', price: 3.00
  }, [{value: 100, unit: 'g'}, {value: 200, unit: 'g'}]));

  // Generate remaining 50 products procedurally to reach 80
  for (let i = 1; i <= 52; i++) {
    const isG = i % 2 === 0;
    const weights = isG ? [{value: 200, unit: 'g'}, {value: 500, unit: 'g'}] : [{value: 1, unit: 'kg'}];
    allProducts.push(await createProduct({
      name: `Grocery Item ${i}`, slug: `grocery-item-${i}`, brandId: brands['farm-bandi'].id, categoryId: categories['specials'].id,
      description: `Description for grocery item ${i}.`, price: 0.50 + (Math.random() * 2), isOrganic: (i % 5 === 0)
    }, weights));
  }

  // 5. Combos
  const diwaliCombo = await prisma.combo.create({
    data: {
      name: 'Diwali Special Combo',
      slug: 'diwali-special',
      description: 'Perfect gift for Diwali.',
      individualPrice: 25.00,
      comboPrice: 19.99,
      savings: 5.01,
      items: {
        create: [
          { productId: allProducts[0].id, variantId: allProducts[0].variants[0].id, quantity: 1 },
          { productId: allProducts[1].id, variantId: allProducts[1].variants[0].id, quantity: 1 },
          { productId: allProducts[20].id, variantId: allProducts[20].variants[0].id, quantity: 1 } // Ghee
        ]
      }
    }
  });

  const essentialsCombo = await prisma.combo.create({
    data: {
      name: 'Daily Essentials Pack',
      slug: 'daily-essentials',
      description: 'Your daily staples.',
      individualPrice: 15.00,
      comboPrice: 12.99,
      savings: 2.01,
      items: {
        create: [
          { productId: allProducts[4].id, variantId: allProducts[4].variants[0].id, quantity: 1 }, // Atta
          { productId: allProducts[8].id, variantId: allProducts[8].variants[0].id, quantity: 1 }, // Rice
          { productId: allProducts[11].id, variantId: allProducts[11].variants[0].id, quantity: 1 } // Toor Dal
        ]
      }
    }
  });

  // 6. Collections
  await prisma.collection.create({
    data: {
      name: 'Diwali Collection', slug: 'diwali-collection', type: 'FESTIVAL',
      items: {
        create: [
          { productId: allProducts[0].id }, { productId: allProducts[20].id }, { productId: allProducts[24].id }
        ]
      }
    }
  });

  // 7. Coupons
  await prisma.coupon.createMany({
    data: [
      { code: 'WELCOME10', type: 'PERCENTAGE', value: 10, maxDiscount: 5, isFirstOrderOnly: true },
      { code: 'FRESH20', type: 'PERCENTAGE', value: 20, minOrderValue: 30, categoryId: categories['fruits-vegetables'].id },
      { code: 'FESTIVAL15', type: 'PERCENTAGE', value: 15 },
      { code: 'FREEDEL', type: 'FIXED', value: 0, minOrderValue: 35 }
    ]
  });

  // 8. Delivery Zones
  await prisma.deliveryZone.createMany({
    data: [
      { name: 'UK Wide', postalCodes: '["*"]', deliveryFee: 3.99, freeDeliveryThreshold: 50, estimatedDays: '2-4 days' },
      { name: 'London', postalCodes: '["E*", "W*", "N*", "S*", "NW*", "SW*", "SE*", "EC*", "WC*"]', deliveryFee: 2.99, freeDeliveryThreshold: 40, estimatedDays: '1-2 days' },
      { name: 'Express UK', postalCodes: '["*"]', deliveryFee: 7.99, freeDeliveryThreshold: null, estimatedDays: 'Next day' }
    ]
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
