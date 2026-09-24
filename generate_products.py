import json
import random

products = []

def create_product(id_base, name, brand_id, category_id, desc, price_map, tags, is_org=False, is_feat=False, is_best=False, is_new=False):
    slug = name.lower().replace(' ', '-').replace('&', '').replace(',', '').replace('/', '-').replace('---', '-').replace('--', '-')
    
    variants = []
    base_price = 0
    base_comp = None
    
    for i, (weight, price, comp) in enumerate(price_map):
        variants.append({
            'id': f'var_{id_base}_{i}',
            'name': f'{name} {weight}',
            'sku': f'SKU-{id_base.upper()}-{weight.upper().replace(" ", "")}',
            'price': price,
            'compareAtPrice': comp,
            'weight': weight,
            'weightUnit': ''.join([c for c in weight if not c.isdigit()]).strip(),
            'inventory': random.randint(10, 100),
            'isDefault': i == 0
        })
        if i == 0:
            base_price = price
            base_comp = comp
            
    products.append({
        'id': f'prod_{id_base}',
        'sku': f'SKU-{id_base.upper()}-BASE',
        'name': name,
        'slug': slug,
        'brandId': brand_id,
        'categoryId': category_id,
        'description': desc,
        'images': [{'url': f'/images/products/{slug}.jpg', 'alt': name, 'isDefault': True}],
        'variants': variants,
        'price': base_price,
        'compareAtPrice': base_comp,
        'currency': 'GBP',
        'rating': round(random.uniform(3.8, 5.0), 1),
        'reviewCount': random.randint(5, 150),
        'tags': tags,
        'isOrganic': is_org,
        'isFeatured': is_feat,
        'isBestseller': is_best,
        'isNewArrival': is_new,
        'isSeasonal': 'seasonal' in tags,
        'status': 'ACTIVE',
        'createdAt': '2023-01-01T00:00:00Z'
    })

# Farm Bandi
create_product('cashews', 'Premium Cashews', 'brand_farmbandi', 'cat_dryfruits', 'Premium quality whole cashews.', [('250g', 7.99, 9.99), ('500g', 14.99, 18.99), ('1kg', 24.99, 32.99)], ['cashews', 'nuts', 'premium'], is_org=True, is_feat=True, is_best=True)
create_product('anjeer', 'Premium Anjeer (Figs)', 'brand_farmbandi', 'cat_dryfruits', 'Sweet and nutritious dried figs.', [('250g', 6.99, 8.99), ('500g', 12.99, 15.99)], ['anjeer', 'figs', 'dry fruits'], is_org=True)
create_product('chia_seeds', 'Organic Chia Seeds', 'brand_farmbandi', 'cat_dryfruits', 'High quality chia seeds rich in omega-3.', [('250g', 4.99, 5.99), ('500g', 8.99, 10.99)], ['chia', 'seeds', 'healthy'], is_org=True, is_new=True)
create_product('almonds', 'California Almonds', 'brand_farmbandi', 'cat_dryfruits', 'Crunchy and healthy almonds.', [('250g', 6.49, 7.99), ('500g', 11.99, 14.99)], ['almonds', 'nuts'], is_feat=True, is_best=True)
create_product('pistachios', 'Roasted Pistachios', 'brand_farmbandi', 'cat_dryfruits', 'Lightly salted roasted pistachios.', [('250g', 8.99, 10.99), ('500g', 16.99, 20.99)], ['pistachios', 'nuts', 'roasted'], is_best=True)
create_product('walnuts', 'Kashmiri Walnuts', 'brand_farmbandi', 'cat_dryfruits', 'Premium walnut kernels.', [('250g', 7.49, 8.99), ('500g', 13.99, 16.99)], ['walnuts', 'nuts'], is_org=True)
create_product('raisins', 'Golden Raisins (Kishmish)', 'brand_farmbandi', 'cat_dryfruits', 'Sweet golden raisins.', [('250g', 3.49, 4.49), ('500g', 5.99, 7.99)], ['raisins', 'kishmish', 'dry fruits'])
create_product('pumpkin_seeds', 'Pumpkin Seeds', 'brand_farmbandi', 'cat_dryfruits', 'Healthy roasted pumpkin seeds.', [('250g', 4.49, 5.99)], ['pumpkin seeds', 'seeds'])
create_product('flax_seeds', 'Roasted Flax Seeds', 'brand_farmbandi', 'cat_dryfruits', 'Nutritious roasted flax seeds.', [('250g', 3.99, 4.99)], ['flax seeds', 'seeds'])

