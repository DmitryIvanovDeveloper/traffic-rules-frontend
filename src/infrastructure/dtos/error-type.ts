export interface IError {
    type?: ErrorType;
    code: NetworkErrorCodeType
}

export enum ErrorType {
    EmailAlreadyRegistered = 'email_already_registered',
    InvalidCheckId = 'invalid_check_id',
    InvalidSmsCode = 'invalid_sms_code',
    InvalidCredentials = 'invalid_credentials',
    ValidationMinString = 'validation.min.string',
    PhoneAlreadyRegistered = 'phone_already_registered',
    RequiredFieldNotFilled = 'required_field_not_filled',
    ValidationRequired = 'validation.required'
}

export enum NetworkErrorCodeType {
    Unauthorized = '401',
    BadRequest = '400',
    Forbidden = '403',
    NotFound = '404',
    MethodNotAllowed = '405',
    RequestTimeout = '408',
    Conflict = '409',
    Gone = '410',
    LengthRequired = '411',
    PreconditionFailed = '412',
    PayloadTooLarge = '413',
    URITooLong = '414',
    UnsupportedMediaType = '415',
    UnprocessableEntity = '422',
    TooManyRequests = '429',
    InternalServerError = '500',
    NotImplemented = '501',
    BadGateway = '502',
    ServiceUnavailable = '503',
    GatewayTimeout = '504',
}