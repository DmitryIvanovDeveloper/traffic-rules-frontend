export default interface GetUserResponse {
    readonly id: number,
    readonly user: {
        readonly email: string,
        readonly first_name: string,
        readonly last_name: string,
    },
    readonly avatar: null,
    readonly user_name: string
}