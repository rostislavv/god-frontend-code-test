export enum CarBodyTypeEnum {
    SUV = 'suv',
    ESTATE = 'estate',
    SEDAN = 'sedan',
}

export interface ICar {
    id: string;
    modelName: string;
    bodyType: CarBodyTypeEnum;
    modelType: string;
    imageUrl: string;
}
