
export default interface IFetch<T> {
    errorMessage: string;
    request: unknown;
    response: T;
    hsaError: boolean;
    customErrorMessage: string;
}