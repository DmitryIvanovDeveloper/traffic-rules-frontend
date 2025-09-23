import IAddressDto from '../../../../../account/business/dtos/address.dto';
import IAccountDataDto from '../../../../business/dtos/receipt.dto';
import IChangeAddressRequest from '../../../../../account/infrastructure/repositories/dtos/change-address-request';
import IdentifireByAddressRequest from '../../../../../account/infrastructure/repositories/dtos/identifire-by-address.request';
import IdentifireByAccountRequest from '../../../../../account/infrastructure/repositories/dtos/identifire-by-receipt.request';
import IFullNameDto from '../../../../../account/business/dtos/fullname.dto';
import IChangeFullNameRequest from '../../../../../account/infrastructure/repositories/dtos/change-fullname-request';
import ISignUpDto from '../../../../business/dtos/sign-up-dto';
import SignUpRequest from './sign-up.request';
import filterNotDigitalSymbols from '@/infrastructure/helpers/formatter';

export default class Mapper {
    public static mapAddressDtoToRequest(address: IAddressDto): IChangeAddressRequest {
        const request: IChangeAddressRequest = {
            city: address.city,
            street: address.street,
            building: address.building,
            flat: address.flat,
        };

        return request;
    }

    public static mapFullNameDtoToRequest(fullName: IFullNameDto): IChangeFullNameRequest {
        const request: IChangeFullNameRequest = {
            name: fullName.name,
            lastName: fullName.lastName,
            sureName: fullName.sureName,
        };

        return request;
    }

    public static mapIndentifirePersonalDataByAccountToRequest(receipt: IAccountDataDto): IdentifireByAccountRequest {
        const request: IdentifireByAccountRequest = {
            number: receipt.personalAccountNumber,
            pay: Number(filterNotDigitalSymbols(receipt.sumLastPeriod)),
            period: receipt.period,
        };
        
        return request;
    }

    public static mapIndentifirePersonalDataByAddressToRequest(address: IAddressDto): IdentifireByAddressRequest {
        const request: IdentifireByAddressRequest = {
            address: {
                city: address.city,
                street: address.street,
                building: address.building,
                flat: address.flat,
                property: address.flat,
            },
            full_name: {
                last_name: address.lastName,
                first_name: address.name,
                middle_name: address.sureName,
            },
        };

        return request;
    }

    public static mapDtoToRequest(dto: ISignUpDto, checkId: string): SignUpRequest {
        const request: SignUpRequest = {
            phone: dto.presonalData.phone,
            email: dto.presonalData.email,
            first_name: dto.presonalData.fullName.name,
            last_name: dto.presonalData.fullName.lastName,
            middle_name: dto.presonalData.fullName.sureName,
            password: dto.credential.password,
            confirm_phone_code: dto.credential.code,
            confirm_password: dto.credential.confirmPassword,
            check_id: checkId,
        };

        return request;
    }
}