# Aashirvaad
create_product('aashirvaad_atta_1', 'Aashirvaad Whole Wheat Atta 1kg', 'brand_aashirvaad', 'cat_flours', 'Premium whole wheat flour.', [('1kg', 2.49, 2.99)], ['atta', 'flour', 'wheat'], is_best=True)
create_product('aashirvaad_atta_5', 'Aashirvaad Whole Wheat Atta 5kg', 'brand_aashirvaad', 'cat_flours', 'Premium whole wheat flour.', [('5kg', 8.99, 10.99)], ['atta', 'flour', 'wheat'], is_feat=True, is_best=True)
create_product('aashirvaad_atta_10', 'Aashirvaad Whole Wheat Atta 10kg', 'brand_aashirvaad', 'cat_flours', 'Premium whole wheat flour.', [('10kg', 15.99, 18.99)], ['atta', 'flour', 'wheat'], is_best=True)

# Tata
create_product('tata_salt', 'Tata Salt', 'brand_tata', 'cat_spices', 'Vacuum evaporated iodized salt.', [('1kg', 0.99, None)], ['salt', 'staple'], is_best=True)
create_product('tata_tea', 'Tata Tea Gold', 'brand_tata', 'cat_beverages', 'Premium Assam tea blend.', [('500g', 3.49, 4.49)], ['tea', 'beverage', 'chai'], is_feat=True)
create_product('tata_sampann_dal', 'Tata Sampann Toor Dal', 'brand_tata', 'cat_dals', 'Unpolished pure toor dal.', [('1kg', 2.99, 3.49)], ['dal', 'lentils', 'toor'])

# MTR
create_product('mtr_pav_bhaji', 'MTR Ready-to-Eat Pav Bhaji', 'brand_mtr', 'cat_ready_eat', 'Authentic Mumbai style Pav Bhaji.', [('300g', 2.49, 2.99)], ['rte', 'ready to eat', 'curry'])
create_product('mtr_palak_paneer', 'MTR Ready-to-Eat Palak Paneer', 'brand_mtr', 'cat_ready_eat', 'Classic Palak Paneer curry.', [('300g', 2.49, 2.99)], ['rte', 'ready to eat', 'curry', 'paneer'])
create_product('mtr_dal_makhani', 'MTR Ready-to-Eat Dal Makhani', 'brand_mtr', 'cat_ready_eat', 'Rich and creamy Dal Makhani.', [('300g', 2.49, 2.99)], ['rte', 'ready to eat', 'curry', 'dal'])

# Haldiram's
create_product('haldirams_mix', "Haldiram's Navrattan Mix", 'brand_haldirams', 'cat_sweets', 'Spicy and crunchy namkeen mix.', [('400g', 2.99, 3.49)], ['namkeen', 'snacks'], is_best=True)
create_product('soan_papdi', "Haldiram's Soan Papdi", 'brand_haldirams', 'cat_sweets', 'Classic Indian flaky sweet.', [('500g', 4.99, 5.99)], ['sweet', 'dessert'], is_feat=True)
create_product('rasgulla', "Haldiram's Rasgulla", 'brand_haldirams', 'cat_sweets', 'Spongy rasgulla in syrup.', [('1kg', 3.99, 4.99)], ['sweet', 'dessert'])

