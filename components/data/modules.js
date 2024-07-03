import chefLogo from '../../assets/chefs_hat.png';
import firstStep from '../../assets/first_step.png';
import foodRespect from '../../assets/food_respect.png';
import kitchenPrep from '../../assets/kitchen_prep.png';
import homeCooking from '../../assets/home_cooking.png';
import motherSauces from '../../assets/mother_sauces.png';
import potatoArt from '../../assets/potato_art.png';
import avoArt from '../../assets/avo_art.png';
import appleArt from '../../assets/apple_art.png';
import onionArt from '../../assets/onion_art.png';
import miseEnPlace from '../../assets/mise_en_place.png';
import bananaArt from '../../assets/banana_art.png';
import grapeArt from '../../assets/grape_art.png';
import strawberryArt from '../../assets/strawberry_art.png';
import blueberryArt from '../../assets/blueberry_art.png';
import humidityArt from '../../assets/humidity_art.png';
import temperatureArt from '../../assets/temperature_art.png';
import ethyleneArt from '../../assets/ethylene_art.png';
import airArt from '../../assets/air_art.png';
import pantryArt from '../../assets/pantry_art.png';
import counterArt from '../../assets/counter_art.png';
import fridgeArt from '../../assets/fridge_art.png';
import freezerArt from '../../assets/freezer_art.png';
import kitchenArt from '../../assets/kitchen_art.png';

export const latestArticlesObjects = [
  {
    image: firstStep,
    title: 'The First Step',
  },
  {
    image: foodRespect,
    title: 'Respecting Your Food',
  },
  {
    image: kitchenPrep,
    title: 'The Many Perks of a Tidy Kitchen',
  },
  {
    image: motherSauces,
    title: 'The 5 French Mother Sauces',
  },
  {
    image: homeCooking,
    title: 'Soups, Sauces, Smoothies, Salads, and Stirfries',
  },
  {
    image: miseEnPlace,
    title: 'Mise en Place',
  },
];

