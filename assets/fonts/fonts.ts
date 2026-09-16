

export const Bardiya: IFont = { norm: require('./BBardiya.ttf'), bold: require('./BBardyBd.ttf'), name: 'بردیا' }
export const Roya: IFont = { norm: require('./Sp_Roya.ttf'), bold: require('./Sp_Roya Bold.ttf'), name: 'رویا' }
export const Kamran: IFont = { norm: require('./BKamran.ttf'), bold: require('./BKamrnBd.ttf'), name: 'کامران' }
// export const Yekan: IFont = { norm: require('./W_yekan.ttf'), bold: require('./W_yekan Bold.ttf') ,name:'یکان'}
export const Tejarat: IFont = { norm: require('./W_tejarat.ttf'), bold: require('./W_tejarat Bold.ttf'), name: 'تجارت' }
export const Yas: IFont = { norm: require('./Yas.ttf'), bold: require('./Yas Bold.ttf'), name: 'یاس' }

export default { Bardiya, Roya, Kamran, Yas, Tejarat, };

export type IFont = {
    bold: string;
    norm: string;
    name?: string

}
export type IFontStyle = {
    family?: IFont;
    size?: number,
} 