# MDH
create_product('garam_masala', 'MDH Garam Masala', 'brand_mdh', 'cat_spices', 'Authentic spice blend.', [('100g', 1.99, 2.49)], ['masala', 'spice', 'garam masala'], is_best=True)
create_product('chana_masala', 'MDH Chana Masala', 'brand_mdh', 'cat_spices', 'Spice blend for chickpea curry.', [('100g', 1.79, 2.29)], ['masala', 'spice'])
create_product('biryani_masala', 'MDH Biryani Masala', 'brand_mdh', 'cat_spices', 'Aromatic biryani spice blend.', [('100g', 2.29, 2.79)], ['masala', 'spice', 'biryani'])

# Everest
create_product('turmeric', 'Everest Turmeric Powder', 'brand_everest', 'cat_spices', 'Pure haldi powder.', [('200g', 1.49, 1.99)], ['spice', 'turmeric', 'haldi'], is_best=True)
create_product('chilli_powder', 'Everest Red Chilli Powder', 'brand_everest', 'cat_spices', 'Spicy lal mirch powder.', [('200g', 1.69, 2.19)], ['spice', 'chilli', 'mirch'])
create_product('meat_masala', 'Everest Meat Masala', 'brand_everest', 'cat_spices', 'Rich spice blend for non-veg curries.', [('100g', 2.49, 2.99)], ['masala', 'spice', 'non-veg'])

# 24 Mantra
create_product('organic_toor_dal', '24 Mantra Organic Toor Dal', 'brand_24mantra', 'cat_dals', '100% Organic unpolished toor dal.', [('1kg', 3.99, 4.99)], ['organic', 'dal', 'toor dal'], is_org=True)
create_product('organic_rice', '24 Mantra Organic Sonamasuri Rice', 'brand_24mantra', 'cat_rice', 'Organic everyday rice.', [('1kg', 4.99, 5.99)], ['organic', 'rice'], is_org=True)
create_product('organic_jaggery', '24 Mantra Organic Jaggery Powder', 'brand_24mantra', 'cat_sweets', 'Pure organic jaggery powder.', [('500g', 3.49, 4.49)], ['organic', 'jaggery', 'sweetener'], is_org=True, is_feat=True)

# Dabur
create_product('dabur_honey_250', 'Dabur Pure Honey 250g', 'brand_dabur', 'cat_sweets', 'Pure and natural honey.', [('250g', 4.99, 5.99)], ['honey', 'sweetener'])
create_product('dabur_honey_500', 'Dabur Pure Honey 500g', 'brand_dabur', 'cat_sweets', 'Pure and natural honey.', [('500g', 8.99, 10.99)], ['honey', 'sweetener'], is_best=True)
create_product('chyawanprash', 'Dabur Chyawanprash', 'brand_dabur', 'cat_beverages', 'Ayurvedic immunity booster.', [('500g', 6.99, 8.49)], ['ayurveda', 'immunity'])

# Patanjali
create_product('patanjali_ghee_500', 'Patanjali Cow Ghee 500ml', 'brand_patanjali', 'cat_oils', 'Pure cow ghee.', [('500ml', 5.99, 6.99)], ['ghee', 'oil', 'cow ghee'])
create_product('patanjali_ghee_1l', 'Patanjali Cow Ghee 1L', 'brand_patanjali', 'cat_oils', 'Pure cow ghee.', [('1L', 10.99, 12.99)], ['ghee', 'oil', 'cow ghee'], is_feat=True, is_best=True)
create_product('patanjali_ghee_750', 'Patanjali Ghee 750ml', 'brand_patanjali', 'cat_oils', 'Pure ghee.', [('750ml', 7.99, 9.49)], ['ghee', 'oil'])