export const ingredientModules = [
  {
    title: 'Potatoes',
    image: potatoArt,
    intro:
      'By completing this module, you will be better equipped to handle and store Potatoes',
    content: [
      {
        contentTitle: 'Humidity',
        contentImage: humidityArt,
        contentText: [
          'Potatoes prefer high humidity levels, around 80-90%, to prevent them from drying out and shriveling.',
          'Keep potatoes in a breathable bag (like a paper or a mesh bag) to maintain humidity while allowing air circulation.',
          'Avoid storing them in airtight containers, which can promote moisture buildup and rot.',
        ],
      },
      {
        contentTitle: 'Temperature',
        contentImage: temperatureArt,
        contentText: [
          'Potatoes should be stored at cool, but not cold, temperatures. The ideal storage temperature for potatoes is around 45-50°F (7-10°C).',
          'Lower temperatures (such as in your fridge) can cause the starches in potatoes to convert into sugars, altering their taste and making them turn dark when cooked.',
          'Store your potatoes in a cool, dark place such as a basement, or a dark cabinet away from appliances that produce heat.',
        ],
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentImage: ethyleneArt,
        contentText: [
          'Potatoes are sensitive to ethylene gas, which is produced by many fruits and some vegetables.',
          'Ethylene can cause potatoes to sprout prematurely.',
          'Store potatoes away from ethylene-producing fruits and vegetables like apples, bananas, and onions. ',
        ],
      },
      {
        contentTitle: 'Air Circulation',
        contentImage: airArt,
        contentText: [
          'Good air circulation helps to keep the environment around the potatoes dry and prevents the accumulation of ethylene gas, which can hasten spoilage.',
          'Avoid overcrowding potatoes; store them in a crate, basket, or any container that allows air to circulate freely around each potato.',
          'Avoid storing potatoes in sealed bags or containers.',
        ],
      },
    ],
  },
  {
    title: 'Onions',
    image: onionArt,
    intro:
      'By completing this module, you will be better equipped to handle and store Onions',
    content: [
      {
        contentTitle: 'Humidity',
        contentImage: humidityArt,
        contentText: [
          'Onions prefer low humidity environments. High humidity can encourage rot and mold growth.',
          'Avoid storing onions in plastic bags, as this can trap moisture and promote spoilage.',
        ],
      },
      {
        contentTitle: 'Temperature',
        contentImage: temperatureArt,
        contentText: [
          'Onions are best stored in a cool, dry place, at temperatures between 45-55°F (7-13°C).',
          'Room temperature is generally fine for short-term storage, but for longer-term storage, a slightly cooler setting is preferable.',
          'Avoid storing them in the refrigerator, as the cold and moisture can make them soft and spoil faster.',
        ],
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentImage: ethyleneArt,
        contentText: [
          'Onions are not only sensitive to ethylene gas but also produce it, albeit at lower levels compared to some fruits.',
          'Their ethylene production can affect other produce stored nearby.',
          'Store onions separately from fruits and vegetables that are sensitive to ethylene, such as potatoes, to prevent them from spoiling prematurely.',
        ],
      },
      {
        contentTitle: 'Air Circulation',
        contentImage: airArt,
        contentText: [
          'Good air circulation is critical for onions to prevent moisture accumulation and to keep them dry.',
          'Hang onions in a mesh bag or place them in a shallow basket in a well-ventilated space.',
          'Ensure that the onions are not packed too tightly together and that air can move freely around them.',
        ],
      },
    ],
  },
  {
    title: 'Apples',
    image: appleArt,
    intro:
      'By completing this module, you will be better equipped to handle and store Apples',
    content: [
      {
        contentTitle: 'Humidity',
        contentImage: humidityArt,
        contentText: [
          'Apples require high humidity to prevent them from losing moisture and becoming mealy.',
          'However, too much moisture can promote mold growth.',
          'Keep apples in a perforated plastic bag in the refrigerator to balance humidity levels.',
        ],
      },
      {
        contentTitle: 'Temperature',
        contentImage: temperatureArt,
        contentText: [
          'Apples are best stored at cold temperatures, ideally around 32°F (0°C) with 90-95% relative humidity.',
          'This cold environment slows down the ripening process and helps preserve their crispness and flavor for a longer period.',
          'Store apples in the crisper drawer of your refrigerator in a plastic bag with holes for air circulation, or wrap each apple in a damp paper towel to maintain humidity',
        ],
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentImage: ethyleneArt,
        contentText: [
          'Apples produce a significant amount of ethylene gas, which can speed up the ripening (and subsequent spoilage) of ethylene-sensitive fruits and vegetables.',
          'Store apples away from other produce, especially ethylene-sensitive items like greens, carrots, and potatoes. ',
          'If you have a lot of apples, consider storing them in a separate refrigerator drawer or in a cool, ventilated space away from other produce.',
        ],
      },
      {
        contentTitle: 'Air Circulation',
        contentImage: airArt,
        contentText: [
          'Adequate air circulation is important to prevent apples from accumulating too much moisture and to evenly distribute the ethylene gas they produce.',
          'Do not overcrowd apples in storage; ensure there is enough space between them for air to circulate.',
          'If storing apples outside of the refrigerator, choose a cool, well-ventilated area.',
        ],
      },
    ],
  },
  {
    title: 'Bananas',
    image: bananaArt,
    intro:
      'By completing this module, you will be better equipped to handle and store Bananas',
    content: [
      {
        contentTitle: 'Humidity',
        contentImage: humidityArt,
        contentText: [
          'Bananas require a moderate humidity level.',
          'Too much humidity can accelerate mold growth and spoilage, while too little can cause them to dry out and become tough.',
          'Store bananas at room temperature on a banana hanger or hook to promote even ripening and prevent them from resting against surfaces that can bruise them.',
          'If you’re trying to extend their shelf life once they have ripened to your liking, place them in the refrigerator. ',
        ],
      },
      {
        contentTitle: 'Temperature',
        contentImage: temperatureArt,
        contentText: [
          'Bananas ripen best at room temperature. Refrigerating bananas can slow down the ripening process, but it is best done once they have reached your desired ripeness.',
          'Keep bananas away from direct sunlight and heat sources to avoid rapid ripening.',
          'Once they are ripe, you can refrigerate them to keep them from becoming overripe too quickly.',
        ],
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentImage: ethyleneArt,
        contentText: [
          'Bananas are both producers and sensitive to ethylene gas, which means they can ripen themselves as well as speed up ripening in other ethylene-sensitive produce.',
          'If you need to ripen bananas quickly, store them in a closed paper bag to trap the ethylene gas they emit.',
          'To avoid speeding up the ripening process of other fruits and vegetables, keep them separate from bananas or any other ethylene-producing produce unless you intend to ripen them faster.',
        ],
      },
      {
        contentTitle: 'Air Circulation',
        contentImage: airArt,
        contentText: [
          'Good air circulation is essential for bananas to ensure they ripen evenly and to prevent the accumulation of too much moisture, which can lead to mold growth.',
          'Avoid storing bananas in plastic bags, as this can trap moisture and ethylene gas, leading to quicker spoilage.',
        ],
      },
    ],
  },
  {
    title: 'Grapes',
    image: grapeArt,
    intro:
      'By completing this module, you will be better equipped to handle and store Grapes',
    content: [
      {
        contentTitle: 'Humidity',
        contentImage: humidityArt,
        contentText: [
          'Grapes thrive in high humidity environments. Low humidity can lead to dehydration and shriveling, while excessive moisture can promote mold growth.',
          'Store grapes in a perforated plastic bag in the refrigerator to maintain high humidity and prevent moisture from accumulating directly on the grapes, which could cause them to rot.',
        ],
      },
      {
        contentTitle: 'Temperature',
        contentImage: temperatureArt,
        contentText: [
          'Grapes are best kept cool to maintain their freshness, ideally between 30°F and 32°F (-1°C and 0°C).',
          'This temperature range slows down the ripening process and helps preserve their firmness and flavor.',
          'Place grapes in the coolest part of your refrigerator, usually at the back, away from the door.',
          'This keeps them away from temperature fluctuations that occur with door openings.',
        ],
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentImage: ethyleneArt,
        contentText: [
          'Grapes are sensitive to ethylene gas, which can accelerate their ripening and lead to premature spoilage.',
          'Store grapes away from ethylene-producing fruits and vegetables such as apples, bananas, and tomatoes to avoid speeding up their ripening process.',
        ],
      },
      {
        contentTitle: 'Air Circulation',
        contentImage: airArt,
        contentText: [
          'Proper air circulation is essential for preventing moisture buildup around the grapes, which can encourage mold growth and spoilage.',
          'Do not wash grapes before storing them, as the added moisture can promote mold growth.',
          'Instead, store them in their original packaging if it allows for air circulation, or transfer them to a breathable container.',
          'Ensure the container is not airtight and has holes or is loosely closed to allow for air flow.',
        ],
      },
    ],
  },
  {
    title: 'Strawberries',
    image: strawberryArt,
    intro:
      'By completing this module, you will be better equipped to handle and store Strawberries',
    content: [
      {
        contentTitle: 'Humidity',
        contentImage: humidityArt,
        contentText: [
          'Strawberries require a high-humidity environment to stay fresh and prevent drying out.',
          'However, too much moisture can quickly lead to mold growth and spoilage.',
          'Store strawberries in the refrigerator in a container lined with paper towels to absorb any excess moisture.',
          'Do not wash strawberries before storing them, as the added moisture can promote mold.',
        ],
      },
      {
        contentTitle: 'Temperature',
        contentImage: temperatureArt,
        contentText: [
          'Strawberries are best stored at cold temperatures, around 32°F to 36°F (0°C to 2°C). The cold environment slows down the decay process and helps maintain their freshness.',
          'Keep strawberries in the crisper drawer of your refrigerator to take advantage of the slightly higher humidity and cooler temperatures, which are ideal for their storage.',
        ],
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentImage: ethyleneArt,
        contentText: [
          'Strawberries are sensitive to ethylene gas, which can accelerate their ripening and spoilage.',
          'Store strawberries away from ethylene-producing fruits and vegetables, such as apples, bananas, and tomatoes.',
        ],
      },
      {
        contentTitle: 'Air Circulation',
        contentImage: airArt,
        contentText: [
          'Good air circulation is crucial for strawberries to prevent moisture accumulation, which can lead to mold growth and spoilage.',
          'Place strawberries in a single layer on a paper towel in a breathable container, like a perforated plastic container or a container with the lid slightly open, to allow excess moisture to escape and air to circulate.',
        ],
      },
    ],
  },
  {
    title: 'Blueberries',
    image: blueberryArt,
    intro:
      'By completing this module, you will be better equipped to handle and store Blueberries',
    content: [
      {
        contentTitle: 'Humidity',
        contentImage: humidityArt,
        contentText: [
          'Blueberries require a moderately high humidity level to stay fresh without becoming moldy.',
          'Excessive humidity can lead to mold growth, while too little can cause them to shrivel.',
          'Store blueberries in the refrigerator in their original container or a covered bowl or storage container that allows for some moisture retention but is not airtight.',
          'You can also place a paper towel in the container to absorb excess moisture and reduce the risk of mold growth.',
        ],
      },
      {
        contentTitle: 'Temperature',
        contentImage: temperatureArt,
        contentText: [
          'Blueberries are best stored at cold temperatures, around 32°F to 34°F (0°C to 1°C).',
          'This temperature range slows down the ripening process and helps keep the berries fresh.',
          'Keep blueberries in the refrigerator, preferably in the crisper drawer where the temperature and humidity levels are more stable.',
        ],
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentImage: ethyleneArt,
        contentText: [
          'Blueberries are moderately sensitive to ethylene gas, which can cause them to degrade more quickly.',
          'Store blueberries away from ethylene-producing fruits and vegetables like apples, bananas, and tomatoes to extend their shelf life.',
        ],
      },
      {
        contentTitle: 'Air Circulation',
        contentImage: airArt,
        contentText: [
          'Proper air circulation is important to prevent moisture buildup around blueberries, which can lead to mold and spoilage.',
          'Do not wash blueberries before storing them, as the moisture can encourage mold growth.',
          'If using a sealed container, cracking the lid slightly can improve air flow.',
        ],
      },
    ],
  },
  {
    title: 'Avocados',
    image: avoArt,
    intro:
      'By completing this module, you will be better equipped to handle and store Avocados',
    content: [
      {
        contentTitle: 'Humidity',
        contentImage: humidityArt,
        contentText: [
          'Avocados do not require a particularly high humidity environment; too much moisture can actually encourage mold growth.',
          'If storing avocados in the refrigerator, keep them in the vegetable drawer where humidity is moderate.',
          'There is no need to store them in airtight containers; a loose bag or simply placing them in the drawer works well.',
        ],
      },
      {
        contentTitle: 'Temperature',
        contentImage: temperatureArt,
        contentText: [
          'Unripe avocados should be stored at room temperature until they ripen. Once ripe, avocados can be refrigerated to slow down further ripening and extend their freshness.',
          'Keep unripe avocados on the counter to ripen. Once they feel slightly soft to the touch, move them to the refrigerator to keep them ripe for several days.',
        ],
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentImage: ethyleneArt,
        contentText: [
          'Avocados produce and are sensitive to ethylene gas, which speeds up the ripening process.',
          'To ripen avocados faster, store them in a paper bag with an ethylene-producing fruit like an apple or banana.',
          'The concentrated ethylene gas in the bag will speed up the ripening process.',
          'Once ripe, store avocados away from these fruits to prevent over-ripening.',
        ],
      },
      {
        contentTitle: 'Air Circulation',
        contentImage: airArt,
        contentText: [
          'Good air circulation is important for avocados, especially when they are stored at room temperature to ripen.',
          'Avoid sealing avocados in airtight containers when ripening at room temperature.',
          'If you are ripening multiple avocados together, make sure they are not packed too tightly and that air can circulate around them. ',
          'In the refrigerator, ensure they are not crammed in a drawer where air flow is restricted.',
        ],
      },
    ],
  },
];

