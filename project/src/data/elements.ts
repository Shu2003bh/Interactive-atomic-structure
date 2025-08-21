export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  massNumber: number;
  category: string;
  period: number;
  group: number;
  fact?: string;
}

export const elements: Element[] = [
  {
    atomicNumber: 1,
    symbol: 'H',
    name: 'Hydrogen',
    massNumber: 1,
    category: 'Nonmetal',
    period: 1,
    group: 1,
    fact: 'Most abundant element in the universe!'
  },
  {
    atomicNumber: 2,
    symbol: 'He',
    name: 'Helium',
    massNumber: 4,
    category: 'Noble Gas',
    period: 1,
    group: 18,
    fact: 'Second lightest element and makes balloons float!'
  },
  {
    atomicNumber: 3,
    symbol: 'Li',
    name: 'Lithium',
    massNumber: 7,
    category: 'Alkali Metal',
    period: 2,
    group: 1,
    fact: 'Used in rechargeable batteries for phones and laptops!'
  },
  {
    atomicNumber: 4,
    symbol: 'Be',
    name: 'Beryllium',
    massNumber: 9,
    category: 'Alkaline Earth Metal',
    period: 2,
    group: 2,
    fact: 'One of the lightest metals, used in aerospace applications!'
  },
  {
    atomicNumber: 5,
    symbol: 'B',
    name: 'Boron',
    massNumber: 11,
    category: 'Metalloid',
    period: 2,
    group: 13,
    fact: 'Essential for plant growth and found in glass!'
  },
  {
    atomicNumber: 6,
    symbol: 'C',
    name: 'Carbon',
    massNumber: 12,
    category: 'Nonmetal',
    period: 2,
    group: 14,
    fact: 'Foundation of all organic life on Earth!'
  },
  {
    atomicNumber: 7,
    symbol: 'N',
    name: 'Nitrogen',
    massNumber: 14,
    category: 'Nonmetal',
    period: 2,
    group: 15,
    fact: 'Makes up 78% of Earth\'s atmosphere!'
  },
  {
    atomicNumber: 8,
    symbol: 'O',
    name: 'Oxygen',
    massNumber: 16,
    category: 'Nonmetal',
    period: 2,
    group: 16,
    fact: 'Essential for breathing and combustion!'
  },
  {
    atomicNumber: 9,
    symbol: 'F',
    name: 'Fluorine',
    massNumber: 19,
    category: 'Halogen',
    period: 2,
    group: 17,
    fact: 'Most electronegative element, found in toothpaste!'
  },
  {
    atomicNumber: 10,
    symbol: 'Ne',
    name: 'Neon',
    massNumber: 20,
    category: 'Noble Gas',
    period: 2,
    group: 18,
    fact: 'Creates bright orange-red light in neon signs!'
  },
  {
    atomicNumber: 11,
    symbol: 'Na',
    name: 'Sodium',
    massNumber: 23,
    category: 'Alkali Metal',
    period: 3,
    group: 1,
    fact: 'Essential for nerve function, found in table salt!'
  },
  {
    atomicNumber: 12,
    symbol: 'Mg',
    name: 'Magnesium',
    massNumber: 24,
    category: 'Alkaline Earth Metal',
    period: 3,
    group: 2,
    fact: 'Burns with brilliant white light, used in fireworks!'
  },
  {
    atomicNumber: 13,
    symbol: 'Al',
    name: 'Aluminum',
    massNumber: 27,
    category: 'Post-transition Metal',
    period: 3,
    group: 13,
    fact: 'Third most abundant element in Earth\'s crust!'
  },
  {
    atomicNumber: 14,
    symbol: 'Si',
    name: 'Silicon',
    massNumber: 28,
    category: 'Metalloid',
    period: 3,
    group: 14,
    fact: 'Foundation of computer chips and glass!'
  },
  {
    atomicNumber: 15,
    symbol: 'P',
    name: 'Phosphorus',
    massNumber: 31,
    category: 'Nonmetal',
    period: 3,
    group: 15,
    fact: 'Essential for DNA, RNA, and bone formation!'
  },
  {
    atomicNumber: 16,
    symbol: 'S',
    name: 'Sulfur',
    massNumber: 32,
    category: 'Nonmetal',
    period: 3,
    group: 16,
    fact: 'Creates the smell of rotten eggs and volcanic gases!'
  },
  {
    atomicNumber: 17,
    symbol: 'Cl',
    name: 'Chlorine',
    massNumber: 35,
    category: 'Halogen',
    period: 3,
    group: 17,
    fact: 'Used to disinfect swimming pools and drinking water!'
  },
  {
    atomicNumber: 18,
    symbol: 'Ar',
    name: 'Argon',
    massNumber: 40,
    category: 'Noble Gas',
    period: 3,
    group: 18,
    fact: 'Third most abundant gas in Earth\'s atmosphere!'
  },
  {
    atomicNumber: 19,
    symbol: 'K',
    name: 'Potassium',
    massNumber: 39,
    category: 'Alkali Metal',
    period: 4,
    group: 1,
    fact: 'Essential for muscle function, found in bananas!'
  },
  {
    atomicNumber: 20,
    symbol: 'Ca',
    name: 'Calcium',
    massNumber: 40,
    category: 'Alkaline Earth Metal',
    period: 4,
    group: 2,
    fact: 'Essential for strong bones and teeth!'
  }
];