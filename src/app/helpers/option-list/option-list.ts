import { MeasureUnit } from "../enums/measure-unit";
import { ProductCategory } from "../enums/product-category";

export interface OptionList {
  key: string;
  label: string;
}

export class OptionList {
  static getMeasureUnits(): OptionList[] {
    return [
      { key: MeasureUnit.HUNDRED,    label: 'Centena' },
      { key: MeasureUnit.TEASPOON,   label: 'Colher de chá' },
      { key: MeasureUnit.TABLESPOON, label: 'Colher de sopa' },
      { key: MeasureUnit.DOZEN,      label: 'Dúzia' },
      { key: MeasureUnit.SLICE,      label: 'Fatia' },
      { key: MeasureUnit.GRAM,       label: 'Grama' },
      { key: MeasureUnit.DROP,       label: 'Gota' },
      { key: MeasureUnit.KIT,        label: 'Kit' },
      { key: MeasureUnit.LITER,      label: 'Litro' },
      { key: MeasureUnit.MILLIGRAM,  label: 'Miligrama' },
      { key: MeasureUnit.MILLILITER, label: 'Mililitro' },
      { key: MeasureUnit.PACK,       label: 'Pacote' },
      { key: MeasureUnit.PINCH,      label: 'Pitada' },
      { key: MeasureUnit.SERVING,    label: 'Porção' },
      { key: MeasureUnit.KILOGRAM,   label: 'Quilograma' },
      { key: MeasureUnit.TABLET,     label: 'Tablete' },
      { key: MeasureUnit.UNIT,       label: 'Unidade' },
      { key: MeasureUnit.CUP,        label: 'Xícara' },
    ]
  }

  static getMeasureUnitMapLabel(): Map<string, string> {
    return new Map(OptionList.getMeasureUnits().map(u => [u.key, u.label]))
  }

  static getProductCategoryOptions(): OptionList[] {
    return [
      { key: ProductCategory.BAKED,      label: 'Assados' },
      { key: ProductCategory.COOKIE,     label: 'Biscoitos/Bolachas' },
      { key: ProductCategory.CAKE,       label: 'Bolos' },
      { key: ProductCategory.SWEET,      label: 'Doces' },
      { key: ProductCategory.BREAD,      label: 'Pães' },
      { key: ProductCategory.SAVORY,     label: 'Salgados' },
      { key: ProductCategory.SAVORY_PIE, label: 'Tortas Salgadas' },
      { key: ProductCategory.SWEET_PIE,  label: 'Tortas Doces' },
    ]
  }

  static getProductCategoryMapLabel(): Map<string, string> {
    return new Map(OptionList.getProductCategoryOptions().map(u => [u.key, u.label]))
  }
}