export const kitchenPrepModules = [
  // {
  //   title: 'How to use FlavrAi',
  //   image: chefLogo,
  //   intro:
  //     'By consistently doing these 3 Core Actions in our app, you will gain the skills neccessary to maintain an efficient kitchen.',
  //   content: [
  //     {
  //       contentTitle: 'Logging your Foods',
  //       contentImage: chefLogo,
  //       contentText: [
  //         'Regularly logging your grocery items and their freshest-by dates reduces food waste significantly, as it allows you to prioritize the consumption of items that are nearing their end of freshness.',
  //         'The app simplifies inventory management by enabling users to easily log and track their groceries along with their freshest-by dates.',
  //         'By leaning on human-centered design principles and the power of AI, our logger is intuitive, fast, educational, and rewarding',
  //         'By maintaining awareness of your food inventory and condition through a digital device, you can make informed decisions beyond the kitchen, enhancing efficiency everywhere you go.',
  //       ],
  //     },
  //     {
  //       contentTitle: 'Setting SMART goals',
  //       contentImage: chefLogo,
  //       contentText: [
  //         'Setting Specific, Measurable, Achievable, Relevant, and Time-bound (SMART) goals for food consumption can significantly increase the likelihood of using all purchased items.',
  //         'Our app helps users set SMART goals for their groceries by providing logical default "freshest-by" dates for over 100 of the most common items purchased.',
  //         'This encourages users to plan their meals around what needs to be used first, fostering a more mindful and efficient kitchen.',
  //         'At our core, we view the setting of SMART goals as a skill that, with practice and refinement over time, can dramatically enhance your kitchen efficiency and sustainability; ',
  //       ],
  //     },
  //     {
  //       contentTitle: 'Learning about your Foods',
  //       contentImage: chefLogo,
  //       contentText: [
  //         'Understanding the properties and optimal storage conditions of the foods you buy ensures that foods are consumed at their peak freshness and nutritional content.',
  //         'Our app provides detailed information on each logged item, including storage tips, nutritional facts, and flavor compatibilities.',
  //         'This knowledge empowers users to make informed decisions about food storage, preparation, and pairing, enhancing the overall quality of meals.',
  //         'In addition, we provide an advanced recipe search tool based on your specific items, to aid in answering finding your perfect meal to cook',
  //       ],
  //     },
  //   ],
  // },
  {
    title: 'The 4 Kitchen Domains',
    image: kitchenArt,
    intro:
      'By learning how the 4 domains fit into an efficient kitchen operation, you can maximize the benefits of each.',
    content: [
      {
        contentTitle: 'The Pantry',
        contentImage: pantryArt,
        contentText: [
          'The pantry is ideal for storing non-perishable food items, such as grains, legumes, canned goods, and spices.',
          'These items generally have a long shelf life and do not require refrigeration.',
          'Keep your pantry organized by grouping similar items together and using clear, labeled containers for bulk items like flour, sugar, and rice.',
          'Rotate items so that older stock is used first ("first in, first out").',
        ],
      },
      {
        contentTitle: 'The Counter',
        contentImage: counterArt,
        contentText: [
          'The counter is suitable for storing fruits and vegetables that ripen off the vine, like tomatoes, avocados, and peaches, as well as those that degrade in flavor or texture when refrigerated, like potatoes, onions, and garlic.',
          'Use bowls or baskets to store ripening fruits and vegetables on the counter.',
          'Keep ethylene-producing fruits separate from ethylene-sensitive produce to prevent premature ripening or spoilage.',
          'Ensure there is enough space for air to circulate around each item to prevent mold growth.',
        ],
      },
      {
        contentTitle: 'The Fridge',
        contentImage: fridgeArt,
        contentText: [
          'The refrigerator is essential for preserving the freshness and extending the shelf life of perishable items like dairy, meats, fish, and many fruits and vegetables.',
          'However, improper storage can lead to cold spots, freezer burn, or accelerated spoilage.',
          'Organize your fridge by assigning specific areas for different types of food (e.g., drawers for fruits and vegetables, shelves for dairy and cooked meals).',
          'Regularly check and remove spoiled items to prevent odors and contamination.',
        ],
      },
      {
        contentTitle: 'The Freezer',
        contentImage: freezerArt,
        contentText: [
          'The freezer acts as a pause button, significantly extending the shelf life of almost any food from bread to meat, to prepared meals.',
          'However, without proper organization and maintenance, it can become cluttered and less efficient.',
          'Use labeled, freezer-safe containers or bags to store food in portions, making it easier to organize and retrieve what you need without thawing more than necessary.',
          'Avoid overfilling your freezer, as this can restrict air circulation and lead to uneven freezing.',
        ],
      },
    ],
  },
];