# Fresh & Generics
create_product('mango', 'Fresh Alphonso Mango (Seasonal)', 'brand_generic', 'cat_fruits_veg', 'Sweet and juicy fresh mangoes.', [('1kg', 3.99, None)], ['fruit', 'fresh', 'mango', 'seasonal'], is_new=True)
create_product('coconut', 'Fresh Coconut', 'brand_generic', 'cat_fruits_veg', 'Fresh mature coconut.', [('1 pc', 1.99, None)], ['fresh', 'coconut'])
create_product('curry_leaves', 'Fresh Curry Leaves', 'brand_generic', 'cat_fruits_veg', 'Fresh aromatic curry leaves.', [('50g', 0.99, None)], ['fresh', 'herbs'])
create_product('paneer_200', 'Fresh Paneer 200g', 'brand_generic', 'cat_dairy', 'Soft and fresh malai paneer.', [('200g', 2.49, None)], ['dairy', 'paneer', 'fresh'])
create_product('paneer_400', 'Fresh Paneer 400g', 'brand_generic', 'cat_dairy', 'Soft and fresh malai paneer.', [('400g', 3.99, 4.49)], ['dairy', 'paneer', 'fresh'], is_best=True)
create_product('basmati_1', 'Premium Basmati Rice 1kg', 'brand_generic', 'cat_rice', 'Long grain aromatic basmati rice.', [('1kg', 2.99, 3.49)], ['rice', 'basmati'])
create_product('basmati_5', 'Premium Basmati Rice 5kg', 'brand_generic', 'cat_rice', 'Long grain aromatic basmati rice.', [('5kg', 12.99, 14.99)], ['rice', 'basmati'], is_feat=True)
create_product('sona_masoori_5', 'Sona Masoori Rice 5kg', 'brand_generic', 'cat_rice', 'Everyday medium grain rice.', [('5kg', 9.99, 11.99)], ['rice', 'sona masoori'], is_best=True)

# More Dals
create_product('toor_dal_500', 'Toor Dal 500g', 'brand_generic', 'cat_dals', 'Unpolished yellow pigeon peas.', [('500g', 1.99, None)], ['dal', 'lentils'])
create_product('toor_dal_1', 'Toor Dal 1kg', 'brand_generic', 'cat_dals', 'Unpolished yellow pigeon peas.', [('1kg', 3.49, 4.49)], ['dal', 'lentils'], is_best=True)
create_product('moong_dal_500', 'Moong Dal 500g', 'brand_generic', 'cat_dals', 'Split green gram without skin.', [('500g', 2.29, None)], ['dal', 'lentils'])
create_product('moong_dal_1', 'Moong Dal 1kg', 'brand_generic', 'cat_dals', 'Split green gram without skin.', [('1kg', 3.99, 4.99)], ['dal', 'lentils'])
create_product('chana_dal_500', 'Chana Dal 500g', 'brand_generic', 'cat_dals', 'Split bengal gram.', [('500g', 1.79, None)], ['dal', 'lentils'])
create_product('chana_dal_1', 'Chana Dal 1kg', 'brand_generic', 'cat_dals', 'Split bengal gram.', [('1kg', 2.99, 3.49)], ['dal', 'lentils'])
create_product('urad_dal_500', 'Urad Dal 500g', 'brand_generic', 'cat_dals', 'Split black gram.', [('500g', 2.49, None)], ['dal', 'lentils'])
create_product('urad_dal_1', 'Urad Dal 1kg', 'brand_generic', 'cat_dals', 'Split black gram.', [('1kg', 4.29, 4.99)], ['dal', 'lentils'])

# Breakfast and flours
create_product('poha', 'Thick Poha 500g', 'brand_generic', 'cat_breakfast', 'Flattened rice for breakfast.', [('500g', 1.49, None)], ['poha', 'breakfast'])
create_product('idli_rava', 'Idli Rava 500g', 'brand_generic', 'cat_breakfast', 'Rice semolina for soft idlis.', [('500g', 1.69, None)], ['rava', 'idli'])
create_product('sooji', 'Semolina / Sooji 500g', 'brand_generic', 'cat_breakfast', 'Fine semolina.', [('500g', 1.29, None)], ['sooji', 'rava'])
create_product('besan_500', 'Besan 500g', 'brand_generic', 'cat_flours', 'Gram flour.', [('500g', 1.49, None)], ['besan', 'flour'])
create_product('besan_1', 'Besan 1kg', 'brand_generic', 'cat_flours', 'Gram flour.', [('1kg', 2.49, 2.99)], ['besan', 'flour'])
create_product('ragi_flour', 'Ragi Flour 500g', 'brand_generic', 'cat_flours', 'Finger millet flour.', [('500g', 2.29, None)], ['ragi', 'flour', 'millet'])
create_product('jowar_flour', 'Jowar Flour 500g', 'brand_generic', 'cat_flours', 'Sorghum flour.', [('500g', 2.49, None)], ['jowar', 'flour', 'millet'])

