
export const makeFormURLInstance = (publicCode: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    return `${window.location.origin}/instance-form/${publicCode}?aux_code=`;
};