export const onboardingModule = [
  {
    title: 'The 3 Core Actions',
    image: chefLogo,
    intro:
      'By consistently practicing the 3 Core Actions in our app, you will help yourself maintain an efficient kitchen.',
    content: [
      {
        contentTitle: 'The effort is worth it!',
        contentImage: chefLogo,
        contentText: [
          'Managing your kitchen efficiently is a difficult task. It takes a specific combination of skills and knowledge, along with consistent effort.',
          'By practicing the 3 Core Actions on a regular basis, you stand a much better chance of overcoming the many challenges that come with kitchen management.',
          'FlavrAi makes it easy to maintain awareness of your food inventory, set informed goals, find the right recipes, and sharpen your kitchen skills!',
        ],
      },
      {
        contentTitle: 'Logging Your Items',
        contentImage: chefLogo,
        contentText: [
          'In order to benefit fully from FlavrAi, you should log your foods when you purchase them, and mark how they were consumed. This will only take seconds.',
          'By logging an item, you give yourself an opportunity to make good decisions. Specifically, when and how you would like to eat it by.',
        ],
      },
      {
        contentTitle: 'Setting SMART goals',
        contentImage: chefLogo,
        contentText: [
          'SMART = Specific, Measurable, Achievable, Relevant, and Time-bound. Extremely effective if applied to setting use-by dates for food consumption.',
          'FlavrAi helps users set SMART goals for their items by providing curated data and default dates for over 100 of the most common items purchased.',
          'We view SMART goal setting as a crucial skill that, with practice and refinement, can dramatically improve your overall kitchen efficiency.',
        ],
      },
      {
        contentTitle: 'Learning Kitchen Skills',
        contentImage: chefLogo,
        contentText: [
          'In addition to logging your foods and setting SMART goals, you are encouraged to continue your kitchen journey by visiting the Learn tab.',
          'Here, you will find bite-sized educational modules, where you can gain the skills needed to become an efficient home chef.',
          'Current module topics include: Kitchen Prep, Food Knowledge, Cooking Skills, and Beyond Your Kitchen.',
        ],
      },
    ],
  },
];