# Other essentials
create_product('jaggery_powder', 'Jaggery Powder 500g', 'brand_generic', 'cat_sweets', 'Natural sweetener.', [('500g', 2.99, 3.49)], ['jaggery', 'sweetener'])
create_product('tamarind_paste', 'Tamarind Paste 200g', 'brand_generic', 'cat_pickles', 'Concentrated tamarind extract.', [('200g', 1.99, None)], ['tamarind', 'paste'])
create_product('coconut_oil', 'Coconut Oil 500ml', 'brand_generic', 'cat_oils', 'Pure coconut oil.', [('500ml', 3.99, 4.49)], ['oil', 'coconut'])
create_product('mustard_oil', 'Mustard Oil 1L', 'brand_generic', 'cat_oils', 'Kachi ghani mustard oil.', [('1L', 3.49, 4.49)], ['oil', 'mustard'])
create_product('papad_urad', 'Urad Papad 200g', 'brand_generic', 'cat_sweets', 'Crispy lentil wafers.', [('200g', 1.49, None)], ['papad', 'snack'])
create_product('vermicelli', 'Roasted Vermicelli 200g', 'brand_generic', 'cat_sweets', 'Roasted semiya.', [('200g', 0.99, None)], ['semiya', 'vermicelli'])

# Generating more filler products to reach 80
filler_spices = ['Cumin Seeds', 'Coriander Powder', 'Black Pepper', 'Cloves', 'Cardamom', 'Cinnamon', 'Mustard Seeds', 'Fenugreek Seeds']
for i, spice in enumerate(filler_spices):
    create_product(f'spice_{i}', f'Premium {spice}', 'brand_generic', 'cat_spices', f'Pure and aromatic {spice.lower()}.', [('100g', 1.99, 2.49)], ['spice', spice.lower()])

filler_snacks = ['Bhujia Sev', 'Moong Dal Snack', 'Khatta Meetha', 'Aloo Bhujia', 'Diet Mixture', 'Banana Chips', 'Murukku']
for i, snack in enumerate(filler_snacks):
    create_product(f'snack_{i}', f'Crispy {snack}', 'brand_haldirams', 'cat_sweets', f'Delicious {snack.lower()} for tea time.', [('200g', 1.99, 2.49)], ['snack', 'namkeen'])

filler_veg = ['Okra (Bhindi)', 'Bitter Gourd (Karela)', 'Bottle Gourd (Lauki)', 'Green Chillies', 'Ginger', 'Garlic', 'Coriander Leaves', 'Mint Leaves']
for i, veg in enumerate(filler_veg):
    create_product(f'veg_{i}', f'Fresh {veg}', 'brand_generic', 'cat_fruits_veg', f'Fresh {veg.lower()} directly from farms.', [('250g', 1.49, None)], ['fresh', 'vegetable', 'veg'])

ts_content = f"""export interface Product {{
  id: string;
  sku: string;
  name: string;
  slug: string;
  brandId: string;
  categoryId: string;
  description: string;
  ingredients?: string;
  nutrition?: string;
  images: {{ url: string; alt: string; isDefault: boolean }}[];
  variants: {{
    id: string;
    name: string;
    sku: string;
    price: number;
    compareAtPrice?: number;
    weight: string;
    weightUnit: string;
    inventory: number;
    isDefault: boolean;
  }}[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  isOrganic: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  isSeasonal: boolean;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  createdAt: string;
}}

export const products: Product[] = {json.dumps(products, indent=2)};
"""

with open('src/lib/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated {len(products)} products.")
