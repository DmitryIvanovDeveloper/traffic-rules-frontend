export class TokenStorage {
    private static TOKEN_KEY = 'auth_token';
    private static _token: string | null = null;

    static store(token: string) {
        this._token = token;
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    static get(): string | null {
        if (!this._token) {
            this._token = localStorage.getItem(this.TOKEN_KEY);
        }
        return this._token;
    }

    static remove() {
        this._token = null;
        localStorage.removeItem(this.TOKEN_KEY);
    }
}