export const modules = [
  {
    title: 'Potatoes',
    intro: 'This will be the intro text for Potatoes',
    content: [
      {
        contentTitle: 'Humidity',
        contentText: 'This will be the humidity content for Potatoes',
      },
      {
        contentTitle: 'Temperature',
        contentText: 'This will be the temperature content for Potatoes',
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentText: 'This will be the ethylene gas content for Potatoes',
      },
      {
        contentTitle: 'Air Circulation',
        contentText: 'This will be the air circulation content for Potatoes',
      },
    ],
  },
  {
    title: 'Onions',
    intro: 'This will be the intro text for Onions',
    content: [
      {
        contentTitle: 'Humidity',
        contentText: 'This will be the humidity content for Onions',
      },
      {
        contentTitle: 'Temperature',
        contentText: 'This will be the temperature content for Onions',
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentText: 'This will be the ethylene gas content for Onions',
      },
      {
        contentTitle: 'Air Circulation',
        contentText: 'This will be the air circulation content for Onions',
      },
    ],
  },
  {
    title: 'Apples',
    intro: 'This will be the intro text for Apples',
    content: [
      {
        contentTitle: 'Humidity',
        contentText: 'This will be the moisture content for Apples',
      },
      {
        contentTitle: 'Temperature',
        contentText: 'This will be the temperature content for Apples',
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentText: 'This will be the ethylene gas content for Apples',
      },
      {
        contentTitle: 'Air Circulation',
        contentText: 'This will be the air circulation content for Apples',
      },
    ],
  },
  {
    title: 'Bananas',
    intro: 'This will be the intro text for Bananas',
    content: [
      {
        contentTitle: 'Humidity',
        contentText: 'This will be the moisture content for Bananas',
      },
      {
        contentTitle: 'Temperature',
        contentText: 'This will be the temperature content for Bananas',
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentText: 'This will be the ethylene gas content for Bananas',
      },
      {
        contentTitle: 'Air Circulation',
        contentText: 'This will be the air circulation content for Bananas',
      },
    ],
  },
  {
    title: 'Grapes',
    intro: 'This will be the intro text for Grapes',
    content: [
      {
        contentTitle: 'Humidity',
        contentText: 'This will be the moisture content for Grapes',
      },
      {
        contentTitle: 'Temperature',
        contentText: 'This will be the temperature content for Grapes',
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentText: 'This will be the ethylene gas content for Grapes',
      },
      {
        contentTitle: 'Air Circulation',
        contentText: 'This will be the air circulation content for Grapes',
      },
    ],
  },
  {
    title: 'Strawberries',
    intro: 'This will be the intro text for Strawberries',
    content: [
      {
        contentTitle: 'Humidity',
        contentText: 'This will be the moisture content for Strawberries',
      },
      {
        contentTitle: 'Temperature',
        contentText: 'This will be the temperature content for Strawberries',
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentText: 'This will be the ethylene gas content for Strawberries',
      },
      {
        contentTitle: 'Air Circulation',
        contentText:
          'This will be the air circulation content for Strawberries',
      },
    ],
  },
  {
    title: 'Blueberries',
    intro: 'This will be the intro text for Blueberries',
    content: [
      {
        contentTitle: 'Humidity',
        contentText: 'This will be the moisture content for Blueberries',
      },
      {
        contentTitle: 'Temperature',
        contentText: 'This will be the temperature content for Blueberries',
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentText: 'This will be the ethylene gas content for Blueberries',
      },
      {
        contentTitle: 'Air Circulation',
        contentText: 'This will be the air circulation content for Blueberries',
      },
    ],
  },
  {
    title: 'Avocados',
    intro: 'This will be the intro text for Avocados',
    content: [
      {
        contentTitle: 'Humidity',
        contentText: 'This will be the moisture content for Avocados',
      },
      {
        contentTitle: 'Temperature',
        contentText: 'This will be the temperature content for Avocados',
      },
      {
        contentTitle: 'Ethylene Sensitivity',
        contentText: 'This will be the ethylene gas content for Avocados',
      },
      {
        contentTitle: 'Air Circulation',
        contentText: 'This will be the air circulation content for Avocados',
      },
    ],
  },
];
